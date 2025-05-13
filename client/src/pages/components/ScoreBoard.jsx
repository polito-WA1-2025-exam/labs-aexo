// src/pages/components/ScoreBoard.jsx
import React from 'react';

export default function ScoreBoard({ roundNumber, score }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4 className="m-0">Round {roundNumber}</h4>
      <span className="badge bg-primary fs-6">Score: {score}</span>
    </div>
  );
}
