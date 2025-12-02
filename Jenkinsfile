pipeline {
  agent any

  environment {
    IMAGE = "akash550/html-jenkins-demo"    // change or leave if not pushing
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        script { echo "Building branch: ${env.BRANCH_NAME}" }
      }
    }

    stage('Unit Test') {
      steps {
        sh 'npm ci'
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          def tag = env.BRANCH_NAME.replaceAll('/', '-')
          sh "docker build -t ${IMAGE}:${tag} ."
        }
      }
    }

    stage('Push Image (optional)') {
      when {
        expression { return env.DOCKER_PUSH == 'true' }
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          script {
            def tag = env.BRANCH_NAME.replaceAll('/', '-')
            sh '''
              echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
              docker push ${IMAGE}:${tag}
              docker logout
            '''
          }
        }
      }
    }
  }

  post {
    success { echo "Build success for ${env.BRANCH_NAME}" }
    failure { echo "Build failed for ${env.BRANCH_NAME}" }
  }
}

