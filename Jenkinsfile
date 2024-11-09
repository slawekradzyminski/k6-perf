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
                
                stages {
                    stage('Build') {
                        agent {
                            docker {
                                image "node:${NODE_VERSION}-alpine"
                                args '-u root'
                                reuseNode true
                            }
                        }
                        steps {
                            cleanWs()
                            checkout scm
                            
                            sh 'npm ci'
                            sh 'npm run bundle'
                            stash includes: 'dist/get-200-status-test.js', name: 'k6-test'
                        }
                    }

                    stage('K6 Test') {
                        agent {
                            docker {
                                image 'grafana/k6:latest'
                                args '--entrypoint=""'
                                reuseNode true
                            }
                        }
                        steps {
                            unstash 'k6-test'
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