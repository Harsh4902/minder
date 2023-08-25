// Copyright 2023 Stacklok, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//	http://www.apache.role/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// Package rule provides the CLI subcommand for managing rules

// Package eval provides necessary interfaces and implementations for evaluating
// rules.
package eval_test

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/stacklok/mediator/internal/engine/eval"
	pb "github.com/stacklok/mediator/pkg/generated/protobuf/go/mediator/v1"
)

func TestNewRuleEvaluatorWorks(t *testing.T) {
	t.Parallel()

	type args struct {
		rt *pb.RuleType
	}
	tests := []struct {
		name string
		args args
	}{
		{
			name: "JQ",
			args: args{
				rt: &pb.RuleType{
					Def: &pb.RuleType_Definition{
						Eval: &pb.RuleType_Definition_Eval{
							Type: "jq",
							Jq: []*pb.RuleType_Definition_Eval_JQComparison{
								{
									Policy: &pb.RuleType_Definition_Eval_JQComparison_Operator{
										Def: ".",
									},
									Ingested: &pb.RuleType_Definition_Eval_JQComparison_Operator{
										Def: ".",
									},
								},
							},
						},
					},
				},
			},
		},
	}
	for _, tt := range tests {
		tt := tt

		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got, err := eval.NewRuleEvaluator(tt.args.rt)
			assert.NoError(t, err, "unexpected error")
			assert.NotNil(t, got, "unexpected nil")
		})
	}
}

func TestNewRuleEvaluatorFails(t *testing.T) {
	t.Parallel()

	type args struct {
		rt *pb.RuleType
	}
	tests := []struct {
		name string
		args args
	}{
		{
			name: "missing eval",
			args: args{
				rt: &pb.RuleType{
					Def: &pb.RuleType_Definition{},
				},
			},
		},
		{
			name: "unexpected engine",
			args: args{
				rt: &pb.RuleType{
					Def: &pb.RuleType_Definition{
						Eval: &pb.RuleType_Definition_Eval{
							Type: "unexpected",
						},
					},
				},
			},
		},
		{
			name: "missing jq",
			args: args{
				rt: &pb.RuleType{
					Def: &pb.RuleType_Definition{
						Eval: &pb.RuleType_Definition_Eval{
							Type: "jq",
						},
					},
				},
			},
		},
		{
			name: "missing jq policy accessor",
			args: args{
				rt: &pb.RuleType{
					Def: &pb.RuleType_Definition{
						Eval: &pb.RuleType_Definition_Eval{
							Type: "jq",
							Jq: []*pb.RuleType_Definition_Eval_JQComparison{
								{
									Ingested: &pb.RuleType_Definition_Eval_JQComparison_Operator{
										Def: ".",
									},
								},
							},
						},
					},
				},
			},
		},
	}
	for _, tt := range tests {
		tt := tt

		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got, err := eval.NewRuleEvaluator(tt.args.rt)
			assert.Error(t, err, "should have errored")
			assert.Nil(t, got, "should be nil")
		})
	}
}
