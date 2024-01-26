def init() {
    echo 'Init...'
    sh "apt update"
    sh "apt upgrade -y"
    sh "apt install make" 
    sh "apt install docker -y"
    // sh "apt install docker-compose -y"
    sh "curl -L https://github.com/docker/compose/releases/download/v2.24.3/docker-compose-Linux-aarch64 -o /usr/local/bin/docker-compose"
    sh "chmod +x /usr/local/bin/docker-compose"
    sh "touch key"
}

return this

