#!/bin/bash
set -e

# Dynamic flag from CTFd-Whale (FLAG env var)
if [ -n "$FLAG" ]; then
  echo "$FLAG" > /home/ctf/flag.txt
else
  echo "flag{FLAG_ENV_NOT_SET}" > /home/ctf/flag.txt
fi

chmod 400 /home/ctf/flag.txt

# Web terminal
exec ttyd -p 7681 -W -w /home/ctf bash
