// Copyright 2023 Stacklok, Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package controlplane

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"os"

	"github.com/go-playground/validator/v10"
	gauth "github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/auth"
	"github.com/lestrrat-go/jwx/v2/jwk"
	"github.com/lestrrat-go/jwx/v2/jwt/openid"
	"golang.org/x/exp/slices"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"

	"github.com/lestrrat-go/jwx/v2/jwt"
	"github.com/stacklok/mediator/internal/db"
	pb "github.com/stacklok/mediator/pkg/api/protobuf/go/mediator/v1"
)

type createUserValidation struct {
	OrganizationId int32 `db:"organization_id" validate:"required"`
}

func stringToNullString(s *string) *sql.NullString {
	if s == nil {
		return &sql.NullString{Valid: false}
	}
	return &sql.NullString{String: *s, Valid: true}
}

// CreateUser is a service for user self registration
//
//gocyclo:ignore
func (s *Server) CreateUser(ctx context.Context,
	in *pb.CreateUserRequest) (*pb.CreateUserResponse, error) {

	tokenString, err := gauth.AuthFromMD(ctx, "bearer")
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "no auth token: %v", err)
	}

	jwksUrl := fmt.Sprintf("%v/realms/%v/protocol/openid-connect/certs", s.cfg.Identity.IssuerUrl, s.cfg.Identity.Realm)

	// TODO: cache
	set, err := s.jwks.Get(ctx, jwksUrl)

	token, err := jwt.ParseString(tokenString, jwt.WithKeySet(set), jwt.WithValidate(true), jwt.WithToken(openid.New()))
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "failed to parse bearer token: %v", err)
	}

	openIdToken, ok := token.(openid.Token)
	if !ok {
		return nil, status.Errorf(codes.InvalidArgument, "provided token was not an OpenID token: %s", err.Error())
	}

	validator := validator.New()
	format := createUserValidation{OrganizationId: in.OrganizationId}

	err = validator.Struct(format)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "invalid argument: %s", err.Error())
	}

	fmt.Fprintf(os.Stderr, "Got openid token: %s\n", openIdToken)

	// if the token has superadmin access to the realm, then make give them a superadmin role in the DB
	if containsAdminRole(openIdToken) {
		in.RoleIds = append(in.RoleIds, 1)
		in.GroupIds = append(in.GroupIds, 1)
	}

	// if we have group ids we check if they exist
	if in.GroupIds != nil {
		for _, id := range in.GroupIds {
			group, err := s.store.GetGroupByID(ctx, id)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					return nil, status.Error(codes.NotFound, "group not found")
				}
				return nil, status.Errorf(codes.Internal, "failed to get group: %s", err)
			}

			// group must belong to org
			if group.OrganizationID != in.OrganizationId {
				return nil, status.Errorf(codes.InvalidArgument, "group does not belong to organization")
			}
		}
	}

	// if we have role ids we check if they exist
	if in.RoleIds != nil {
		for _, id := range in.RoleIds {
			role, err := s.store.GetRoleByID(ctx, id)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					return nil, status.Error(codes.NotFound, "role not found")
				}
				return nil, status.Errorf(codes.Internal, "failed to get role: %s", err)
			}

			// role must belong to org
			if role.OrganizationID != in.OrganizationId {
				return nil, status.Errorf(codes.InvalidArgument, "role does not belong to organization")
			}
		}
	}

	tx, err := s.store.BeginTransaction()
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to begin transaction")
	}
	defer s.store.Rollback(tx)
	qtx := s.store.GetQuerierWithTransaction(tx)
	if qtx == nil {
		return nil, status.Errorf(codes.Internal, "failed to get transaction")
	}

	user, err := qtx.CreateUser(ctx, db.CreateUserParams{OrganizationID: in.OrganizationId, IdentitySubject: openIdToken.Subject()})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create user: %s", err)
	}

	// now attach the groups and roles
	for _, id := range in.GroupIds {
		_, err := qtx.AddUserGroup(ctx, db.AddUserGroupParams{UserID: user.ID, GroupID: id})
		if err != nil {
			return nil, status.Errorf(codes.Internal, "failed to add user to group: %s", err)
		}
	}
	for _, id := range in.RoleIds {
		_, err := qtx.AddUserRole(ctx, db.AddUserRoleParams{UserID: user.ID, RoleID: id})
		if err != nil {
			return nil, status.Errorf(codes.Internal, "failed to add user to role: %s", err)
		}
	}
	err = s.store.Commit(tx)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to commit transaction: %s", err)
	}

	return &pb.CreateUserResponse{Id: user.ID, OrganizationId: user.OrganizationID, CreatedAt: timestamppb.New(user.CreatedAt),
		UpdatedAt: timestamppb.New(user.UpdatedAt)}, nil
}

func containsAdminRole(openIdToken openid.Token) bool {
	if realmAccess, ok := openIdToken.Get("realm_access"); ok {
		fmt.Fprintf(os.Stderr, "Got realm_access: %s\n", realmAccess)
		if realms, ok := realmAccess.(map[string]interface{}); ok {
			fmt.Fprintf(os.Stderr, "Got realms: %s\n", realms)
			if roles, ok := realms["roles"]; ok {
				fmt.Fprintf(os.Stderr, "Got roles: %s\n", roles)
				if userRoles, ok := roles.([]interface{}); ok {
					fmt.Fprintf(os.Stderr, "Got userRoles: %s\n", userRoles)
					if slices.Contains(userRoles, "superadmin") {
						return true
					}
				}
			}
		}
	}
	return false
}

type deleteUserValidation struct {
	Id int32 `db:"id" validate:"required"`
}

// DeleteUser is a service for deleting an user
func (s *Server) DeleteUser(ctx context.Context,
	in *pb.DeleteUserRequest) (*pb.DeleteUserResponse, error) {
	validator := validator.New()
	err := validator.Struct(deleteUserValidation{Id: in.Id})
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "invalid argument: %s", err.Error())
	}

	// first check if the user exists and is not protected
	user, err := s.store.GetUserByID(ctx, in.Id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, status.Error(codes.NotFound, "user not found")
		}
		return nil, status.Errorf(codes.Internal, "failed to get user: %s", err)
	}

	// check if user is authorized
	if err := AuthorizedOnOrg(ctx, user.OrganizationID); err != nil {
		return nil, err
	}

	if in.Force == nil {
		isProtected := false
		in.Force = &isProtected
	}

	err = s.store.DeleteUser(ctx, in.Id)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to delete user: %s", err)
	}

	return &pb.DeleteUserResponse{}, nil
}

// GetUsers is a service for getting a list of users
func (s *Server) GetUsers(ctx context.Context,
	in *pb.GetUsersRequest) (*pb.GetUsersResponse, error) {

	// define default values for limit and offset
	if in.Limit == nil || *in.Limit == -1 {
		in.Limit = new(int32)
		*in.Limit = PaginationLimit
	}
	if in.Offset == nil {
		in.Offset = new(int32)
		*in.Offset = 0
	}

	users, err := s.store.ListUsers(ctx, db.ListUsersParams{
		Limit:  *in.Limit,
		Offset: *in.Offset,
	})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to get users: %s", err)
	}

	var resp pb.GetUsersResponse
	resp.Users = make([]*pb.UserRecord, 0, len(users))
	for idx := range users {
		user := &users[idx]
		resp.Users = append(resp.Users, &pb.UserRecord{
			Id:             user.ID,
			OrganizationId: user.OrganizationID,
			CreatedAt:      timestamppb.New(user.CreatedAt),
			UpdatedAt:      timestamppb.New(user.UpdatedAt),
		})
	}

	return &resp, nil
}

// GetUsersByOrganization is a service for getting a list of users of an organization
func (s *Server) GetUsersByOrganization(ctx context.Context,
	in *pb.GetUsersByOrganizationRequest) (*pb.GetUsersByOrganizationResponse, error) {
	// check if user is authorized
	if err := AuthorizedOnOrg(ctx, in.OrganizationId); err != nil {
		return nil, err
	}

	// define default values for limit and offset
	if in.Limit == nil || *in.Limit == -1 {
		in.Limit = new(int32)
		*in.Limit = PaginationLimit
	}
	if in.Offset == nil {
		in.Offset = new(int32)
		*in.Offset = 0
	}

	users, err := s.store.ListUsersByOrganization(ctx, db.ListUsersByOrganizationParams{
		OrganizationID: in.OrganizationId,
		Limit:          *in.Limit,
		Offset:         *in.Offset,
	})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to get users: %s", err)
	}

	var resp pb.GetUsersByOrganizationResponse
	resp.Users = make([]*pb.UserRecord, 0, len(users))
	for idx := range users {
		user := &users[idx]
		resp.Users = append(resp.Users, &pb.UserRecord{
			Id:             user.ID,
			OrganizationId: user.OrganizationID,
			CreatedAt:      timestamppb.New(user.CreatedAt),
			UpdatedAt:      timestamppb.New(user.UpdatedAt),
		})
	}

	return &resp, nil
}

// GetUsersByGroup is a service for getting a list of users of a group
func (s *Server) GetUsersByGroup(ctx context.Context,
	in *pb.GetUsersByGroupRequest) (*pb.GetUsersByGroupResponse, error) {
	// check if user is authorized
	if err := AuthorizedOnGroup(ctx, in.GroupId); err != nil {
		return nil, err
	}

	// define default values for limit and offset
	if in.Limit == nil || *in.Limit == -1 {
		in.Limit = new(int32)
		*in.Limit = PaginationLimit
	}
	if in.Offset == nil {
		in.Offset = new(int32)
		*in.Offset = 0
	}

	users, err := s.store.ListUsersByGroup(ctx, db.ListUsersByGroupParams{
		GroupID: in.GroupId,
		Limit:   *in.Limit,
		Offset:  *in.Offset,
	})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to get users: %s", err)
	}

	var resp pb.GetUsersByGroupResponse
	resp.Users = make([]*pb.UserRecord, 0, len(users))
	for idx := range users {
		user := &users[idx]
		resp.Users = append(resp.Users, &pb.UserRecord{
			Id:             user.ID,
			OrganizationId: user.OrganizationID,
			CreatedAt:      timestamppb.New(user.CreatedAt),
			UpdatedAt:      timestamppb.New(user.UpdatedAt),
		})
	}

	return &resp, nil
}

func getUserDependencies(ctx context.Context, store db.Store, user db.User) ([]*pb.GroupRecord, []*pb.RoleRecord, error) {
	// get all the roles associated with that user
	roles, err := store.GetUserRoles(ctx, user.ID)
	if err != nil {
		return nil, nil, err
	}

	// get all the groups associated with that user
	groups, err := store.GetUserGroups(ctx, user.ID)
	if err != nil {
		return nil, nil, err
	}

	// convert to right data type
	var rolesPB []*pb.RoleRecord
	for idx := range roles {
		role := &roles[idx]
		rolesPB = append(rolesPB, &pb.RoleRecord{
			Id:             role.ID,
			OrganizationId: role.OrganizationID,
			GroupId:        &role.GroupID.Int32,
			Name:           role.Name,
			IsAdmin:        role.IsAdmin,
			IsProtected:    role.IsProtected,
			CreatedAt:      timestamppb.New(role.CreatedAt),
			UpdatedAt:      timestamppb.New(role.UpdatedAt),
		})
	}

	var groupsPB []*pb.GroupRecord
	for _, group := range groups {
		groupsPB = append(groupsPB, &pb.GroupRecord{
			GroupId:        group.ID,
			OrganizationId: group.OrganizationID,
			Name:           group.Name,
			Description:    group.Description.String,
			IsProtected:    group.IsProtected,
			CreatedAt:      timestamppb.New(group.CreatedAt),
			UpdatedAt:      timestamppb.New(group.UpdatedAt),
		})
	}

	return groupsPB, rolesPB, nil
}

// GetUserById is a service for getting a user by id
func (s *Server) GetUserById(ctx context.Context,
	in *pb.GetUserByIdRequest) (*pb.GetUserByIdResponse, error) {
	if in.UserId == 0 {
		return nil, status.Error(codes.InvalidArgument, "user id is required")
	}

	// check if user is authorized
	if err := AuthorizedOnUser(ctx, in.UserId); err != nil {
		return nil, err
	}

	user, err := s.store.GetUserByID(ctx, in.UserId)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, status.Error(codes.NotFound, "user not found")
		}
		return nil, status.Errorf(codes.Internal, "failed to get user: %s", err)
	}

	groups, roles, err := getUserDependencies(ctx, s.store, user)
	if err != nil {
		return nil, status.Errorf(codes.Unknown, "failed to get user dependencies: %s", err)
	}

	var resp pb.GetUserByIdResponse
	resp.User = &pb.UserRecord{
		Id:             user.ID,
		OrganizationId: user.OrganizationID,
		CreatedAt:      timestamppb.New(user.CreatedAt),
		UpdatedAt:      timestamppb.New(user.UpdatedAt),
	}

	resp.Groups = groups
	resp.Roles = roles
	return &resp, nil
}

// GetUser is a service for getting personal user details
func (s *Server) GetUser(ctx context.Context, _ *pb.GetUserRequest) (*pb.GetUserResponse, error) {
	// user is always authorized to get themselves
	tokenString, err := gauth.AuthFromMD(ctx, "bearer")
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "no auth token: %v", err)
	}

	// TODO: cache
	set, err := jwk.Fetch(
		context.Background(),
		"http://localhost:8081/realms/stacklok/protocol/openid-connect/certs",
	)

	token, err := jwt.ParseString(tokenString, jwt.WithKeySet(set), jwt.WithValidate(true), jwt.WithToken(openid.New()))
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "failed to parse bearer token: %v", err)
	}

	openIdToken, ok := token.(openid.Token)
	if !ok {
		return nil, status.Errorf(codes.InvalidArgument, "provided token was not an OpenID token: %s", err.Error())
	}

	// check if user exists
	user, err := s.store.GetUserBySubject(ctx, openIdToken.Subject())
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, status.Error(codes.NotFound, "user not found")
		}
		return nil, status.Errorf(codes.Internal, "failed to get user: %s", err)
	}

	var resp pb.GetUserResponse
	resp.User = &pb.UserRecord{
		Id:             user.ID,
		OrganizationId: user.OrganizationID,
		CreatedAt:      timestamppb.New(user.CreatedAt),
		UpdatedAt:      timestamppb.New(user.UpdatedAt),
	}

	groups, roles, err := getUserDependencies(ctx, s.store, user)
	if err != nil {
		return nil, status.Errorf(codes.Unknown, "failed to get user dependencies: %s", err)
	}
	resp.Groups = groups
	resp.Roles = roles

	return &resp, nil
}

type updatePasswordValidation struct {
	Password             string `validate:"min=8,containsany=_.;?&@"`
	PasswordConfirmation string `validate:"min=8,containsany=_.;?&@"`
}

type updateProfileValidation struct {
	Email     string `db:"email" validate:"omitempty,email"`
	FirstName string `db:"first_name" validate:"omitempty,alphaunicode"`
	LastName  string `db:"last_name" validate:"omitempty,alphaunicode"`
}
