'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const appInsights = require("applicationinsights");

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';
const I_KEY = process.env.INSTRUMENTATION_KEY;

if(!I_KEY){
    console.error("Azure Application Insights Instrumentation Key is not present in enviornment variable. set 'INSTRUMENTATION_KEY' Enviroment variable with Instrumentation key.");
    return;
}

// setup appilcation insights.
appInsights.setup(I_KEY)
    .setAutoCollectPerformance(true)
    .setAutoCollectRequests(false)
    .setAutoCollectDependencies(false)
    .setAutoDependencyCorrelation(false)
    .setAutoCollectExceptions(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
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
console.log(`Running on http://${HOST}:${PORT} , Instrumentation Key: [${I_KEY}]`);