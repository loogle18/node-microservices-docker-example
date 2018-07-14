const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const apiProxy = httpProxy.createProxyServer();

app.all('*', (req, res, next) => {
  if (req.path.includes('users')) {
    apiProxy.web(req, res, { target: `http://${process.env.USER_API_HOST}:3002` });
  } else if (req.path.includes('books')) {
    apiProxy.web(req, res, { target: `http://${process.env.BOOK_API_HOST}:3003` });
  } else {
    res.status(404).send('Not found.\nThe requested URL was not found on the server.');
  }
});

app.listen(3001, () => {
  console.log('We are live on ' + 3001);
});