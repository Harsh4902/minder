-- name: CreateSessionState :one
INSERT INTO session_store (provider, project_id, session_state, owner_filter, redirect_url) VALUES ($1, $2, $3, $4, $5) RETURNING *;

-- name: GetSessionState :one
SELECT * FROM session_store WHERE id = $1;

-- name: GetSessionStateByProjectID :one
SELECT * FROM session_store WHERE project_id = $1;

-- name: GetProjectIDBySessionState :one
SELECT provider, project_id, owner_filter, redirect_url FROM session_store WHERE session_state = $1;

-- name: DeleteSessionState :exec
DELETE FROM session_store WHERE id = $1;

-- name: DeleteSessionStateByProjectID :exec
DELETE FROM session_store WHERE provider=$1 AND project_id = $2;

-- name: DeleteExpiredSessionStates :exec
DELETE FROM session_store WHERE created_at < NOW() - INTERVAL '1 day';