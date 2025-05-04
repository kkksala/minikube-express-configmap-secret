
# Kubernetes Minikube Express App — Cheat Sheet

## Start Minikube 
--------------------------------------------------------------------
```bash
minikube start
minikube stop
minikube delete
minikube start --driver=docker
kubectl get nodes
```

## Build or Pull Docker Image 
--------------------------------------------------------------------
```bash
eval $(minikube docker-env)             # Switch your terminal to Minikube’s Docker
eval $(minikube docker-env -u)          # Revert back to local Docker

docker build -t express-k8s-app:latest .
docker tag express-k8s-app ilouckov/express-k8s-app
docker push ilouckov/express-k8s-app    # Optional if using remote image
```

## Apply Kubernetes Manifests 
--------------------------------------------------------------------
```bash
kubectl apply -f k8s/configmap.yaml     # Apply ConfigMap 
kubectl apply -f k8s/secret.yaml        # Apply Secret 
kubectl apply -f k8s/deployment.yaml    # Apply Deployment 
kubectl apply -f k8s/service.yaml       # Apply Service 
```

## Check Resources 
--------------------------------------------------------------------
```bash
kubectl get all                         # Verify Pods, Deployments, Service
```

## Access the App & Test Endpoints
--------------------------------------------------------------------
```bash
minikube service express-service --url  # Get external URL

curl http://<minikube-ip>:<nodePort>/                   # Root endpoint (ConfigMap values)
curl http://<minikube-ip>:<nodePort>/check-api          # Check API_KEY from Secret
curl http://<minikube-ip>:<nodePort>/healthz            # Health check
```

## Check Pod Environment Variables 
--------------------------------------------------------------------
```bash
kubectl exec deploy/express-app -- printenv | grep API_KEY  # Outputs the secret API key in plaintext
```
