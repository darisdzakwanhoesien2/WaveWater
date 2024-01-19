const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database/user.db');


// Create the quiz_questions table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      name TEXT,
      phone TEXT,
      user_type TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert dummy data
  const dummyData = [
    {
      username: "user1@gmail.com",
      password: "pass123",
      name: "John Doe",
      phone: "123-456-7890",
      user_type: "admin",
    },
    {
      username: "user2@gmail.com",
      password: "pass456",
      name: "Jane Smith",
      phone: "987-654-3210",
      user_type: "customer",
    },
    {
      username: "user3@gmail.com",
      password: "pass789",
      name: "Bob Johnson",
      phone: "555-123-4567",
      user_type: "employee",
    },
    {
      username: "user4@gmail.com",
      password: "passABC",
      name: "Alice Williams",
      phone: "888-777-6666",
      user_type: "customer",
    },
    {
      username: "user5@gmail.com",
      password: "passXYZ",
      name: "Charlie Brown",
      phone: "999-888-7777",
      user_type: "admin",
    },
];

  const insertStmt = db.prepare(`
    INSERT INTO users (username, password, name, phone, user_type)
    VALUES (?, ?, ?, ?, ?)
  `);

  dummyData.forEach(({ username, password, name, phone, user_type }) => {
    insertStmt.run(username, password, name, phone, user_type);
  });

  insertStmt.finalize();

  // Display the inserted data
  db.each('SELECT * FROM users', (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row);
  });
});

// Close the database connection
db.close();
