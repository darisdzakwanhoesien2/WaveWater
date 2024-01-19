// server/routes/dashboard.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to protect routes that require authentication
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verify the JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach the user information to the request object
    req.user = decoded;

    next();
  });
}

// Dashboard route
router.get('/', authenticate, (req, res) => {
  const username = req.user.username;

  // Replace this query with your actual query to retrieve dashboard data
  const query = `SELECT * FROM dashboard_data WHERE username = ?`;

  // Execute the query to retrieve the dashboard data
  db.all(query, [username], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Format the data as needed for the dashboard
    const dashboardData = rows.map(row => ({
      // Map the columns from the database to the desired format
      // Example: column1: row.column1, column2: row.column2
    }));

    res.json({ username, dashboardData });
  });
});

module.exports = router;

// // server/routes/dashboard.js
// const express = require('express');
// const router = express.Router();
// const sqlite3 = require('sqlite3').verbose();
// const jwt = require('jsonwebtoken');

// // Connect to SQLite database
// const db = new sqlite3.Database('./database/user.db');

// router.get('/', (req, res) => {
//   const username = req.user.username;

//   // Replace this query with your actual query to retrieve daily consumption data
//   const query = `SELECT date, consumption FROM daily_consumption WHERE username = ?`;

//   db.all(query, [username], (err, rows) => {
//     if (err) {
//       return res.status(500).json({ error: 'Internal server error' });
//     }

//     // Format the data as needed for the chart
//     const dailyConsumptionData = {
//       dates: rows.map(row => row.date),
//       consumption: rows.map(row => row.consumption),
//     };

//     res.json({ username, dailyConsumptionData });
//   });
// });

// // Middleware to protect routes that require authentication
// function authenticate(req, res, next) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   // Verify the JWT
//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     // Attach the user information to the request object
//     req.user = decoded;

//     next();
//   });
// }

// module.exports = router;
