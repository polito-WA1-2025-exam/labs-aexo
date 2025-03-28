// Import the sqlite3 module using ES module syntax
import sqlite3 from 'sqlite3';

// Open a connection to your SQLite database file
const db = new sqlite3.Database('./DB_memeGame.db', (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

/* ==============================
   DATA RETRIEVAL FUNCTIONS
   ============================== */

/**
 * Retrieve all rows from a specified table.
 * @param {string} tableName - The name of the table.
 * @returns {Promise<Array<Object>>} Promise resolving to an array of objects.
 */
function getAllItems(tableName) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName}`;
    db.all(query, [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

/**
 * Retrieve rows from the Meme table that meet a specific condition.
 * In this example, it selects rows where the id is greater than a given value.
 * @param {number} idThreshold - The id value to compare against.
 * @returns {Promise<Array<Object>>} Promise resolving to an array of objects.
 */
function getMemesByCondition(idThreshold) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Meme WHERE id > ?`;
    db.all(query, [idThreshold], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

/* ==============================
   DATA MODIFICATION FUNCTIONS
   ============================== */

/**
 * Store a new meme in the database.
 * @param {string} imageUrl - The URL of the meme image.
 * @returns {Promise<number>} Promise resolving to the new meme's ID.
 */
function storeNewMeme(imageUrl) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Meme (imageUrl) VALUES (?)`;
    db.run(query, [imageUrl], function(err) {
      if (err) {
        console.error("Error inserting new meme:", err.message);
        return reject(err);
      }
      console.log(`New meme inserted with ID: ${this.lastID}`);
      resolve(this.lastID);
    });
  });
}

/**
 * Delete a meme from the database using its ID.
 * @param {number} id - The ID of the meme to delete.
 * @returns {Promise<boolean>} Promise resolving to true if a row was deleted, otherwise false.
 */
function deleteMemeById(id) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM Meme WHERE id = ?`;
    db.run(query, [id], function(err) {
      if (err) {
        console.error("Error deleting meme:", err.message);
        return reject(err);
      }
      if (this.changes === 0) {
        console.log(`No meme found with ID ${id}.`);
        resolve(false);
      } else {
        console.log(`Meme with ID ${id} deleted.`);
        resolve(true);
      }
    });
  });
}

/**
 * Update the imageUrl of a meme given its ID.
 * @param {number} id - The ID of the meme to update.
 * @param {string} newImageUrl - The new image URL to set.
 * @returns {Promise<boolean>} Promise resolving to true if a row was updated, otherwise false.
 */
function updateMemeImageUrl(id, newImageUrl) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE Meme SET imageUrl = ? WHERE id = ?`;
    db.run(query, [newImageUrl, id], function(err) {
      if (err) {
        console.error("Error updating meme:", err.message);
        return reject(err);
      }
      if (this.changes === 0) {
        console.log(`No meme found with ID ${id} to update.`);
        resolve(false);
      } else {
        console.log(`Meme with ID ${id} updated with new imageUrl.`);
        resolve(true);
      }
    });
  });
}

/* ==============================
   TESTING THE FUNCTIONS
   ============================== */

async function testDatabaseOperations() {
  try {
    console.log("\n=== TEST: RETRIEVING DATA ===");
    const allMemes = await getAllItems('Meme');
    console.log("All Memes:", allMemes);

    const conditionMemes = await getMemesByCondition(1);
    console.log("Memes with id > 1:", conditionMemes);

    console.log("\n=== TEST: INSERTING A NEW MEME ===");
    const newMemeId = await storeNewMeme("newMeme.jpg");

    console.log("\n=== TEST: UPDATING THE MEME IMAGE URL ===");
    await updateMemeImageUrl(newMemeId, "updatedMeme.jpg");

    console.log("\n=== TEST: DELETING THE MEME ===");
    await deleteMemeById(newMemeId);
  } catch (error) {
    console.error("Error during database operations:", error);
  } finally {
    // Close the database connection after a short delay
    setTimeout(() => {
      db.close((err) => {
        if (err) {
          console.error("Error closing database:", err.message);
        } else {
          console.log("Database connection closed.");
        }
      });
    }, 1000);
  }
}

// Run the test
testDatabaseOperations();
