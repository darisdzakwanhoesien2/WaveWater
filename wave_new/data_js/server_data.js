const sqlite3 = require('sqlite3').verbose();

// Create an array of user IDs
const users = [1, 2, 3, 4, 5];

// Generate dummy time-series data for each user
const data = users.map((userId) => {
  const userSeries = [];
  const startDate = new Date(); // Use the current date as the starting point

  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(startDate.getTime() + i * 60 * 60 * 1000); // Add 1 hour to the previous timestamp
    const value = Math.floor(Math.random() * 100); // Generate a random value

    userSeries.push({ userId, timestamp, value });
  }

  return userSeries;
});

// Create a SQLite database and insert the data
const db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');

    // Create the "data" table
    db.run(`
      CREATE TABLE IF NOT EXISTS data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        timestamp TEXT,
        value INTEGER
      )
    `);

    // Insert the data into the "data" table
    data.flat().forEach(({ userId, timestamp, value }) => {
      db.run(`
        INSERT INTO data (userId, timestamp, value)
        VALUES (?, ?, ?)
      `, [userId, timestamp.toISOString(), value]);
    });

    console.log('Data inserted into the database.');

    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  }
});