// Connect to the SQLite database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database/user.db');

// Create the quiz_questions table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS daily_consumption (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      date DATE NOT NULL,
      consumption INTEGER NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username)
    )
  `);

  // Function to insert dummy data into daily_consumption table
  function insertDummyData(username, date, consumption) {
    const query = 'INSERT INTO daily_consumption (username, date, consumption) VALUES (?, ?, ?)';
    db.run(query, [username, date, consumption], function(err) {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Inserted data for ${username} on ${date}`);
      }
    });
  }

  // Generate dummy data for user1@gmail.com to user5@gmail.com
  const users = ['user1@gmail.com', 'user2@gmail.com', 'user3@gmail.com', 'user4@gmail.com', 'user5@gmail.com'];
  const dates = ['2022-01-04', '2022-01-05', '2022-01-06'];
  const consumptionValues = [130, 110, 90, 75, 95, 110, 100, 120, 80, 85, 100, 130, 120, 110, 95];

  for (const user of users) {
    for (const date of dates) {
      const consumption = consumptionValues.shift();
      insertDummyData(user, date, consumption);
    }
  }
});

// Close the database connection
db.close();
