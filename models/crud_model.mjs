import db from '../db.mjs';
import { Meme, Caption, Round, User,Game } from './model.mjs';
// ======== MEME CRUD OPERATIONS ========
export async function getAllMemes() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Meme', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows.map(row => new Meme(row.id, row.imageUrl)));
    });
  });
}

export async function getMemeById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Meme WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else if (!row) resolve(null);
      else resolve(new Meme(row.id, row.imageUrl));
    });
  });
}

export async function createMeme(imageUrl) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO Meme (imageUrl) VALUES (?)', [imageUrl], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, imageUrl });
    });
  });
}

export async function updateMeme(id, imageUrl) {
  return new Promise((resolve, reject) => {
    db.run('UPDATE Meme SET imageUrl = ? WHERE id = ?', [imageUrl, id], function (err) {
      if (err) reject(err);
      else resolve({ updated: this.changes });
    });
  });
}

export async function deleteMeme(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Meme WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve({ deleted: this.changes });
    });
  });
}
