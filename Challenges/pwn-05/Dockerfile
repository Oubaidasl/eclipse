FROM ubuntu:22.04

# Install only what is needed to host the binary
RUN apt-get update && apt-get install -y \
    socat gcc \
    && rm -rf /var/lib/apt/lists/*

# Create isolated ctf user
RUN useradd -m -d /home/ctf -s /bin/bash ctf
WORKDIR /home/ctf

# Copy challenge files
COPY vuln.c /home/ctf/
COPY flag.txt /home/ctf/

# Compile the binary (adjust security flags as needed per challenge)
RUN gcc -fno-stack-protector -no-pie -o /home/ctf/vuln /home/ctf/vuln.c

# Secure ownership and permissions
# root owns everything, ctf user can only read/execute
RUN chown -R root:ctf /home/ctf && \
    chmod 750 /home/ctf && \
    chmod 750 /home/ctf/vuln && \
    chmod 440 /home/ctf/flag.txt

# Drop root privileges for safety
USER ctf
EXPOSE 10150

# Run socat to listen on port 7681 and execute the binary for every connection
CMD ["socat", "TCP-LISTEN:10150,reuseaddr,fork", "EXEC:/home/ctf/vuln,stderr"]
