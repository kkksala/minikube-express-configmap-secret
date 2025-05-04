// Import the Express framework (simplifies building web servers in Node.js)
const express = require('express');

// Create an Express app instance
const app = express();

// Define the port (from environment or default to 3000)
const port = process.env.PORT || 3000;

/* 🔧 CONFIGURATION VARIABLES
   These environment variables are injected into the container 
   using Kubernetes ConfigMap and Secret.
   - APP_NAME and ENVIRONMENT come from the ConfigMap
   - API_KEY comes from the Secret */

const appName = process.env.APP_NAME || 'Default App';
const environment = process.env.ENVIRONMENT || 'development';
const apiKey = process.env.API_KEY || 'no-key-provided';

/* 🚪 ROOT ENDPOINT ("/")
   Basic endpoint to verify the app is running and shows configuration details. */

app.get('/', (req, res) => {
  res.json({
    appName: appName,
    environment: environment,
    message: 'Hello from Kubernetes!'
  });
});

/* 🔑 CHECK API ENDPOINT ("/check-api")
   Demonstrates how the app uses the secret API key.
   It returns:
   - Whether the API key was configured
   - Last 4 characters of the API key (for testing/debugging without exposing full key)
   - Current timestamp */

app.get('/check-api', (req, res) => {
  const keyLastFour = apiKey.slice(-4);
  res.json({
    keyStatus: apiKey !== 'no-key-provided' ? 'configured' : 'missing',
    keyLastFourChars: keyLastFour,
    timestamp: new Date().toISOString()
  });
});

/* ❤️ LIVENESS PROBE ENDPOINT ("/healthz")
   Kubernetes uses this to check if the app is still running.
   If this fails repeatedly, Kubernetes will restart the pod. */

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

/* 💚 READINESS PROBE ENDPOINT ("/ready")
   Kubernetes uses this to decide if the app is ready to receive traffic.
   Until this responds OK, Kubernetes won't send traffic to this pod. */

app.get('/ready', (req, res) => {
    res.status(200).send('READY');
});

/* 🖥️ START THE SERVER
   Starts the Express app and logs useful information for debugging. */

app.listen(port, () => {
  console.log(`App running with name: ${appName} in ${environment} environment`);
  console.log(`API Key configured: ${apiKey !== 'no-key-provided'}`);
  console.log(`Server listening on port ${port}`);
});
