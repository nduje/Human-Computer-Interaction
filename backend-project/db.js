const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(
  "./myapp.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the myapp database.");
    }
  }
);

function setupDatabase() {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )`,
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("Table created or already exists.");
        }
      }
    );
  });
}

function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Database connection closed.");
    }
  });
}

process.on("SIGINT", closeDatabase);

module.exports = {
  setupDatabase,
  db,
};
