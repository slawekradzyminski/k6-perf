pipeline {
    agent none

    triggers {
        githubPush()
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Build & Test') {
            matrix {
                axes {
                    axis {
                        name 'NODE_VERSION'
                        values '20'
                    }
                }
                
                stages {
                    stage('Build') {
                        agent {
                            docker {
                                image "node:${NODE_VERSION}-alpine"
                                args '-u root'
                            }
                        }
                        steps {
                            cleanWs()
                            checkout scm
                            
                            sh 'npm ci'
                            sh 'npm run bundle'
                        }
                    }

                    stage('K6 Test') {
                        agent {
                            docker {
                                image 'grafana/k6:latest'
                                args '-u root'
                            }
                        }
                        steps {
                            sh 'k6 run dist/get-200-status-test.js'
                        }
                    }
                }
            }
        }
    }
} 