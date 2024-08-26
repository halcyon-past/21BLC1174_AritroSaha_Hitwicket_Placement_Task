const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Game = require('./game');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

const games = new Map();

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('createGame', () => {
    const gameId = Math.random().toString(36).substring(7);
    games.set(gameId, new Game());
    socket.join(gameId);
    socket.emit('gameCreated', gameId);
  });

  socket.on('setupTeam', ({ gameId, team }) => {
    console.log('Setup team attempt', gameId, team);
    console.log('Player ID:', socket.id);
    const game = games.get(gameId);
    if (game) {
      console.log('Game found');
      const setupResult = game.setupTeam(socket.id, team);
      console.log('Setup result:', setupResult);
    }
    if (game && game.setupTeam(socket.id, team)) {
      console.log('Team setup successful');
      if (game.areTeamsReady()) {
        console.log('All teams ready, emitting gameStart');
        const gameState = game.getState();
        console.log('Game state after setup:', gameState);
        io.to(gameId).emit('gameStart', gameState);
      } else {
        console.log('Waiting for other player to set up team');
        socket.emit('waitingForOpponent');
      }
    } else {
      console.log('Team setup failed');
      socket.emit('setupError', 'Invalid team setup');
    }
  });
  
  socket.on('joinGame', (gameId) => {
    console.log('Join game attempt', gameId);
    const game = games.get(gameId);
    if (game) {
      socket.join(gameId);
      console.log('Player joined game', gameId);
      if (game.players.length === 2) {
        console.log('Game is ready for team setup');
        io.to(gameId).emit('readyForSetup');
      }
    } else {
      console.log('Join game failed');
      socket.emit('joinError', 'Game not found or full');
    }
  });

  socket.on('move', ({ gameId, move }) => {
    const game = games.get(gameId);
    if (game && game.isValidMove(socket.id, move)) {
      game.makeMove(move);
      io.to(gameId).emit('gameUpdate', game.getState());
      if (game.isGameOver()) {
        io.to(gameId).emit('gameOver', game.getWinner());
      }
    } else {
      socket.emit('invalidMove');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // Handle player disconnection
    for (const [gameId, game] of games.entries()) {
      if (game.hasPlayer(socket.id)) {
        game.removePlayer(socket.id);
        io.to(gameId).emit('playerDisconnected');
        if (game.players.length === 0) {
          games.delete(gameId);
        }
      }
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));