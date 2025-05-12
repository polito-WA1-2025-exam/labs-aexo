import db from './db.mjs';

export function getCaptionsForMeme(memeId) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT Caption.*, MemeCaption.points FROM Caption
      JOIN MemeCaption ON Caption.caption_id = MemeCaption.caption_id
      WHERE MemeCaption.meme_id = ?`;
    db.all(sql, [memeId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function getDistractorCaptions(memeId, limit) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM Caption
      WHERE caption_id NOT IN (
        SELECT caption_id FROM MemeCaption WHERE meme_id = ?
      )
      ORDER BY RANDOM()
      LIMIT ?`;
    db.all(sql, [memeId, limit], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}