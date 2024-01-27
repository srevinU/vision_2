def buildApp() {
    sh "npm i"
    sh "sudo service docker start"
    sh "git-crypt unlock ../key"
    sh "make start ENV=staging"
    sh "make start-migration"
    sh "make start-sedder"
}

return this
