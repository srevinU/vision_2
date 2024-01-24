def testApp() {
    echo 'Testing the application...'
    sh "cd ${WORKSPACE}/e2e && npm run test"
}


return this
