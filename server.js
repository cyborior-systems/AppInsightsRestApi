'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const appInsights = require("applicationinsights");

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';
const I_KEY = process.env.INSTRUMENTATION_KEY || "7ef83942-4cf2-46f4-8233-45c7d1e22fed";

// setup appilcation insights.
appInsights.setup(I_KEY)
    .setAutoCollectPerformance(true)
    .setAutoCollectRequests(false)
    .setAutoCollectDependencies(false)
    .setAutoDependencyCorrelation(false)
    .setAutoCollectExceptions(false)
    .setAutoCollectConsole(false)
    .setUseDiskRetryCaching(false)
    .start();

let client = appInsights.defaultClient;

// App
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Telemetry API is Running.\n');
});

app.post('/trackEvent', (req, res) => {
    let body = req.body;
    client.trackEvent(body);
    res.status(200).send();
});

app.post('/trackException', (req, res) => {
    let body = req.body;
    client.trackException(body);
    res.status(200).send();
});

app.post('/trackMetric', (req, res) => {
    let body = req.body;
    client.trackMetric(body);
    res.status(200).send();
});

app.post('/trackTrace', (req, res) => {
    let body = req.body;
    client.trackTrace(body);
    res.status(200).send();
});

app.post('/trackDependency', (req, res) => {
    let body = req.body;
    client.trackDependency(body);
    res.status(200).send();
});

app.post('/trackRequest', (req, res) => {
    let body = req.body;
    client.trackRequest(body);
    res.status(200).send();
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);