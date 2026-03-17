FROM ubuntu:22.04

# creating challenge with root
USER root

# installing tools
RUN apt-get update && apt-get install -y \
	ttyd bash coreutils file python3 python3-pip \
	gdb gdbserver binutils \
	&& rm -rf /var/lib/apt/lists/*
RUN pip3 install --no-cache-dir pwntools

# creating ctf user
RUN useradd -m -s /bin/bash ctf
WORKDIR /home/ctf

# Copy and compile the challenge
COPY vuln.c /home/ctf/
RUN gcc -fno-stack-protector -no-pie -o /home/ctf/vuln /home/ctf/vuln.c

# setting up the flag file
RUN touch /flag && chmod 400 /flag
RUN chown root:root /home/ctf/vuln
RUN chmod 4755 /home/ctf/vuln

# starting the challenge
COPY start.sh /start.sh
RUN chmod +x /start.sh
EXPOSE 7681
CMD ["/start.sh"]
