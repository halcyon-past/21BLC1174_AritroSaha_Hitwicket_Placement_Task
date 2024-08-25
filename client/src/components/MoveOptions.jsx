import React from 'react';

function MoveOptions({ piece, onMove }) {
  const moves = {
    'P': ['L', 'R', 'F', 'B'],
    'H1': ['L', 'R', 'F', 'B'],
    'H2': ['FL', 'FR', 'BL', 'BR']
  };

  return (
    <div className="move-options">
      {moves[piece[0]].map((move) => (
        <button key={move} onClick={() => onMove(`${piece}:${move}`)}>
          {move}
        </button>
      ))}
    </div>
  );
}

export default MoveOptions;