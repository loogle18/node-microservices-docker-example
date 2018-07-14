const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url, (err, db) => {
  if (err) return console.log(err);
  
  require('./routes')(app, db);
  app.listen(3003, () => {
    console.log('We are live on ' + 3003);
  });               
});
