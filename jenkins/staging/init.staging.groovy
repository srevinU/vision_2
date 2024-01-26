def init() {
    echo 'Init...'
    sh "apt update"
    sh "apt upgrade -y"
    sh "apt install make" 
    sh "apt install docker -y"
    // sh "apt install docker-compose -y"
    sh "curl -L 'https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep '\"tag_name\":' | sed -E 's/.*\"([^\"]+)\".*/\1/')/docker-compose-$(uname -s)-$(uname -m)' -o /usr/local/bin/docker-compose"
    sh "chmod +x /usr/local/bin/docker-compose"
    sh "touch key"
}

return this