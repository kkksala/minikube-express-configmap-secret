# Minikube Express ConfigMap & Secret 🚀

![GitHub Release](https://img.shields.io/github/release/kkksala/minikube-express-configmap-secret.svg)
[![Release Notes](https://img.shields.io/badge/Release%20Notes-Visit%20Here-brightgreen)](https://github.com/kkksala/minikube-express-configmap-secret/releases)

Welcome to the **Minikube Express ConfigMap & Secret** repository! This project demonstrates how to deploy an Express.js application on Minikube using Kubernetes ConfigMap and Secret for configuration management and sensitive data handling. 

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Liveness and Readiness Probes](#liveness-and-readiness-probes)
- [Environment Variables](#environment-variables)
- [Building the Docker Image](#building-the-docker-image)
- [Deploying on Minikube](#deploying-on-minikube)
- [Accessing the Application](#accessing-the-application)
- [Releases](#releases)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repository provides a complete setup for running an Express.js application in a Kubernetes environment using Minikube. It leverages ConfigMaps for configuration settings and Secrets for sensitive data. This approach enhances security and flexibility in managing application settings.

## Features

- Deploys an Express.js app on Minikube
- Utilizes Kubernetes ConfigMap and Secret for configuration and sensitive data
- Implements liveness and readiness probes
- Supports environment variable injection
- Allows local builds and prebuilt Docker Hub images

## Technologies Used

- **Node.js**: JavaScript runtime for building the Express.js application.
- **Express.js**: Web framework for Node.js.
- **Kubernetes**: Container orchestration platform.
- **Minikube**: Local Kubernetes environment.
- **Docker**: Container platform for building images.
- **YAML**: Markup language for configuration files.

## Installation

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/kkksala/minikube-express-configmap-secret.git
cd minikube-express-configmap-secret
```

Ensure you have [Minikube](https://minikube.sigs.k8s.io/docs/start/) and [Docker](https://docs.docker.com/get-docker/) installed on your system.

## Usage

### Starting Minikube

Start Minikube with the following command:

```bash
minikube start
```

### Building the Docker Image

You can build the Docker image locally or use a prebuilt image from Docker Hub. To build the image locally, run:

```bash
docker build -t express-app .
```

### Deploying the Application

Apply the Kubernetes configuration files:

```bash
kubectl apply -f k8s/
```

This command will create the necessary resources, including deployments, services, ConfigMaps, and Secrets.

## Configuration

The application configuration is managed through a ConfigMap and a Secret. 

### ConfigMap

The ConfigMap contains non-sensitive configuration data. You can find it in the `k8s/configmap.yaml` file. Modify this file to update your application settings.

### Secret

The Secret contains sensitive information such as API keys or database credentials. You can find it in the `k8s/secret.yaml` file. Ensure to update this file with your sensitive data.

## Liveness and Readiness Probes

Kubernetes uses liveness and readiness probes to manage application health.

### Liveness Probe

The liveness probe checks if the application is running. If it fails, Kubernetes will restart the pod.

### Readiness Probe

The readiness probe checks if the application is ready to handle traffic. If it fails, Kubernetes will stop sending requests to the pod.

Both probes are defined in the deployment configuration in the `k8s/deployment.yaml` file.

## Environment Variables

The application supports environment variable injection. You can define environment variables in the `k8s/deployment.yaml` file under the `env` section. This allows you to customize application behavior without modifying the code.

## Building the Docker Image

To build the Docker image, you can use the following command:

```bash
docker build -t your-dockerhub-username/express-app .
```

Replace `your-dockerhub-username` with your actual Docker Hub username.

## Deploying on Minikube

Once the Docker image is built, you can push it to Docker Hub or use it directly in Minikube. If you choose to use the local image, ensure Minikube can access it:

```bash
eval $(minikube docker-env)
```

Then, deploy the application using:

```bash
kubectl apply -f k8s/
```

## Accessing the Application

To access the application, you can use the following command to get the service URL:

```bash
minikube service express-app --url
```

This command will provide a URL that you can open in your browser to see the running application.

## Releases

For the latest updates and releases, visit the [Releases](https://github.com/kkksala/minikube-express-configmap-secret/releases) section. Here, you can download the latest release and execute it as needed.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request. 

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for checking out the **Minikube Express ConfigMap & Secret** repository! For more information, please refer to the documentation and explore the features offered by this project.