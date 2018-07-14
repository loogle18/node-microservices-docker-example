const express = require('express');
const app = express();


app.use((req, res, next) => {
  next();
});

app.all('/books', (req, res, next) => {
  res.send('book_api');
});

app.listen(3003, () => {
  console.log('We are live on ' + 3003);
});