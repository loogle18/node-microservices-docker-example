const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const pgp = require('pg-promise')(config.db.options);
const db = pgp(config.db.url);
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app, db);
app.listen(3002, () => {
  console.log('We are live on ' + 3002);
});