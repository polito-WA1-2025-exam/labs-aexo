import db from './db.mjs';

export function addMemeCaptionAssociation(memeId, captionId, points) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO MemeCaption (meme_id, caption_id, points) VALUES (?, ?, ?)';
    db.run(sql, [memeId, captionId, points], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
}