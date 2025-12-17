# 🚀 CI/CD Pipeline - Quick Setup Guide

## ✅ What You Just Did
You successfully pushed your complete CI/CD pipeline to: 
**https://github.com/aliahmadtahir/Mern-to-do-app**

## 📋 NEXT STEPS - Follow These In Order

### Step 1: Update Your GitHub Actions Workflow
Edit [.github/workflows/ci-cd-pipeline.yml](.github/workflows/ci-cd-pipeline.yml) lines 9-10:

```yaml
env:
  DOCKER_REGISTRY: docker.io
  BACKEND_IMAGE: aliahmadtahir/todo-backend     # ✅ Change this!
  FRONTEND_IMAGE: aliahmadtahir/todo-frontend   # ✅ Change this!
```

Push this change:
```bash
git add .github/workflows/ci-cd-pipeline.yml
git commit -m "Update Docker image names"
git push origin main
```

### Step 2: Create Docker Hub Repositories
1. Go to https://hub.docker.com
2. Login or create account
3. Click "Create Repository"
4. Create TWO repositories:
   - `aliahmadtahir/todo-backend`
   - `aliahmadtahir/todo-frontend`
5. Make them **Public**

### Step 3: Get Docker Hub Access Token
1. Go to https://hub.docker.com/settings/security
2. Click "New Access Token"
3. Name it: "GitHub Actions"
4. Click "Generate"
5. **COPY THE TOKEN** (you won't see it again!)

### Step 4: Add GitHub Secrets
1. Go to https://github.com/aliahmadtahir/Mern-to-do-app/settings/secrets/actions
2. Click "New repository secret"
3. Add these TWO secrets:

**Secret 1:**
- Name: `DOCKER_USERNAME`
- Value: `aliahmadtahir` (your Docker Hub username)

**Secret 2:**
- Name: `DOCKER_PASSWORD`  
- Value: `<paste your Docker Hub access token here>`

### Step 5: Watch Your Pipeline Run! 🎬
1. Go to https://github.com/aliahmadtahir/Mern-to-do-app/actions
2. You should see your workflow running automatically!
3. Monitor these stages:
   - ✅ Build & Test Backend
   - ✅ Build & Test Frontend  
   - ✅ Docker Build & Push
   - ⚠️ Kubernetes Deployment (will fail if you don't have K8s - that's OK!)

## 🎯 For Your Lab Exam - What to Show

### Screenshots You Need:
1. **GitHub Actions**: Successful pipeline run (green checkmarks)
2. **Docker Hub**: Your images with tags
3. **Terminal**: Docker compose running locally
4. **Browser**: Application working

### Test Locally First:
```bash
cd "D:\uni work\seemster 7\devops\lab\final lab exam\mern-todo-app\TODO"
docker-compose up --build
```

Then visit:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/get

## 🔧 If You Want to Skip Kubernetes (Recommended for Now)

Edit [.github/workflows/ci-cd-pipeline.yml](.github/workflows/ci-cd-pipeline.yml) and comment out the K8s deployment:

Find these lines (around line 114) and add `#` at the start:
```yaml
# deploy-kubernetes:
#   name: Deploy to Kubernetes
#   runs-on: ubuntu-latest
#   needs: docker-build-push
#   if: github.ref == 'refs/heads/main'
#   ... (comment all lines until next job)
```

Also comment out the integration-tests job (around line 150).

Then push:
```bash
git add .github/workflows/ci-cd-pipeline.yml
git commit -m "Disable Kubernetes deployment"
git push origin main
```

## 📊 Pipeline Stages Explained

### Stage 1: Build & Test (Runs in parallel)
- Installs Node.js dependencies
- Runs unit tests
- Builds the applications

### Stage 2: Docker Build & Push
- Creates Docker images
- Tags them with Git commit SHA
- Pushes to Docker Hub

### Stage 3: Kubernetes Deploy (Optional)
- Deploys to K8s cluster
- Only runs if you provide KUBE_CONFIG secret

## 🎓 For Your Exam Report

### Your Implementation Includes:

**✅ Build Stage:**
- Backend build with npm install and tests
- Frontend build with npm install and tests
- Runs in parallel for efficiency

**✅ Automated Tests:**
- Jest test framework configured
- Backend API tests
- Frontend React tests

**✅ Docker Image Build & Push:**
- Multi-stage Dockerfile for frontend (optimized size)
- Images tagged with Git SHA and branch name
- Automatic push to Docker Hub registry
- Layer caching for faster builds

**✅ Deployment:**
- Kubernetes deployment manifests for all services
- MongoDB with persistent storage
- Backend with 2 replicas
- Frontend with 2 replicas and Nginx
- Ingress controller for routing

## 🐛 Troubleshooting

### Pipeline fails at Docker login:
- Check DOCKER_USERNAME and DOCKER_PASSWORD secrets
- Verify you're using access token, not password

### "repository does not exist":
- Create repositories on Docker Hub first
- Names must match exactly in workflow file

### Tests fail:
- Check if node_modules are in .gitignore (they should be!)
- Verify package.json has correct test scripts

## 📞 Quick Commands Reference

```bash
# Check pipeline status
https://github.com/aliahmadtahir/Mern-to-do-app/actions

# Test locally with Docker
cd TODO
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild from scratch
docker-compose down -v
docker-compose up --build
```

## ✨ What Makes Your Pipeline Complete

1. **Multi-stage pipeline** with distinct jobs
2. **Parallel execution** for faster builds
3. **Automated testing** at each stage
4. **Docker containerization** with optimized images
5. **Image versioning** with Git SHA tags
6. **Kubernetes deployment** manifests ready
7. **Complete documentation** for reproduction

Good luck with your exam! 🚀
