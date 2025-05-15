// src/pages/GamePage.jsx
import React, { useEffect, useState } from 'react';
import API from '../API';
import MemeDisplay from './components/MemeDisplay';
import CaptionOptionList from './components/CaptionOptionList';
import ScoreBoard from './components/ScoreBoard';
import SummaryView from './components/SummaryView';
import { useAuth } from '../context/AuthContext';

export default function GamePage() {
  const { user } = useAuth();
  const [gameId, setGameId]           = useState(null);
  const [roundNumber, setRoundNumber] = useState(0);
  const [meme, setMeme]               = useState(null);
  const [options, setOptions]         = useState([]);
  const [score, setScore]             = useState(0);
  const [ended, setEnded]             = useState(false);
  const [summary, setSummary]         = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [usedMemes, setUsedMemes]     = useState([]);


  // 1) Start the game on mount
  useEffect(() => {
    (async () => {
      try {
        console.log("user", user);
        let game_id;
        if (user) {
          const result = await API.startGame(user.id);
          console.log("result", result);
          game_id = result.game_id;
        } else {
          const result = await API.startGame();
          console.log("result", result);
          game_id = result.game_id;
        }
        setGameId(game_id);
        setRoundNumber(1);
      } catch (err) {
        setError(err.error || 'Failed to start game');
      }
    })();
  }, []);


  // (async () => {
  //   console.log("Hello from inside the IIFE!");
  // })();

  // this format is equal to the code below
  // const x = async () => {
  //   console.log("Hello from inside the IIFE!");
  // }
  // x();
  
  // this is just a shorthand for the code above


  // 2) Load each round's data when gameId or roundNumber changes
  useEffect(() => {
    if (!gameId || ended || roundNumber === 0) return; // if gameID is null or ended is true, return and finish the function so the game doesn't continue
    setLoading(true); // set loading to true so the user knows the game is loading
    setError(null); // set error to null so the error message is not shown

    (async () => {
      try {
        // exclude memes already shown
        console.log("usedMemes", usedMemes);
        const m = await API.fetchRandomMeme(usedMemes);
        console.log("random meme", m);

        const correct    = await API.fetchCorrectCaptions(m.meme_id);
        console.log("correct", correct);
        const distractors = await API.fetchDistractors(m.meme_id);
        console.log("distractors", distractors);

        // merge & shuffle
        const opts = [
          ...correct.map(c => ({ ...c, correct: true })),
          ...distractors.map(d => ({ ...d, correct: false }))
        ].sort(() => Math.random() - 0.5);
        console.log("opts", opts);

        setMeme(m);
        setOptions(opts);
      } catch (err) {
        setError(err.error || 'Failed to load round');
      } finally {
        setLoading(false);
      }
    })();
  }, [roundNumber]);

  // 3) Handle user picking a caption
  const handlePick = async (caption) => {
    setLoading(true);
    setError(null);

    try {
      const result = await API.submitRound(gameId, {
        roundNumber,
        memeId: meme.meme_id,
        selectedCaptionId: caption.caption_id
      });
      console.log("result", result);
      setUsedMemes(usedMemes => [...usedMemes, meme.meme_id]);

      if (result.ended) {
        setScore(result.total_score);
        setSummary(result.summary);
        setEnded(true);
      } else {
        setScore(s => s + result.points);
        setRoundNumber(n => n + 1);
      }
    } catch (err) {
      setError(err.error || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = async () => {
    setEnded(false);
    setSummary(null);
    setScore(0);
    setRoundNumber(0);
    setMeme(null);
    setOptions([]);
    setLoading(true);
    setError(null);
    setUsedMemes([]);

    // Start a new game
    try {
      let game_id;
      if (user) {
        const result = await API.startGame(user.id);
        game_id = result.game_id;
        console.log("game_id", game_id);
      } else {
        const result = await API.startGame();
        game_id = result.game_id;
        console.log("game_id", game_id);
      }
      setGameId(game_id);
      setRoundNumber(1);
    } catch (err) {
      setError(err.error || 'Failed to start game');
    }
  };

  // 4) Render states
  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger">{error}</div>
    </div>
  );

  if (!gameId || loading || !meme) return (
    <div className="container mt-5">Loading...</div>
  );

  if (ended) return (
    <div>
      <SummaryView summary={summary} totalScore={score} />
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={handleRestart}>Restart the game</button>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <ScoreBoard roundNumber={roundNumber} score={score} />
      <MemeDisplay imageUrl={meme.image_url} title={meme.title} />
      <CaptionOptionList options={options} onSelect={handlePick} />
    </div>
  );
}
