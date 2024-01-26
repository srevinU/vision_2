FROM jenkins/jenkins:lts
USER root
RUN apt update
RUN apt upgrade -y
RUN apt install make
RUN apt-get update
RUN apt-get install ca-certificates curl gnupg
RUN install -m 0755 -d /etc/apt/keyrings

RUN curl -fsSLO https://get.docker.com/builds/Linux/x86_64/docker-17.04.0-ce.tgz \
  && tar xzvf docker-17.04.0-ce.tgz \
  && mv docker/docker /usr/local/bin \
  && rm -r docker docker-17.04.0-ce.tgz

RUN curl -L https://github.com/docker/compose/releases/download/v2.24.3/docker-compose-Linux-aarch64 -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose
RUN apt update
# RUN touch ../git-crypt-key

# docker build --no-cache -t jenkins-docker-test .