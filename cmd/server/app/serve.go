//
// Copyright 2023 Stacklok, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package app

import (
	"context"
	"fmt"
	"log"
	"net"
	"net/http"
	"sync"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/stacklok/mediator/pkg/controlplane"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/reflection"
)

func webhookHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement webhook handler
	//nolint:errcheck
	w.Write([]byte("OK"))
}

func loggingInterceptor(level string) grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
		md, ok := metadata.FromIncomingContext(ctx)
		if ok {
			for key, values := range md {
				for _, value := range values {
					log.Printf("[%s] header received: %s=%s", level, key, value)
				}
			}
		}
		resp, err := handler(ctx, req)
		log.Printf("[%s] method called: %s", level, info.FullMethod)
		log.Printf("[%s] incoming request: %v", level, req)

		log.Printf("[%s] outgoing response: %v", level, resp)
		return resp, err
	}
}

func startGRPCServer(address string) {
	lis, err := net.Listen("tcp", address)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	log.Println("Initializing logger in level: " + viper.GetString("logging.level"))

	var s *grpc.Server

	if viper.GetString("logging.level") == "debug" {
		s = grpc.NewServer(
			grpc.Creds(insecure.NewCredentials()),
			grpc.UnaryInterceptor(loggingInterceptor(viper.GetString("logging.level"))),
		)
	} else {
		s = grpc.NewServer(
			grpc.Creds(insecure.NewCredentials()),
		)
	}

	// register the services (declared within register_handlers.go)
	controlplane.RegisterGRPCServices(s)

	reflection.Register(s)

	log.Printf("Starting gRPC server on %s", address)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

func startHTTPServer(address, grpcAddress string) {

	mux := http.NewServeMux()

	mux.HandleFunc("/api/v1/github/hook", webhookHandler)

	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	gwmux := runtime.NewServeMux()

	opts := []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())}

	// register the services (declared within register_handlers.go)
	controlplane.RegisterGatewayHTTPHandlers(ctx, gwmux, grpcAddress, opts)

	mux.Handle("/", gwmux)

	log.Printf("Starting HTTP server on %s", address)
	if err := http.ListenAndServe(address, mux); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

// serveCmd represents the serve command
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start the mediator platform",
	Long:  `Starts the mediator platform, which includes the gRPC server and the HTTP gateway.`,
	Run: func(cmd *cobra.Command, args []string) {
		http_host := viper.GetString("http_server.host")
		http_port := viper.GetInt("http_server.port")
		grpc_host := viper.GetString("grpc_server.host")
		grpc_port := viper.GetInt("grpc_server.port")

		// If the user has specified a flag, use that value
		// instead of the one set within the config file
		if cmd.Flags().Changed("http-host") {
			http_host, _ = cmd.Flags().GetString("http-host")
		}
		if cmd.Flags().Changed("http-port") {
			http_port, _ = cmd.Flags().GetInt("http-port")
		}
		if cmd.Flags().Changed("grpc-host") {
			grpc_host, _ = cmd.Flags().GetString("grpc-host")
		}
		if cmd.Flags().Changed("grpc-port") {
			grpc_port, _ = cmd.Flags().GetInt("grpc-port")
		}

		httpAddress := fmt.Sprintf("%s:%d", http_host, http_port)
		grpcAddress := fmt.Sprintf("%s:%d", grpc_host, grpc_port)

		var wg sync.WaitGroup
		wg.Add(2)

		go func() {
			startGRPCServer(grpcAddress)
			wg.Done()
		}()

		go func() {
			startHTTPServer(httpAddress, grpcAddress)
			wg.Done()
		}()

		wg.Wait()
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)
	serveCmd.PersistentFlags().String("http-host", "", "Server host")
	serveCmd.PersistentFlags().Int("http-port", 0, "Server port")
	serveCmd.PersistentFlags().String("grpc-host", "", "Server host")
	serveCmd.PersistentFlags().Int("grpc-port", 0, "Server port")
	serveCmd.PersistentFlags().String("logging", "", "Log Level")
	if err := viper.BindPFlags(serveCmd.PersistentFlags()); err != nil {
		log.Fatal(err)
	}
}
