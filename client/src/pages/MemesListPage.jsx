import React, { useState, useEffect } from 'react';
import MemeCard from './components/MemeCard';
import API from '../API';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function MemesListPage() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setLoading(true);
        const data = await API.getAllMemes();
        console.log('Meme data received:', data); // Debug log
        setMemes(data.memes || data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch memes:', err);
        setError('Failed to load memes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }


  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger">{error}</div>
    </div>
  );

  if (loading) return (
    <div className="container mt-5">
      <div className="alert alert-info">Loading memes...</div>
    </div>
  );

  return (
    <div className="container">
      <h1 className="mb-4">All Memes</h1>      
      <div className="row">
        {memes.length > 0 ? (
          memes.map((meme) => (
            <div key={meme.meme_id} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <MemeCard meme={meme} />
            </div>
          ))
        ) : (
          <div className="col">
            <p>No memes available.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemesListPage; 