# MERN Todo App - DevOps CI/CD Pipeline

## 📋 Overview
This project implements a complete CI/CD pipeline for a MERN (MongoDB, Express, React, Node.js) Todo application using GitHub Actions, Docker, and Kubernetes.

## 🏗️ Architecture

### Application Stack
- **Frontend**: React.js with Nginx
- **Backend**: Node.js + Express
- **Database**: MongoDB

### DevOps Stack
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Registry**: Docker Hub

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- Kubernetes cluster (for deployment)
- GitHub account
- Docker Hub account

### Local Development with Docker Compose

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd mern-todo-app/TODO
```

2. **Build and run with Docker Compose**
```bash
docker-compose up --build
```

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### Manual Docker Build

**Backend:**
```bash
cd todo_backend
docker build -t todo-backend:latest .
docker run -p 5000:5000 todo-backend:latest
```

**Frontend:**
```bash
cd todo_frontend
docker build -t todo-frontend:latest .
docker run -p 3000:80 todo-frontend:latest
```

## 🔧 CI/CD Pipeline Setup

### GitHub Actions Workflow

The pipeline includes 5 main jobs:

1. **Backend Build & Test** - Builds backend, runs tests
2. **Frontend Build & Test** - Builds frontend, runs tests
3. **Docker Build & Push** - Creates and pushes Docker images
4. **Kubernetes Deploy** - Deploys to K8s cluster
5. **Integration Tests** - Post-deployment validation

### Required GitHub Secrets

Configure these secrets in your GitHub repository:

```
Settings → Secrets and variables → Actions → New repository secret
```

| Secret Name | Description |
|------------|-------------|
| `DOCKER_USERNAME` | Your Docker Hub username |
| `DOCKER_PASSWORD` | Your Docker Hub password/token |
| `KUBE_CONFIG` | Base64 encoded kubeconfig file |

**Generate base64 kubeconfig:**
```bash
# Linux/Mac
cat ~/.kube/config | base64 -w 0

# Windows PowerShell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Content $env:USERPROFILE\.kube\config -Raw)))
```

## ☸️ Kubernetes Deployment

### Deploy to Kubernetes manually

```bash
cd TODO/k8s

# Deploy MongoDB
kubectl apply -f mongodb-deployment.yaml

# Deploy Backend
kubectl apply -f backend-deployment.yaml

# Deploy Frontend
kubectl apply -f frontend-deployment.yaml

# Setup Ingress
kubectl apply -f ingress.yaml

# Check deployment status
kubectl get pods
kubectl get services
kubectl get ingress
```

### Access the application

```bash
# Get external IP
kubectl get service frontend-service

# Or use port forwarding
kubectl port-forward service/frontend-service 8080:80
```

## 📁 Project Structure

```
mern-todo-app/
├── .github/
│   └── workflows/
│       └── ci-cd-pipeline.yml      # GitHub Actions workflow
├── TODO/
│   ├── docker-compose.yml          # Local development
│   ├── k8s/                        # Kubernetes manifests
│   │   ├── mongodb-deployment.yaml
│   │   ├── backend-deployment.yaml
│   │   ├── frontend-deployment.yaml
│   │   └── ingress.yaml
│   ├── todo_backend/
│   │   ├── Dockerfile
│   │   ├── .dockerignore
│   │   ├── server.js
│   │   ├── package.json
│   │   ├── models/
│   │   └── tests/
│   └── todo_frontend/
│       ├── Dockerfile
│       ├── .dockerignore
│       ├── nginx.conf
│       ├── package.json
│       └── src/
```

## 🧪 Testing

### Backend Tests
```bash
cd TODO/todo_backend
npm install
npm test
```

### Frontend Tests
```bash
cd TODO/todo_frontend
npm install
npm test
```

## 🔄 CI/CD Pipeline Stages

### Stage 1: Build & Test (Parallel)
- Install dependencies
- Run unit tests
- Build artifacts

### Stage 2: Docker Build & Push
- Build Docker images
- Tag with Git SHA and branch
- Push to Docker Hub registry
- Uses layer caching for efficiency

### Stage 3: Deploy to Kubernetes
- Update image tags
- Apply K8s manifests
- Wait for rollout completion
- Verify deployment

### Stage 4: Post-Deployment Tests
- Health checks
- Smoke tests
- Integration tests

## 🐳 Docker Images

Published to Docker Hub:
- `<your-username>/todo-backend:latest`
- `<your-username>/todo-frontend:latest`

## 📝 Configuration

### Backend Environment Variables
```env
MONGODB_URI=mongodb://mongodb-service:27017/Todo
PORT=5000
```

### Frontend Nginx Configuration
See `todo_frontend/nginx.conf` for API proxy configuration.

## 🚨 Troubleshooting

### Pipeline Fails at Docker Push
- Verify Docker Hub credentials in GitHub Secrets
- Check Docker Hub repository exists

### Kubernetes Deployment Fails
- Verify `KUBE_CONFIG` secret is correct
- Check cluster connectivity
- Verify namespace exists

### Application Not Accessible
```bash
# Check pod status
kubectl get pods
kubectl describe pod <pod-name>

# Check logs
kubectl logs <pod-name>

# Check services
kubectl get svc
```

## 📊 Monitoring

### Check Application Health
```bash
# Backend health
curl http://<backend-service>/get

# Frontend
curl http://<frontend-service>/
```

### View Logs
```bash
# Backend logs
kubectl logs -f deployment/todo-backend

# Frontend logs
kubectl logs -f deployment/todo-frontend

# MongoDB logs
kubectl logs -f deployment/mongodb
```

## 🔒 Security Best Practices

- ✅ Use secrets for sensitive data
- ✅ Implement resource limits
- ✅ Use non-root containers
- ✅ Scan images for vulnerabilities
- ✅ Enable RBAC in Kubernetes

## 📈 Scaling

### Scale deployments
```bash
# Scale backend
kubectl scale deployment todo-backend --replicas=3

# Scale frontend
kubectl scale deployment todo-frontend --replicas=3
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file.

## 👨‍💻 Author

Created for DevOps Lab Final Exam

## 📞 Support

For issues and questions, please open an issue in the GitHub repository.
