#!/bin/bash
set -e

# setting up the flag
echo "${FLAG:-flag{FLAG_ENV_NOT_SET}}" > /flag
chmod 400 /flag

# protecting start.sh
chmod 400 /start.sh

# Remove FLAG from the environment (best effort)
unset FLAG
export FLAG=""

# Avoid leaving secrets in history
export HISTFILE=/dev/null
unset HISTFILE

# terminal better view
exec su ctf -c "ttyd -p 7681 -W -w /home/ctf -t fontSize=18 -t lineHeight=1.2 bash"

