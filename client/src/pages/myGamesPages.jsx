import React, { useEffect, useState } from 'react';
import API from '../API';
import Date from 'date.js';
export default function UserGamesPage({ user }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
  
    const loadGames = async () => {
      try {
        setLoading(true);
        const data = await API.getUserGames(user.id);
        console.log("data", data);
        setGames(data.games);
      } catch (err) {
        setError(err.error || 'Could not load games');
      } finally {
        setLoading(false);
      }
    };
  
    loadGames();
  }, [user]);

  if (!user) {
    return <div className="container mt-5">Please log in to view your games.</div>;
  }

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>My Games</h2>
      <table className="table mt-3">
        <thead>
          <tr>
            <th> Start Date</th>
            <th> End Date</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => (
            <tr key={game.game_id}>
              <td>{new Date(game.start_time).toLocaleString(["it-IT"], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
              <td>{new Date(game.end_time).toLocaleString(["it-IT"], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
              <td>{game.total_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
