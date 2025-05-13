// src/pages/components/MemeDisplay.jsx
import React from 'react';

export default function MemeDisplay({ imageUrl, title }) {
  return (
    <div className="text-center mb-4">
      <img
        src={`http://localhost:3001${imageUrl}`}
        alt={title}
        className="img-fluid rounded"
        style={{ maxHeight: '300px' }}
      />
      <p className="mt-2"><em>{title}</em></p>
    </div>
  );
}
