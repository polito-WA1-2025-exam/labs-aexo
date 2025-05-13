// src/pages/components/CaptionOptionList.jsx
import React from 'react';

export default function CaptionOptionList({ options, onSelect }) {
  return (
    <div className="list-group">
      {options.map(opt => (
        <button
          key={opt.caption_id}
          className="list-group-item list-group-item-action"
          onClick={() => onSelect(opt)}
        >
          {opt.text}
        </button>
      ))}
    </div>
  );
}

