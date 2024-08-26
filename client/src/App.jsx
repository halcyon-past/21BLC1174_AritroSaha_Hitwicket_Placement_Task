import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import MoveOptions from './components/MoveOptions';
import useSocket from './hooks/useSocket';

function App() {
  const [gameId, setGameId] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [status, setStatus] = useState('');
  
  const socket = useSocket('http://localhost:3000');

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to server');
      setStatus('Connected to server');
    });

    socket.on('gameCreated', (id) => {
      console.log('Game created with ID:', id);
      setGameId(id);
      setStatus(`Game created. ID: ${id}`);
    });

    socket.on('gameStart', (state) => {
      console.log('Game started, received state:', state);
      setGameState(state);
      setStatus('Game started');
    });

    socket.on('gameUpdate', (state) => {
      console.log('Game updated, received state:', state);
      setGameState(state);
    });

    socket.on('waitingForPlayers', () => {
      console.log('Waiting for more players');
      setStatus('Waiting for more players to join...');
    });

    socket.on('joinError', (error) => {
      console.log('Join error:', error);
      setStatus(`Error joining game: ${error}`);
    });

    socket.on('setupError', (error) => {
      console.log('Setup error:', error);
      setStatus(`Error setting up team: ${error}`);
    });

    socket.on('invalidMove', () => {
      console.log('Invalid move');
      setStatus('Invalid move. Try again.');
    });

    return () => {
      socket.off('connect');
      socket.off('gameCreated');
      socket.off('gameStart');
      socket.off('gameUpdate');
      socket.off('waitingForPlayers');
      socket.off('joinError');
      socket.off('setupError');
      socket.off('invalidMove');
    };
  }, [socket]);

  useEffect(() => {
    console.log('Current game state:', gameState);
  }, [gameState]);

  const handleCreateGame = useCallback(() => {
    if (socket) {
      console.log('Emitting createGame event');
      socket.emit('createGame');
    } else {
      setStatus('Socket not connected. Please try again.');
    }
  }, [socket]);

  const handleJoinGame = useCallback((id) => {
    if (socket) {
      console.log('Emitting joinGame event', id);
      socket.emit('joinGame', id);
    } else {
      setStatus('Socket not connected. Please try again.');
    }
  }, [socket]);

  const handleSetupTeam = useCallback((team) => {
    if (socket && gameId) {
      console.log('Emitting setupTeam event', { gameId, team });
      socket.emit('setupTeam', { gameId, team });
    } else {
      setStatus('Game not ready or socket not connected. Please try again.');
    }
  }, [socket, gameId]);

  const handleSelectPiece = (piece) => {
    console.log('Piece selected:', piece);
    setSelectedPiece(piece);
  };

  const handleMove = useCallback((move) => {
    if (socket) {
      console.log('Emitting move event', { gameId, move });
      socket.emit('move', { gameId, move });
    } else {
      setStatus('Socket not connected. Please try again.');
    }
  }, [socket, gameId]);

  return (
    <div className="App">
      <h1>Chess-like Game</h1>
      <Controls
        onCreateGame={handleCreateGame}
        onJoinGame={handleJoinGame}
        onSetupTeam={handleSetupTeam}
        gameId={gameId}
      />
      {gameState && gameState.board ? (
        <>
          <Board
            board={gameState.board}
            onSelectPiece={handleSelectPiece}
            currentTurn={gameState.currentTurn}
          />
          {selectedPiece && (
            <MoveOptions
              piece={selectedPiece}
              onMove={handleMove}
            />
          )}
        </>
      ) : (
        <div>Waiting for game to start...</div>
      )}
      <div className="status">{status}</div>
    </div>
  );
}

export default App;