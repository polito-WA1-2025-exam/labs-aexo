'use strict';

// imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';

// DAOs
import { getUser, createUser } from './dao/userDao.mjs';
import { getRandomMeme, getAllMemes }        from './dao/memeDao.mjs';
import { getCaptionsForMeme,
         getDistractorCaptions } from './dao/captionDao.mjs';
import { addMemeCaptionAssociation } from './dao/memeCaptionDao.mjs';
import { createGame,
         completeGame,
         getGamesForUser,
         getGameById }      from './dao/gameDao.mjs';
import { addRound,
         getRoundsForGame }      from './dao/roundDao.mjs';

const app  = express();
const port = process.env.PORT || 3001;

// --- Middlewares ---
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Serve static memes
app.use('/static', express.static('static'));

// --- Sessions & Passport ---
app.use(session({
  secret: 'your-secure-secret',
  resave: false,
  saveUninitialized: false
}));

passport.use(new LocalStrategy(async (username, password, cb) => {
  try {
    const user = await getUser(username, password);
    return cb(null, user);
  } catch (err) {
    return cb(null, false, { message: err });
  }
}));

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

app.use(passport.initialize());
app.use(passport.session());

// --- Auth helpers ---
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Not authenticated' });
};

// --- Auth routes ---
// Register
app.post('/api/register', async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const id = await createUser(email, password, username);
    res.status(201).json({ user_id: id });
  } catch (err) {
    res.status(400).json({ error: err.toString() });
  }
});

// Login
app.post('/api/sessions', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)      return next(err);
    if (!user)   return res.status(401).json(info);
    req.login(user, (err) => {
      if (err)  return next(err);
      return res.status(200).json(req.user);
    });
  })(req, res, next);
});

// Current session
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) return res.json(req.user);
  return res.status(401).json({ error: 'Not authenticated' });
});

// Logout
app.delete('/api/logout', (req, res) => {
  if(req.isAuthenticated()){
    req.logout(() => res.status(204).end());
  }
  else{
    return res.status(401).json({ error: 'Not authenticated' });
  }
});

// --- Public Meme & Caption APIs ---
// Random meme
app.get('/api/memes/random', async (req, res) => {
  const exclude = (req.query.exclude || '') // the || is used to check if the query parameter is present if not then it will return an empty string
      .split(',').map(n => +n).filter(n => !isNaN(n) && n >= 0); // +n converts string to number, filter ensures only non-negative numbers
  try {
    const meme = await getRandomMeme(exclude);
    res.json(meme);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// Correct captions
app.get('/api/memes/:id/captions', async (req, res) => {
  try {
    const caps = await getCaptionsForMeme(+req.params.id);
    res.json({ correct: caps });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// Distractors
app.get('/api/memes/:id/distractors', async (req, res) => {
  const limit = +req.query.limit || 4;
  try {
    const d = await getDistractorCaptions(+req.params.id, limit);
    res.json({ distractors: d });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// --- Game & Round APIs ---
// Start game
app.post('/api/games', async (req, res) => {
  const { userId } = req.body;
  try {
    const gameId = await createGame(userId || null);
    res.status(201).json({ game_id: gameId });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// Game history
app.get('/api/users/:id/games', async (req, res) => {
  try {
    const all = await getGamesForUser(+req.params.id);
    const finished = all.filter(g => g.end_time);
    res.json({ games: finished });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// Submit a round
app.post('/api/games/:gameId/rounds', async (req, res) => {
  const gameId = +req.params.gameId;
  const { roundNumber, memeId, selectedCaptionId } = req.body;

  try {
    const correct = await getCaptionsForMeme(memeId);
    const match   = correct.find(c => c.caption_id === selectedCaptionId);
    const points  = match ? match.points : 0;

    await addRound(gameId, roundNumber, memeId, selectedCaptionId, points);
    const rounds = await getRoundsForGame(gameId);
    
    // Get game info to check if it has a user ID
    const game = await getGameById(gameId);
    const needed = game.user_id ? 3 : 1;  // If user_id exists, need 3 rounds, otherwise 1

    if (rounds.length >= needed) {
      const total = rounds.reduce((sum, r) => sum + r.points_awarded, 0);
      await completeGame(gameId, total);
      return res.json({ ended: true, total_score: total, summary: rounds });
    }

    res.json({ ended: false, points });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// View rounds for a game
app.get('/api/games/:gameId/rounds', isLoggedIn, async (req, res) => {
  try {
    const rounds = await getRoundsForGame(+req.params.gameId);
    res.json({ rounds });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// --- Meme–Caption association (logged-in only) ---
app.post('/api/meme-captions', isLoggedIn, async (req, res) => {
  const { memeId, captionId, points } = req.body;
  try {
    // Check current number of captions for this meme
    const existingCaptions = await getCaptionsForMeme(memeId);
    
    // Check if meme already has 3 captions
    if (existingCaptions.length >= 3) {
      return res.status(400).json({ 
        error: 'This meme already has 3 captions. Cannot add more correct captions.' 
      });
    }

    // Check if this point value is already used
    if (existingCaptions.some(c => c.points === points)) {
      return res.status(400).json({
        error: `A caption with ${points} points already exists for this meme`
      });
    }

    const id = await addMemeCaptionAssociation(memeId, captionId, points);
    res.status(201).json({ association_id: id });
  } catch (err) {
    res.status(400).json({ error: err.toString() });
  }
});


// get all memes
app.get('/api/memes', isLoggedIn, async (req, res) => {
  try {
    const memes = await getAllMemes(); 
    // [{ meme_id, title, image_url }, …]
    res.json(memes);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});



// Health-check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// start server
app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});
