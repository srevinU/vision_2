def buildApp() {
    sh "npm i"
    sh "service docker start"
    // sh "STAGE_NAME=local docker-compose -p "vision-staging"  up"
    // sh "make start-migration"
    // sh "make start-sedder"
}

return this
