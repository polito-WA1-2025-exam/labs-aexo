import sqlite3 from "sqlite3";

// TODO: change the path to the database file
const db = new sqlite3.Database("./temp.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

/**
 * Retrieve all rows from a specified table.
 * @param {string} tableName - The name of the table.
 * @returns {Promise<Array<Object>>} Promise resolving to an array of objects.
 */
const getAllItems = (tableName) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

/**
 * Retrieve rows from a table that meet a specific condition.
 * @param {number} idThreshold - The id value to compare against.
 * @returns {Promise<Array<Object>>} Promise resolving to an array of objects.
 */
const getMemesByCondition = (idThreshold) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Meme WHERE id > ?", [idThreshold], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

// Testing the functions:
getAllItems("Meme")
  .then((memes) => console.log("All Memes:", memes))
  .catch((err) => console.error("Error retrieving all memes:", err));

// Uncomment to test:
getMemesByCondition(1)
  .then((memes) => console.log("Memes with id > 1:", memes))
  .catch((err) => console.error("Error retrieving memes by condition:", err));

// Optionally, close the database connection when done
setTimeout(() => {
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database connection closed.");
    }
  });
}, 3000);
