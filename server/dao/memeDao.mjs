// === memeDao.mjs ===
import db from './db.mjs';

export function getRandomMeme(excludeIds = []) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM Meme';
    const params = [];
    if (excludeIds.length > 0) {
      const placeholders = excludeIds.map(() => '?').join(',');
      sql += ` WHERE meme_id NOT IN (${placeholders})`;
      params.push(...excludeIds);
    }
    sql += ' ORDER BY RANDOM() LIMIT 1';

    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function getAllMemes() {
  const sql = `SELECT meme_id, title, image_url FROM Meme`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => err ? reject(err) : resolve(rows));
  });
}
