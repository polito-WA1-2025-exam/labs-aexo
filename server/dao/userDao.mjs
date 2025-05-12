import db from './db.mjs';

export function getUser(username, password) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM User WHERE username = ? AND password_hash = ?';
    db.get(sql, [username, password], (err, row) => {
      if (err) {
        reject(err);
      } else if (!row) {
        reject('Invalid username or password');
      } else {
        resolve({ id: row.user_id, username: row.username, email: row.email });
      }
    });
  });
}

export function createUser(email, password, username) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO User (username, password_hash, email) VALUES (?, ?, ?)';
    db.run(sql, [username, password, email], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
}
