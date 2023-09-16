const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Make sure both username and password are provided
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;

    const db = client.db(dbName);
    const users = db.collection('users');

    // Find the user with the matching username and password
    users.findOne({ username, password }, (err, user) => {
      if (err) throw err;

      // If no matching user is found, send an error message
      if (!user) {
        return res.status(401).send('Invalid username or password');
      }

      // If a matching user is found, send a success message
      res.send('Login successful');
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
const bcrypt = require('bcrypt');
const saltRounds = 10;

// When creating a new user
bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) throw err;

  users.insertOne({ username, password: hash }, (err, result) => {
    if (err) throw err;

    res.send('User created successfully');
  });
});

// When checking a user's login credentials
users.findOne({ username }, (err, user) => {
  if (err) throw err;

  bcrypt.compare(password, user.password, (err, match) => {
    if (err) throw err;

    if (!match) {
      return res.status(401).send('Invalid username or password');
    }

    res.send('Login successful');
  });
});
