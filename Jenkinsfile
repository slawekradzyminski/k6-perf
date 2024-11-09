pipeline {
    agent any

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
                        values '18', '20'
                    }
                }
                
                stages {
                    stage('Build') {
                        steps {
                            script {
                                sh 'mkdir -p dist'
                                
                                docker.image("node:${NODE_VERSION}-alpine").inside('-u root') {
                                    sh '''
                                        npm ci
                                        npm run bundle
                                    '''
                                }
                            }
                        }
                    }

                    stage('K6 Test') {
                        steps {
                            script {
                                docker.image('grafana/k6:latest').inside('--entrypoint=""') {
                                    sh '''
                                        k6 version
                                        k6 run dist/get-200-status-test.js
                                    '''
                                }
                            }
                        }
                    }
                }
            }
        }
    }
} 