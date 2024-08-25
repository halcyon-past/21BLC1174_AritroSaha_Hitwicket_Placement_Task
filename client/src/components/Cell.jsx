import React from 'react';

function Cell({ piece, onClick, isSelectable }) {
  return (
    <div 
      className={`cell ${piece ? 'occupied' : ''} ${isSelectable ? 'selectable' : ''}`} 
      onClick={onClick}
    >
      {piece}
    </div>
  );
}

export default Cell;