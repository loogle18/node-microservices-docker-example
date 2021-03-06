const ObjectID = require('mongodb').ObjectID;


module.exports = function(app, db) {
  app.get('/books', (req, res) => {
  	db.collection('books').find().toArray((err, result) => {
  		if (err) {
  			res.send({ error: err });
  		} else {
  			res.send(result);
  		}
  	});
  });

  app.get('/books/search', (req, res) => {
    let query = new RegExp(`^${req.query.query}`, 'i');
  	db.collection('books').find({ $or: [ { title: query }, { text: query } ] }).toArray((err, result) => {
  		if (err) {
  			res.send({ error: err });
  		} else {
  			res.send(result);
  		}
  	});
  });

  app.use('/books/:id', (req, res, next) => {
    if (req.params.id) {
      try {
        new ObjectID(req.params.id);
      } catch (err) {
        console.log(err);
        return res.send({ error: 'Invalid id format' });
      }
    }
    next();
  });

	app.get('/books/:id', (req, res) => {
    let { id } = req.params;
    let query = { '_id': new ObjectID(id) };
    db.collection('books').findOne(query, (err, result) => {
      if (err) {
        res.send({ error: err });
      } else {
        if (!result) {
          res.send({ error: `Book with id ${id} doesn't exist` });
        } else {
          res.send(result);
        }
      }
    });
  });

  app.put('/books/:id', (req, res) => {
    let { id } = req.params;
    let query = { '_id': new ObjectID(id) };
    let payload = { $set: { title: req.body.title, text: req.body.text } };
    db.collection('books').findOneAndUpdate(query, payload, (err, result) => {
      if (err) {
        res.send({ error: err });
      } else {
        if (result.value) {
          res.send(result.value);
        } else {
          res.send({ error: `Book with id ${id} doesn't exist` });
        }
      }
    });
  });

  app.post('/books', (req, res) => {
    let book = { text: req.body.text, title: req.body.title };
    db.collection('books').insertOne(book, (err, result) => {
      if (err) {
        res.send({ error: err });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete('/books/:id', (req, res) => {
    let { id } = req.params;
    let query = { '_id': new ObjectID(id) };
    db.collection('books').findOneAndDelete(query, (err, result) => {
      if (err) {
        res.send({ error: err });
      } else {
        if (result.value) {
          res.send(result.value);
        } else {
          res.send({ error: `Book with id ${id} doesn't exist` });
        }
      }
    });
  });
};
