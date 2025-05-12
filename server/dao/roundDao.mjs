// === roundDao.js ===
import db from './db.mjs';

export function addRound(gameId, roundNumber, memeId, selectedCaptionId, pointsAwarded) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO Round (game_id, round_number, meme_id, selected_caption_id, points_awarded)
                 VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [gameId, roundNumber, memeId, selectedCaptionId, pointsAwarded], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
}

export function getRoundsForGame(gameId) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Round WHERE game_id = ? ORDER BY round_number';
    db.all(sql, [gameId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}