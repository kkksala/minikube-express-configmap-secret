
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

kubectl delete -f k8s/                  # Clean slate, removes all resources defined in the YAMLs

kubectl apply -f k8s/                   # Recreate all YAML resources
                                        # If Deployment changes -> triggers rolling update:
                                        # -> Kubernetes creates new pod version
                                        # -> Gradually replaces old pod(s)
                                        # -> Zero downtime if configured properly
```

## Check Resources 
--------------------------------------------------------------------
```bash
kubectl get all                         # Verify Pods, Deployments, Service
```

## Access the App & Test the Endpoints
--------------------------------------------------------------------
> 🚨 **If using Minikube Docker driver (Linux), NodePort may not work directly. Always use the service tunnel.**

```bash
minikube service express-service --url  # Get external URL (dynamic port on 127.0.0.1)
                                        # Keep the terminal open for the tunnel.
                                        # Each time you open a new tunnel, the port may change.
```

### Example test:
```bash
curl http://127.0.0.1:<dynamic-port>/                  # Root endpoint (ConfigMap values)
curl http://127.0.0.1:<dynamic-port>/check-api        # Check API_KEY from Secret
curl http://127.0.0.1:<dynamic-port>/healthz          # Health check
curl http://127.0.0.1:<dynamic-port>/ready            # Readiness check
```

## Access via NodePort (advanced testing — may not work with Docker driver)
--------------------------------------------------------------------
```bash
minikube ip                                # Get Minikube cluster IP
kubectl get svc express-service            # Get Service details including NodePort
```

### Example:
```bash
curl http://<minikube-ip>:<NodePort>/ready
```

> ❗ **NodePort (using minikube ip) may fail due to Docker driver network isolation.  
> Solution: Always prefer `minikube service --url` when using Docker driver.**

## Check Pod Environment Variables 
--------------------------------------------------------------------
```bash
kubectl exec deploy/express-deployment -- printenv | grep API_KEY
```
*Outputs the secret API key in plaintext.*

## Debugging & Troubleshooting
--------------------------------------------------------------------
```bash
kubectl describe pod <pod-name>            # View pod details, including probe status and events
kubectl logs <pod-name>                    # View application logs from inside the container
```
