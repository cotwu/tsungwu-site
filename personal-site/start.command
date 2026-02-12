#!/bin/zsh
cd "$(dirname "$0")"
echo "Starting local server at http://localhost:8080 ..."
(sleep 1; open "http://localhost:8080") &
python3 -m http.server 8080
