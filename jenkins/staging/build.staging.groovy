def buildApp() {

    sh "make start ENV=staging"
    sh "make start-migration"
    sh "make start-sedder"
}

return this

