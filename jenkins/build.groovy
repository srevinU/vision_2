def buildApp() {
    echo 'Building the application....'
    sh "apt update"
    sh "apt upgrade"
    sh "apt install make" 
    sh "npm i"
}

return this
