pipeline {
    agent any

    triggers {
        githubPush()
        
        // Optional: Add scheduled builds (e.g., nightly)
        // cron('H 0 * * *')  // Run once per day
        
        // Optional: Poll SCM periodically
        // pollSCM('H */4 * * *')  // Poll every 4 hours
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
                    stage('Setup') {
                        steps {
                            // Clean workspace
                            cleanWs()
                            // Checkout code
                            checkout scm
                            
                            // Install Node.js
                            sh """
                                curl -fsSL https://nodejs.org/dist/v${NODE_VERSION}.0.0/node-v${NODE_VERSION}.0.0-linux-x64.tar.gz | tar xz -C /tmp
                                export PATH="/tmp/node-v${NODE_VERSION}.0.0-linux-x64/bin:\$PATH"
                                node --version
                                npm --version
                            """
                        }
                    }

                    stage('Install Dependencies') {
                        steps {
                            sh 'npm ci'
                        }
                    }

                    stage('Bundle') {
                        steps {
                            sh 'npm run bundle'
                        }
                    }

                    stage('K6 Test') {
                        steps {
                            // Install k6
                            sh '''
                                sudo gpg -k
                                sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
                                echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
                                sudo apt-get update
                                sudo apt-get install k6
                            '''
                            
                            // Run k6 test
                            sh 'k6 run dist/get-200-status-test.js'
                        }
                    }
                }
            }
        }
    }
} 