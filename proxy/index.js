const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const { GATEWAY_HOST, APP_USER, APP_PASSWORD } = process.env;
const gatewayProxy = httpProxy.createProxyServer({ target: `http://${GATEWAY_HOST}` });


app.use((req, res, next) => {
  let basicAuth = (req.headers.authorization || '').split(' ')[1] || '';
  let [user, password] = new Buffer(basicAuth, 'base64').toString().split(':');
  if (user === APP_USER && password === APP_PASSWORD) {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm="401"');
    res.status(401).send('Authentication required.');
  }
});

app.all('*', (req, res, next) => {
  gatewayProxy.web(req, res);
});

app.listen(3000, () => {
  console.log('We are live on ' + 3000);
});