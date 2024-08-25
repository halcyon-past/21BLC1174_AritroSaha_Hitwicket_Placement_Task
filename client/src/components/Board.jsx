import React from 'react';
import Cell from './Cell';

function Board({ board, onSelectPiece, currentTurn }) {
    console.log('Board render', board, currentTurn);
    return (
        <div className="board">
        {board.map((row, y) => (
            <div key={y} className="row">
            {row.map((cell, x) => (
                <Cell
                key={`${x}-${y}`}
                piece={cell}
                onClick={() => cell && onSelectPiece(cell)}
                isSelectable={cell && cell[0] === currentTurn[0]}
                />
            ))}
            </div>
        ))}
        </div>
    );
}

export default Board;