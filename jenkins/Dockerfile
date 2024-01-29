FROM jenkins/jenkins:lts
USER root

RUN apt update
RUN apt install git-crypt
RUN apt install make
RUN apt install -y ca-certificates curl sudo
RUN install -m 0755 -d /etc/apt/keyrings
RUN curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
RUN chmod a+r /etc/apt/keyrings/docker.asc
RUN echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt update
RUN apt install -y docker-ce
RUN rm -rf /var/lib/apt/lists/*

RUN curl -L https://github.com/docker/compose/releases/download/v2.24.3/docker-compose-Linux-aarch64 -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

RUN usermod -a -G docker jenkins
RUN echo 'jenkins:jenkins' | chpasswd
RUN echo 'jenkins ALL=NOPASSWD: ALL' >> /etc/sudoers

USER jenkins