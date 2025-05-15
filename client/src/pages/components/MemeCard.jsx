import React from 'react';
import { Link } from 'react-router-dom';

function MemeCard({ meme }) {
  // Get ID from different possible property names
  const memeId = meme.meme_id;
  
  // Get URL from different possible property names
  const imageUrl = meme.image_url || '';
  
  // Get name from different possible property names
  const memeName =  meme.title || 'Unnamed Meme';

  // Debug log to see meme object structure
  console.log('Meme object in card:', meme);

  return (
    <div className="card mb-3">
      {imageUrl && (
        <img 
          className="card-img-top"
          src={`http://localhost:3001${imageUrl}`}
          alt={memeName}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}

      <div className="card-body">
        <h5 className="card-title">{memeName}</h5>
        {memeId ? (
          <Link to={`/memes/${memeId}`} className="btn btn-primary">
            View Details
          </Link>
        ) : (
          <button className="btn btn-primary" disabled>
            View Details
          </button>
        )}
      </div>
    </div>
  );
}

export default MemeCard; 