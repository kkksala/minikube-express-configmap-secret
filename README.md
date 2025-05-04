
# Kubernetes Express.js App with ConfigMap and Secret

This project demonstrates deploying a simple Express.js application to a Minikube cluster.  
It uses Kubernetes **ConfigMap** for non-sensitive settings and **Secret** for sensitive data.

## 📚 Table of Contents

- [Prereqs](#-prereqs)
- [Project Structure](#-project-structure)
- [Quickstart](#-quickstart)
  - [1️⃣ Start Minikube](#1️⃣-start-minikube)
  - [2️⃣ Build Docker Image & Load into Minikube](#2️⃣-build-docker-image--load-into-minikube-optional-if-using-docker-hub-image)
  - [3️⃣ Deploy Kubernetes Resources](#3️⃣-deploy-kubernetes-resources)
  - [4️⃣ Access the Application](#4️⃣-access-the-application)
- [Endpoints](#-endpoints)
- [Cheatsheet](#-cheatsheet)
- [Note on Secret](#-note-on-secret)
- [Docker Hub Image](#-docker-hub-image)
- [Get the Code](#-get-the-code)
- [License](#-license)
- [Author](#-author)

## 📝 Prereqs

- Docker Desktop (or Docker Engine)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- kubectl
- Node.js (for local testing)
- Docker Hub account

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
└── K8S-CHEATSHEET.md
```

## 🚀 Quickstart

### 1️⃣ Start Minikube

```bash
minikube start
```

✅ Check node is ready:

```bash
kubectl get nodes
```

### 2️⃣ Build Docker Image & Load into Minikube (Optional if using Docker Hub image)

```bash
eval $(minikube docker-env)
docker build -t express-k8s-app:latest .
```

If using Docker Hub image (recommended for portability), ensure your `deployment.yaml` uses:

```yaml
image: ilouckov/express-k8s-app:latest
```

### 3️⃣ Deploy Kubernetes Resources

```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

✅ Check resources:

```bash
kubectl get all
```

### 4️⃣ Access the Application

```bash
minikube service express-service --url
```

Open the URL in your browser or use `curl`:

```bash
curl http://<minikube-ip>:<nodePort>/
curl http://<minikube-ip>:<nodePort>/check-api
curl http://<minikube-ip>:<nodePort>/healthz
curl http://<minikube-ip>:<nodePort>/ready
```

## ✅ Endpoints

| Endpoint     | Description                                     |
| ------------ | ----------------------------------------------- |
| `/`          | Returns app name & environment from ConfigMap    |
| `/check-api` | Shows if API key is configured from Secret       |
| `/healthz`   | Health check endpoint (`200 OK`)                |
| `/ready`     | Readiness probe endpoint (`200 OK`)              |

## 🔥 Cheatsheet

See [K8S-CHEATSHEET.md](./K8S-CHEATSHEET.md) for quick reference commands and testing.

## 🔑 Note on Secret

Your `k8s/secret.yaml` contains the `API_KEY` value encoded in base64.

To create your own secret value:

```bash
echo -n 'YourSecretValueHere' | base64
```

Replace the value in `secret.yaml`.

## 🐳 Docker Hub Image

The Docker image for this app is publicly available at:

[**ilouckov/express-k8s-app**](https://hub.docker.com/r/ilouckov/express-k8s-app)

You can pull it directly using:

```bash
docker pull ilouckov/express-k8s-app:latest
```

## 💾 Get the Code

If you want to clone the repo:

```bash
git clone https://github.com/ILXNAH/minikube-express-configmap-secret
```

Then follow the **Quickstart** steps above!

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

Built by [**ILXNAH**](https://github.com/ILXNAH/) as part of a hands-on DevOps assessment.
