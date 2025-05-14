import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database('./DB_memeGame.db', (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

/* ==============================
   CRUD API for Meme
   ============================== */
app.get('/memes', (req, res) => {
    db.all("SELECT * FROM Meme", [], (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/memes', (req, res) => {
    const { imageUrl } = req.body;
    db.run("INSERT INTO Meme (imageUrl) VALUES (?)", [imageUrl], function (err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ id: this.lastID, message: "Meme added successfully" });
    });
});

app.delete('/memes/:id', (req, res) => {
    db.run("DELETE FROM Meme WHERE id = ?", [req.params.id], function (err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Meme deleted successfully" });
    });
});

/* ==============================
   CRUD API for Caption
   ============================== */
app.get('/captions', (req, res) => {
    db.all("SELECT * FROM Caption", [], (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/captions', (req, res) => {
    const { text } = req.body;
    db.run("INSERT INTO Caption (text) VALUES (?)", [text], function (err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ id: this.lastID, message: "Caption added successfully" });
    });
});

/* ==============================
   CRUD API for Player
   ============================== */
app.get('/players', (req, res) => {
    db.all("SELECT * FROM Player", [], (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/players', (req, res) => {
    const { username, password } = req.body;
    db.run("INSERT INTO Player (username, password) VALUES (?, ?)", [username, password], function (err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ id: this.lastID, message: "Player added successfully" });
    });
});

/* ==============================
   CRUD API for Game
   ============================== */
app.get('/games', (req, res) => {
    db.all("SELECT * FROM Game", [], (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/games', (req, res) => {
    const { player_username, totalScore } = req.body;
    db.run("INSERT INTO Game (player_username, totalScore) VALUES (?, ?)", [player_username, totalScore], function (err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ id: this.lastID, message: "Game added successfully" });
    });
});

/* ==============================
   CRUD API for Round
   ============================== */
app.get('/rounds', (req, res) => {
    db.all("SELECT * FROM Round", [], (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/rounds', (req, res) => {
    const { game_id, meme_id, selected_caption_id, score } = req.body;
    db.run(
        "INSERT INTO Round (game_id, meme_id, selected_caption_id, score) VALUES (?, ?, ?, ?)",
        [game_id, meme_id, selected_caption_id, score],
        function (err) {
            if (err) res.status(500).json({ error: err.message });
            else res.json({ id: this.lastID, message: "Round added successfully" });
        }
    );
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
