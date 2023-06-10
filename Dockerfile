pipeline {
    agent any

    stages {
       stage('delete Existing clone') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh '''rm -fr * .*'''
                }
            }
        }
        
        stage('Clone repository') {
            steps {
                sh '''git clone https://github.com/mlopProject/digisync.git .'''
            }
        }
        
        stage('Build image') {
            steps {
                script {
                    dockerImage = docker.build("anashameed/digisync_frontend:latest")
                }
            }
        }
        
        stage('Push image') {
            steps {
                script {
                    withDockerRegistry([credentialsId: "dockerHubCred", url: ""]) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Run image') {
            steps {
                script {
                        sh 'docker stop digisync_frontend || true'
                        sh 'docker rm digisync_frontend || true'
                        sh '''
                            docker run -d --name digisync_frontend -p 5173:5173 anashameed/digisync_frontend:latest
                          '''
                }
            }
        }
    }
}
