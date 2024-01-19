// auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const secretKey = 'jada';
const db = new sqlite3.Database(path.join(__dirname, '../database/user.db'));

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Retrieve user's information from the database based on the provided username
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!row) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if the passwords match
    if (row.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT to authenticate the user
    const token = jwt.sign({ username: row.username }, secretKey, { expiresIn: '1h' });

    // Return the JWT in the response
    res.json({ token });
  });
});

// Middleware to protect routes that require authentication
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verify the JWT
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach the user information to the request object
    req.user = decoded;

    next();
  });
}

// Registration route
router.post('/register', (req, res) => {
  const { username, password, familyName, phoneNumber, grade } = req.body;

  // Store user account information in the database
  db.run('INSERT INTO users (username, password, name, phone, user_type, created_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
    [username, password, familyName, phoneNumber, grade], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      console.log(`A new user has been registered with id ${this.lastID}`);
      res.redirect('/about-you'); // Redirect to about-you.html
    });
});

module.exports = router;
