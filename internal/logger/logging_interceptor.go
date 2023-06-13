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

// Package logger provides a grpc interceptor that logs the request and response
package logger

import (
	"context"
	"encoding/json"
	"log"
	"os"
	"path"
	"path/filepath"
	"runtime/debug"
	"time"

	"github.com/gogo/protobuf/jsonpb"
	"github.com/rs/zerolog"
	"github.com/stacklok/mediator/pkg/util"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

var (
	// Marshaller is the marshaller used to marshal the proto messages
	Marshaller = &jsonpb.Marshaler{}
	// MaxSize is the maximum size of the log message
	MaxSize = 2048000
)

// Text is the constant for the text format
const Text = "text"

func logTimestamp(logger *zerolog.Event, t time.Time) {
	*logger = *logger.Int64("Timestamp", t.UnixNano())
}

func logResource(logger *zerolog.Event, dict map[string]interface{}) {
	jsonData, err := json.Marshal(dict)
	if err == nil {
		*logger = *logger.Fields(map[string]interface{}{"Resource": jsonData})
	}
}

func logAttributes(logger *zerolog.Event, dict map[string]interface{}) {
	jsonData, err := json.Marshal(dict)
	if err == nil {
		*logger = *logger.Fields(map[string]interface{}{"Attributes": jsonData})
	}
}

// LogIncomingCall will log calls based on
// https://github.com/open-telemetry/oteps/blob/main/text/logs/0097-log-data-model.md#example-log-records
func LogIncomingCall(ctx context.Context, logger *zerolog.Event, method string, t time.Time,
	_ interface{}, res *status.Status) {

	logTimestamp(logger, t)
	logResource(logger, map[string]interface{}{
		"service": path.Dir(method)[1:],
		"method":  path.Base(method),
	})

	meta, ok := metadata.FromIncomingContext(ctx)
	if ok {
		logAttributes(logger, map[string]interface{}{
			"http.user_agent":   meta.Get("user-agent"),
			"http.content-type": meta.Get("content-type"),
			"http.code":         res.Code(),
			"http.duration":     time.Since(t).String(),
		})
	}

}

// LogErrorCall logs calls with errors
func LogErrorCall(ctx context.Context, logger *zerolog.Event, method string, t time.Time,
	req interface{}, res *status.Status, err error) {

	logTimestamp(logger, t)
	logResource(logger, map[string]interface{}{
		"service": path.Dir(method)[1:],
		"method":  path.Base(method),
	})

	meta, ok := metadata.FromIncomingContext(ctx)

	// try to get body from request
	jsonText, jsonErr := json.Marshal(req)

	if jsonErr != nil {
		jsonText = []byte("")
	}
	if ok {
		logAttributes(logger, map[string]interface{}{
			"http.user_agent":      meta.Get("user-agent"),
			"http.content-type":    meta.Get("content-type"),
			"http.code":            res.Code(),
			"http.body":            jsonText,
			"http.duration":        time.Since(t).String(),
			"exception.message":    err.Error(),
			"exception.stacktrace": debug.Stack(),
		})
	}

}

// LogStatusError logs the error as a status error with the specified logger.
func LogStatusError(logger *zerolog.Event, err error) {
	statusErr := status.Convert(err)
	*logger = *logger.Err(err).Str("status", statusErr.Code().String()).Str("msg",
		statusErr.Message()).Interface("details", statusErr.Details())
}

func viperLogLevelToZerologLevel(viperLogLevel string) zerolog.Level {
	switch viperLogLevel {
	case "debug":
		return zerolog.DebugLevel
	case "info":
		return zerolog.InfoLevel
	case "warn":
		return zerolog.WarnLevel
	case "error":
		return zerolog.ErrorLevel
	case "fatal":
		return zerolog.FatalLevel
	default:
		return zerolog.InfoLevel // Default to info level if the mapping is not found
	}
}

// Interceptor creates a gRPC unary server interceptor that logs incoming requests and their responses using Zerolog.
// The interceptor logs the requests with the specified log level.
//
// Parameters:
//   - logLevel: The log level to use for logging. Valid values are "debug", "info", "warn", "error", and "fatal".
//
// Returns:
//   - grpc.UnaryServerInterceptor: The gRPC unary server interceptor function.
//
// Example usage:
//
//	logInterceptor := Interceptor("info")
//	server := grpc.NewServer(
//	  ...
//	  grpc.UnaryInterceptor(logInterceptor),
//	  ...
//	)
func Interceptor(logLevel string, logFormat string, logFile string) grpc.UnaryServerInterceptor {
	// set log level according to config
	zlevel := viperLogLevelToZerologLevel(logLevel)
	zerolog.SetGlobalLevel(zlevel)

	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
		var file *os.File
		var err error
		logToFile := false
		if logFile != "" {
			logFile = filepath.Clean(logFile)
			file, err = os.OpenFile(logFile, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0600)
			if err != nil {
				log.Println("Failed to open log file, defaulting to stdout")
			} else {
				logToFile = true
			}
		}

		var consoleWriter zerolog.ConsoleWriter
		if logFormat == Text {
			consoleWriter = zerolog.ConsoleWriter{
				Out: os.Stdout,
			}
		}

		var zlog zerolog.Logger
		// log in json or text format, and log to file if specified
		if logToFile {
			var multi zerolog.LevelWriter
			if logFormat == Text {
				multi = zerolog.MultiLevelWriter(consoleWriter, os.Stdout, file)
			} else {
				multi = zerolog.MultiLevelWriter(os.Stdout, file)
			}
			zlog = zerolog.New(multi).With().Timestamp().Logger()
		} else {
			if logFormat == Text {
				zlog = zerolog.New(consoleWriter).With().Timestamp().Logger()
			} else {
				zlog = zerolog.New(os.Stdout).With().Timestamp().Logger()
			}
		}

		now := time.Now()
		resp, err := handler(ctx, req)
		ret := status.Convert(err)
		ns := util.GetNiceStatus(ret.Code())
		maskedErr := status.Error(ns.Code, ns.Name)

		if zlog.Error().Enabled() {
			var logger *zerolog.Event
			if err != nil {
				logger = zlog.Error()
				LogErrorCall(ctx, logger, info.FullMethod, now, req, ret, err)
				logger.Msg("exception")
			} else {
				logger = zlog.Info()
				LogIncomingCall(ctx, logger, info.FullMethod, now, req, ret)
				logger.Send()
			}
		}
		defer file.Close()
		return resp, maskedErr
	}
}