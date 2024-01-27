def buildApp() {
    sh "npm i"
    sh "sudo service docker start"
    // sh "STAGE_NAME=staging docker-compose -p 'vision-staging' up"
    // sh "make start-migration"
    // sh "make start-sedder"
}

return this
