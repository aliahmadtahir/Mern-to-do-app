# Prerequisites Checklist

## ✅ Before Running the Pipeline

### 1. GitHub Repository Setup
- [ ] Create a GitHub repository
- [ ] Push your code to the repository
- [ ] Ensure the main branch exists

### 2. Docker Hub Setup
- [ ] Create a Docker Hub account at https://hub.docker.com
- [ ] Create two repositories:
  - [ ] `<your-username>/todo-backend`
  - [ ] `<your-username>/todo-frontend`
- [ ] Generate Docker Hub access token:
  - Go to Account Settings → Security → New Access Token
  - Give it a name (e.g., "GitHub Actions")
  - Copy the token (you won't see it again!)

### 3. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

#### Required Secrets:
1. **DOCKER_USERNAME**
   - Value: Your Docker Hub username
   - Example: `johndoe`

2. **DOCKER_PASSWORD**
   - Value: Your Docker Hub access token (NOT your password)
   - Example: `dckr_pat_xxxxxxxxxxxxx`

3. **KUBE_CONFIG** (for Kubernetes deployment)
   - Value: Base64 encoded kubeconfig file
   - To generate:
     ```bash
     # Linux/Mac
     cat ~/.kube/config | base64 -w 0
     
     # Windows PowerShell
     [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Content $env:USERPROFILE\.kube\config -Raw)))
     ```

### 4. Update Workflow File

Edit `.github/workflows/ci-cd-pipeline.yml` and update:

```yaml
env:
  DOCKER_REGISTRY: docker.io
  BACKEND_IMAGE: YOUR_DOCKER_USERNAME/todo-backend  # Change this
  FRONTEND_IMAGE: YOUR_DOCKER_USERNAME/todo-frontend  # Change this
```

### 5. Kubernetes Setup (if deploying to K8s)

- [ ] Have a Kubernetes cluster ready (minikube, GKE, EKS, AKS, etc.)
- [ ] Install kubectl on your cluster
- [ ] Verify cluster access: `kubectl cluster-info`
- [ ] Update ingress host in `TODO/k8s/ingress.yaml`:
  ```yaml
  host: your-domain.com  # Change this
  ```

## 🚀 Quick Start Commands

### Test Locally First

```bash
# 1. Build and test backend
cd TODO/todo_backend
npm install
npm test

# 2. Build and test frontend
cd TODO/todo_frontend
npm install
npm test

# 3. Test with Docker Compose
cd TODO
docker-compose up --build
```

### Initialize Git Repository (if not done)

```bash
cd "D:\uni work\seemster 7\devops\lab\final lab exam\mern-todo-app"
git init
git add .
git commit -m "Initial commit with CI/CD pipeline"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 📋 Verification Steps

### After Pushing to GitHub:

1. **Check Workflow Execution**
   - Go to your repo → Actions tab
   - You should see the pipeline running

2. **Monitor Each Stage**
   - Backend Build & Test
   - Frontend Build & Test
   - Docker Build & Push
   - Kubernetes Deployment (if configured)

3. **Check Docker Hub**
   - Visit https://hub.docker.com
   - Verify images are pushed to your repositories

4. **Check Kubernetes Deployment** (if applicable)
   ```bash
   kubectl get pods
   kubectl get services
   kubectl get deployments
   ```

## 🐛 Common Issues & Solutions

### Issue: Pipeline fails at "Login to Docker Hub"
**Solution**: 
- Verify DOCKER_USERNAME and DOCKER_PASSWORD secrets are set correctly
- Ensure you're using an access token, not your password

### Issue: "repository does not exist"
**Solution**: 
- Create repositories on Docker Hub first
- Make sure repository names match in the workflow file

### Issue: Kubernetes deployment fails
**Solution**: 
- Verify KUBE_CONFIG secret is correct
- Check if cluster is accessible
- Ensure namespace exists: `kubectl create namespace default`

### Issue: Tests fail
**Solution**: 
- Run tests locally first: `npm test`
- Check if all dependencies are installed
- Look at the GitHub Actions logs for specific errors

## 📝 Step-by-Step Execution

### For Testing Only (Skip Kubernetes):

If you just want to test Docker build and push without Kubernetes:

1. Comment out the Kubernetes deployment job in `.github/workflows/ci-cd-pipeline.yml`:
   ```yaml
   # deploy-kubernetes:
   #   name: Deploy to Kubernetes
   #   ... (comment out entire job)
   ```

2. Also comment out the integration-tests job that depends on it

3. Push your changes:
   ```bash
   git add .
   git commit -m "Disable K8s deployment for testing"
   git push
   ```

## 🎯 Success Criteria

Your pipeline is working correctly when:
- ✅ All tests pass (green checkmarks in Actions)
- ✅ Docker images appear in Docker Hub
- ✅ Images are tagged with both `latest` and commit SHA
- ✅ (Optional) Application is accessible via Kubernetes

## 📞 Need Help?

If you encounter issues:
1. Check the Actions tab for detailed logs
2. Look at the specific step that failed
3. Verify all secrets are set correctly
4. Ensure repository names match everywhere

## 🎓 For Your Lab Exam

Make sure to document:
- Screenshots of successful pipeline runs
- Docker Hub showing your images
- Kubernetes deployment status (if applicable)
- Any customizations you made

Good luck! 🚀
