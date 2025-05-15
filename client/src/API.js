// src/API.js
const APIURL = 'http://localhost:3001';

async function register({ email, password, username }) {
  const res = await fetch(`${APIURL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw err;
  }
  const data = await res.json();
  return data;
}
// be aware that prof used try catch in the video, but i didn't use it because i want to see the error message

async function logIn({ username, password }) {
  const res = await fetch(`${APIURL}/api/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw err;
  }
  const data = await res.json();
  return data;
}

async function currentSession() {
  const res = await fetch(`${APIURL}/api/sessions/current`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json();
    throw err;
  }
  const data = await res.json();
  return data;
}

async function logOut() {
  const res = await fetch(`${APIURL}/api/logout`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json();
    throw err;
  }
  // no body expected on success
  return true;
}

async function healthCheck() {
    const res = await fetch(`${APIURL}/api/health`);
    if (!res.ok) {
      // No JSON body expected on failure, so just throw a generic Error
      throw new Error(`Health check failed (${res.status})`);
    }
    // Parse and return the JSON on success
    const data = await res.json();
    return data;   // { status: 'ok' }
  }

async function fetchRandomMeme(exclude = []) {
  const q = exclude.length ? `?exclude=${exclude.join(',')}` : '';
  const res = await fetch(`${APIURL}/api/memes/random${q}`);
  if (!res.ok) {
    const err = await res.json();
    throw err;
  }
  const data = await res.json();
  return data;
}

async function fetchCorrectCaptions(memeId) {
  const res = await fetch(`${APIURL}/api/memes/${memeId}/captions`);
  if (!res.ok) {
    const err = await res.json();
    throw err;
  }
  const { correct } = await res.json();
  return correct;
}

async function fetchDistractors(memeId, limit = 4) {
  const res = await fetch(`${APIURL}/api/memes/${memeId}/distractors?limit=${limit}`);
  if (!res.ok) {
    const err = await res.json();
    throw err;
  }
  const { distractors } = await res.json();
  return distractors;
}

async function startGame(userId = null) {
  const res = await fetch(`${APIURL}/api/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) {
    const err = await res.json();
    console.log("we faced an error in startGame");
    throw err;
  }
  const data = await res.json();  // { game_id }
  return data;
}

async function getUserGames(userId) {
  const res = await fetch(`${APIURL}/api/users/${userId}/games`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json();
    throw err;
  }
  const data = await res.json();  // { games: [...] }
  return data;
}

async function submitRound(gameId, { roundNumber, memeId, selectedCaptionId }) {
  const res = await fetch(`${APIURL}/api/games/${gameId}/rounds`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ roundNumber, memeId, selectedCaptionId }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw err;
  }
  const data = await res.json();  // { ended, points } or { ended, total_score, summary }
  return data;
}

async function getGameRounds(gameId) {
  const res = await fetch(`${APIURL}/api/games/${gameId}/rounds`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json();
    throw err;
  }
  const data = await res.json();  // { rounds: [...] }
  return data;
}

async function addMemeCaption(memeId, captionId, points) {
  const res = await fetch(`${APIURL}/api/meme-captions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ memeId, captionId, points }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw err;
  }
  const data = await res.json();  // { association_id }
  return data;
}

async function getAllMemes() {
  const res = await fetch(`${APIURL}/api/memes`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json();
    throw err;
  }
  const data = await res.json();
  return data;
}

export default {
  register,
  logIn,
  currentSession,
  logOut,
  healthCheck,
  fetchRandomMeme,
  fetchCorrectCaptions,
  fetchDistractors,
  startGame,
  getUserGames,
  submitRound,
  getGameRounds,
  addMemeCaption,
  getAllMemes
};
