#!/bin/zsh
cd "$(dirname "$0")"
PORT=8080

if lsof -nP -iTCP:${PORT} -sTCP:LISTEN >/dev/null 2>&1; then
  PORT=8081
fi

echo "Starting local server at http://localhost:${PORT} ..."
(sleep 1; open "http://localhost:${PORT}") &
python3 -m http.server "${PORT}"
