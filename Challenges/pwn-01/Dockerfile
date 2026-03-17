FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    ttyd bash coreutils file python3 python3-pip \
    gdb gdbserver binutils \
    && rm -rf /var/lib/apt/lists/*

# pwntools
RUN pip3 install --no-cache-dir pwntools

RUN useradd -m -s /bin/bash ctf
WORKDIR /home/ctf

# copy your challenge artifacts
COPY ./challenge/ /home/ctf/
RUN chown -R ctf:ctf /home/ctf

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 7681
USER ctf
CMD ["/start.sh"]

