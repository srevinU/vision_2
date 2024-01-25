def init() {
    echo 'Init...'
    sh "apt update"
    sh "apt upgrade -y"
    sh "apt install make" 
    sh "apt install docker-compose" 
    sh "apt install docker"
}

return this