import db from './db.mjs';
import dayjs from 'dayjs';

export function createGame(userId) {
  return new Promise((resolve, reject) => {
    const startTime = dayjs().format('YYYY-MM-DD HH:mm:ss');  // e.g., 2025-05-10 14:32:00
    const sql = 'INSERT INTO Game (user_id, start_time) VALUES (?, ?)';
    db.run(sql, [userId, startTime], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
}

export function completeGame(gameId, totalScore) {
  return new Promise((resolve, reject) => {
    const endTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const sql = 'UPDATE Game SET end_time = ?, total_score = ? WHERE game_id = ?';
    db.run(sql, [endTime, totalScore, gameId], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
}

export function getGamesForUser(userId) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Game WHERE user_id = ? ORDER BY start_time DESC';
    db.all(sql, [userId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function getGameById(gameId) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Game WHERE game_id = ?';
    db.get(sql, [gameId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
} 
