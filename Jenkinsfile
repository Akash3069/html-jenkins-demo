pipeline {
  agent any

  environment {
    IMAGE = 'akash550/html-jenkins-demo'
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/Akash3069/html-jenkins-demo.git', branch: 'main'
      }
    }

    stage('Docker Build') {
      steps {
        sh "docker build -t ${IMAGE}:${BUILD_NUMBER} ."
      }
    }

    stage('Run Docker Container') {
      steps {
        sh """
          docker stop htmlapp || true
          docker rm htmlapp || true
          docker run -d --name htmlapp -p 80:80 ${IMAGE}:${BUILD_NUMBER}
        """
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', 
                                          usernameVariable: 'DOCKER_USER', 
                                          passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh "docker push ${IMAGE}:${BUILD_NUMBER}"
        }
      }
    }
  }

  post {
  success {
    mail to: 'athengumparampil@gmail.com',
         subject: "Build Success: ${BUILD_NUMBER}",
         body: "Jenkins pipeline succeeded!"
  }
  failure {
    mail to: 'athengumparampil@gmail.com',
         subject: "Build Failed: ${BUILD_NUMBER}",
         body: "Please check Jenkins pipeline logs for build ${BUILD_NUMBER}"
  }
}

}

