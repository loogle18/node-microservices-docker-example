const express = require('express');
const app = express();


app.use((req, res, next) => {
  next();
});

app.all('/users', (req, res, next) => {
  res.send('user_api');
});

app.listen(3002, () => {
  console.log('We are live on ' + 3002);
});