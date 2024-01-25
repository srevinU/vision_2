def init() {
    echo 'Init...'
    sh "apt update"
    sh "apt upgrade -y"
    sh "apt install make" 
    sh "apt install docker -y"
    sh "apt install docker-compose -y" 
}

return this