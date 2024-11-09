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
                        values '18', '20'
                    }
                }
                
                agent any
                
                stages {
                    stage('Build') {
                        steps {
                            sh 'mkdir -p dist && chmod 777 dist'
                            
                            script {
                                docker.image("node:${NODE_VERSION}-alpine").inside('-u root') {
                                    sh 'npm ci'
                                    sh 'npm run bundle'
                                }
                            }
                            
                            sh 'chmod 644 dist/get-200-status-test.js'
                            stash includes: 'dist/get-200-status-test.js', name: 'k6-test'
                        }
                    }

                    stage('K6 Test') {
                        steps {
                            unstash 'k6-test'
                            
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