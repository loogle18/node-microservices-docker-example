module.exports = function(app, db) {
  app.get('/users', (req, res) => {
    db.any('SELECT * FROM users')
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send({ error: err });
    });
  });

  app.get('/users/search', (req, res) => {
    db.any('SELECT * FROM users WHERE LOWER(first_name) LIKE ${query} OR LOWER(last_name) LIKE ${query}', {
      query: `%${(req.query.query || '').toLowerCase()}%`
    })
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send({ error: err });
    });
  });

  app.use('/users/:id', (req, res, next) => {
    if (req.params.id) {
      if (isNaN(req.params.id)) {
        return res.send({ error: 'Invalid id format' });
      }
    }
    next();
  });

	app.get('/users/:id', (req, res) => {
    let { id } = req.params;
    db.oneOrNone('SELECT * FROM users WHERE id = $1', id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.send({ error: `User with id ${id} doesn't exist` });
      }
    })
    .catch((err) => {
      res.send({ error: err });
    });
  });

  app.put('/users/:id', (req, res) => {
    let { id } = req.params;
    db.oneOrNone('UPDATE users SET first_name = ${first_name}, last_name = ${last_name}, age = ${age} WHERE id = ${id} RETURNING *', {
      id: id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age
    })
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.send({ error: `User with id ${id} doesn't exist` });
      }
    })
    .catch((err) => {
      res.send({ error: err });
    });
  });

  app.post('/users', (req, res) => {
    db.one('INSERT INTO users(first_name, last_name, age) VALUES(${first_name}, ${last_name}, ${age}) RETURNING *', {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send({ error: err });
    });
  });

  app.delete('/users/:id', (req, res) => {
    let { id } = req.params;
    db.oneOrNone('DELETE FROM users WHERE id = $1 RETURNING *', id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.send({ error: `User with id ${id} doesn't exist` });
      }
    })
    .catch((err) => {
      res.send({ error: err });
    });
  });
};
