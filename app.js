const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Configuration from environment variables
const appName = process.env.APP_NAME || 'Default App';
const environment = process.env.ENVIRONMENT || 'development';

// Secret API key from environment variable
const apiKey = process.env.API_KEY || 'no-key-provided';

app.get('/', (req, res) => {
  res.json({
    appName: appName,
    environment: environment,
    message: 'Hello from Kubernetes!'
  });
});

app.get('/check-api', (req, res) => {
  // Simple demonstration of using the API key
  const keyLastFour = apiKey.slice(-4);
  res.json({
    keyStatus: apiKey !== 'no-key-provided' ? 'configured' : 'missing',
    keyLastFourChars: keyLastFour,
    timestamp: new Date().toISOString()
  });
});

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.get('/ready', (req, res) => {
    res.status(200).send('READY');
  });

app.listen(port, () => {
  console.log(`App running with name: ${appName} in ${environment} environment`);
  console.log(`API Key configured: ${apiKey !== 'no-key-provided'}`);
  console.log(`Server listening on port ${port}`);
});