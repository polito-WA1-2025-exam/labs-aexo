import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./memeDB.db'); // Adjust path if needed
export default db;

export class Meme {
  constructor(id, imageUrl, correctCaptions = []) {
    this.id = id; // Unique identifier
    this.imageUrl = imageUrl; // URL to meme image
    this.correctCaptions = correctCaptions; // Array of Caption objects
  }
}

export class Caption {
  constructor(id, text, pointValue = 0) {
    this.id = id; // Unique identifier
    this.text = text;
    this.pointValue = pointValue; // 1, 2, or 3 if it's a correct one; 0 otherwise
  }
}

export class Round {
  constructor(roundNumber, meme, allCaptions = [], selectedCaption = null, score = 0) {
    this.roundNumber = roundNumber;
    this.meme = meme; // Meme object
    this.allCaptions = allCaptions; // Array of 7 Caption objects
    this.selectedCaption = selectedCaption; // Caption object
    this.score = score; // Points scored in this round
  }
}

export class Game {
  constructor(id, user, rounds = []) {
    this.id = id;
    this.user = user; // User object or null for anonymous
    this.rounds = rounds; // Array of Round objects
    this.totalScore = 0;
  }

  addRound(round) {
    this.rounds.push(round);
    this.totalScore += round.score;
  }
}

export class User {
  constructor(id, username, games = []) {
    this.id = id;
    this.username = username;
    this.games = games; // Array of Game objects
  }

  addGame(game) {
    this.games.push(game);
  }

  getTotalScore() {
    return this.games.reduce((total, game) => total + game.totalScore, 0);
  }
}
