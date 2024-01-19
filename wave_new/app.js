// Set up SQLite database
// Secret key for JWT

const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const secretKey = 'jada';

const app = express();
const port = 3004;

// Routes
const authRoutes = require('./public/auth.js');
const dashboardRoutes = require('./public/dashboard.js');

app.use('/auth', authRoutes);
app.use('/dashboard', authenticate, dashboardRoutes);

// Set up middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());

const db = new sqlite3.Database('database/user.db');

// Add more routes for login, dashboard, etc.
// Route for Register Account: Route for index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/intro.html'));}); //new-account
// Route for More Information
app.get('/about-you', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/about-you.html'));});

// Route to handle user registration
app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Store user account information in the database
  db.run('INSERT INTO users (username, password, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)', [username, password], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }

    console.log(`A new user has been registered with id ${this.lastID}`);
    res.redirect('/about-you'); // Redirect to about-you.html
  });
});

// Route to handle form submission from about-you.html
app.post('/submit-about-you', (req, res) => {
  const familyName = req.body.familyName;
  const phoneNumber = req.body.phoneNumber;
  const grade = req.body.grade;

  // Update the previously inserted row with the additional information and timestamp
  db.run('UPDATE users SET name = ?, phone = ?, user_type = ?, created_at = CURRENT_TIMESTAMP WHERE id = (SELECT MAX(id) FROM users)', 
    [familyName, phoneNumber, grade], function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      console.log(`Login successful`);
      res.redirect('/'); // Redirect to about-you.html
  });
});

// Login route
app.post('/login', (req, res) => {
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

// Protected route (example: dashboard)
app.get('/dashboard', authenticate, (req, res) => {
  // Access the authenticated user's information from req.user
  const username = req.user.username;

  // Return the protected resource
  res.json({ message: `Welcome to the dashboard, ${username}!` });
});

// Logout route (optional)
app.post('/logout', (req, res) => {
  // Perform any logout logic here (e.g., invalidate the JWT)
  res.json({ message: 'Logged out successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
