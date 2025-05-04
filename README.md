
# Kubernetes Express.js App with ConfigMap and Secret

This project demonstrates deploying a simple Express.js application to a Minikube cluster.  
It uses Kubernetes **ConfigMap** for non-sensitive settings and **Secret** for sensitive data.

## 📝 Prerequisites

- Docker Desktop (or Docker Engine)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- kubectl
- Node.js (for local testing)

## 📁 Project Structure

```
.
├── app.js
├── package.json
├── Dockerfile
├── k8s/
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── deployment.yaml
│   └── service.yaml
└── README.md
```

## 🚀 Quickstart

### 1️⃣ Start Minikube

```bash
minikube start
```

### 2️⃣ Build Docker Image & Load into Minikube

```bash
eval $(minikube docker-env)
docker build -t express-k8s-app:latest .
```

### 3️⃣ Deploy Kubernetes Resources

```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### 4️⃣ Access the Application

```bash
minikube service express-service --url
```

Open the URL in your browser or use `curl`:

```bash
curl <URL>/
curl <URL>/check-api
```

## ✅ Endpoints

| Endpoint     | Description                        |
| ------------ | ----------------------------------|
| `/`          | Returns app name & environment     |
| `/check-api` | Shows if API key is configured     |
| `/healthz`   | Health check endpoint (`200 OK`)   |

## 🔑 Note on Secret

Your `k8s/secret.yaml` contains the `API_KEY` value encoded in base64.

To create your own secret value:

```bash
echo -n 'YourSecretValueHere' | base64
```

Replace the value in `secret.yaml`.

## 🗂 Download Link

If you want to clone the repo:

```bash
git clone https://github.com/ILXNAH/minikube-express-configmap-secret
```

Then follow the **Quickstart** steps above!
