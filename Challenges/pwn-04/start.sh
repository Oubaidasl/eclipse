#!/bin/bash
set -euo pipefail

if [[ -n "${FLAG:-}" ]]; then
  F="$FLAG"
else
  F='flag{FLAG_ENV_NOT_SET}'
fi

# Optional: strip trailing newlines/spaces
F="${F//$'\n'/}"
F="${F%$'\r'}"
F="${F% }"

# Optional: remove exactly one extra trailing '}' if it exists
# (Better: fix the env var source, but this makes the container resilient)
if [[ "$F" == *"}}" ]]; then
  F="${F%?}"
fi

echo "$F" > /flag
chmod 400 /flag
unset FLAG
export FLAG=""
exec su ctf -c 'ttyd -p 7681 -w /home/ctf -t rendererType=canvas -t disableResizeOverlay=true -t disableLeaveAlert=true bash'

