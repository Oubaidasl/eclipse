#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>

void win() {
    char buf[128];
    int fd = open("./flag.txt", O_RDONLY);
    if (fd < 0) {
        perror("open");
        return;
    }
    int n = read(fd, buf, sizeof(buf));
    write(1, buf, n);
    close(fd);
}

void vuln() {
    int secret = 0;
    char buf[64];

    printf("secret is at: %p\n", &secret);
    printf("Enter your message: ");
    gets(buf);

    if (secret != 0) {
        printf("You changed secret! Calling win...\n");
        win();
    } else {
        printf("Nothing happened.\n");
    }
}

int main() {
    setvbuf(stdout, NULL, _IONBF, 0);
    setvbuf(stdin, NULL, _IONBF, 0);
    printf("Can you smash the stack?\n");
    vuln();
    return 0;
}

