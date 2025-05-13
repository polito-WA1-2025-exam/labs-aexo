// src/pages/components/SummaryView.jsx
import React from 'react';

function SummaryView({ summary, totalScore }) {
  return (
    <div className="container mt-5">
      <h2 className="mb-3">Game Over</h2>
      <h4 className="mb-4">Final Score: <span className="text-primary">{totalScore}</span></h4>
      <ul className="list-group">
        {summary.map(r => (
          <li key={r.round_number} className="list-group-item">
            <strong>Round {r.round_number}:</strong> {r.title} → <em>{r.selected_text}</em> (<strong>{r.points_awarded} pts</strong>)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SummaryView;
