# Chess-like Game Backend Documentation

- Created by Aritro Saha (21BLC1174)
- Created as a part of placement task in Hitwicket

## Overview

This backend implements a server for a turn-based chess-like game using Node.js, Express, and Socket.IO. It manages game creation, player connections, team setup, and move validation.

## Server Setup (server.js)

The server is set up using Express and Socket.IO for real-time communication.

### Dependencies

- Express
- http
- Socket.IO
- Game (custom game logic)

### Server Initialization

```javascript
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;
```

### Game Management
Games are stored in a Map object:

```javascript
const games = new Map();
```

### Socket.IO Event Handlers
#### Connection

```javascript
io.on('connection', (socket) => {
  // Event handlers are defined here
});
```

#### Create game

```javascript
socket.on('createGame', () => {
  const gameId = Math.random().toString(36).substring(7);
  games.set(gameId, new Game());
  socket.join(gameId);
  socket.emit('gameCreated', gameId);
});
```

#### Join Game

```javascript
socket.on('joinGame', (gameId) => {
  const game = games.get(gameId);
  if (game && game.addPlayer(socket.id)) {
    socket.join(gameId);
    if (game.players.length === 2) {
      io.to(gameId).emit('readyForSetup');
    }
  } else {
    socket.emit('joinError', 'Game not found or full');
  }
});
```
#### Setup Team

```javascript
socket.on('setupTeam', ({ gameId, team }) => {
  const game = games.get(gameId);
  if (game && game.setupTeam(socket.id, team)) {
    if (game.areTeamsReady()) {
      io.to(gameId).emit('gameStart', game.getState());
    } else {
      socket.emit('waitingForOpponent');
    }
  } else {
    socket.emit('setupError', 'Invalid team setup');
  }
});
```

#### Make Move

```javascript
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
```

#### Disconnect

```javascript
socket.on('disconnect', () => {
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
```

### Game Logic (game.js)
The Game class manages the state and rules of each game instance.

### Properties

- ```players```: Array of player IDs
- ```board```: 5x5 game board
- ```currentTurn```: Current player's turn
- ```teams```: Object storing each player's team

### Methods
- ```initializeBoard()```
Initializes an empty 5x5 game board.
- ```addPlayer(playerId)```
Adds a player to the game if there's room.
- ```removePlayer(playerId)```
Removes a player from the game.
- ```setupTeam(playerId, team)```
Sets up a player's team on the board.
- ```isValidMove(playerId, move)```
Checks if a move is valid for the current player and game state.
- ```makeMove(move)```
Executes a move on the board and updates the game state.
- ```getState()```
Returns the current game state (board, current turn, teams).
- ```isGameOver()```
Checks if the game is over.
- ```getWinner()```
Returns the winning player if the game is over.

### Character Classes (Pawn.js, Hero1.js, Hero2.js)
Each character type (Pawn, Hero1, Hero2) is implemented as a separate class with methods for move validation and execution.

### Common Methods

- ```isValidMove(direction, board)```
- ```getDirectionOffset(direction)```
- ```isWithinBounds(x, y)```
- ```isFriendlyOccupied(x, y, board)```
- ```getNewPosition(direction)```
- ```move(newX, newY)```

### API Endpoints
- The server primarily uses Socket.IO for real-time communication. There are no traditional REST API endpoints.

### Error Handling

Errors are communicated to the client via Socket.IO events:

- ```joinError```: Emitted when a player fails to join a game
- ```setupError```: Emitted when team setup fails
- ```invalidMove```: Emitted when a player attempts an invalid move

### Security Considerations

- The server uses CORS to restrict origins
- Player actions are validated server-side to prevent cheating
- Game IDs are randomly generated to prevent guessing

### Future Improvements

- Implement user authentication
- Add persistent storage for game states
- Implement spectator mode
- Add more character types and game modes