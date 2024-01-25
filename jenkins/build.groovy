def buildApp() {
    echo 'Building the application....'
    sh "apt update"
    sh "apt upgrade -y"
    sh "apt install make" 
    sh "npm i"
}

return this
