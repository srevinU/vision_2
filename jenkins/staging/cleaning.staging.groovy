def cleanApp() {
    echo 'Cleaning the application...'
    sh 'docker rm -vf $(docker ps -aq)'
    sh 'docker rmi -f $(docker images -aq)'
}

return this