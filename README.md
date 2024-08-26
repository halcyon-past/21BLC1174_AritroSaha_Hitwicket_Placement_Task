# Chess-like Game Documentation

- Created by Aritro Saha (21BLC1174)
- Created as a part of placement task in Hitwicket

## Overview

This project implements a turn-based, chess-like game with a server-client architecture. It features real-time gameplay using WebSocket communication and a web-based user interface.

## Technologies Used

### Backend
- Node.js
- Express.js
- Socket.IO

### Frontend
- React
- Vite (for build and development)
- Socket.IO Client

## Setup and Installation

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- Docker (optional, for containerized setup)

### Backend Setup
1. Navigate to the server directory:
```
cd server
```
2. Install dependencies:
```
npm install
```
3. Start the server:
```
npm run dev
```
The server will start running on `http://localhost:3000`.

### Frontend Setup
1. Navigate to the client directory:
```
cd client
```
2. Install dependencies:
```
npm install
```
3. Start the development server:
```
npm run dev
```
The frontend will be accessible at `http://localhost:5173`.

### Docker Setup
If you prefer to run the project using Docker, follow these steps:

#### Prerequisites
- Docker
- Docker Compose

#### Running the Project with Docker Compose

1. Ensure Docker is installed and running on your machine.

2. Navigate to the root directory of your project where the docker-compose.yml file is located.

3. Build and start the services:

```
docker-compose up --build
```
This will start both the backend and frontend services in development mode.

4. Access the frontend at ```http://localhost:5173``` and the backend at ```http://localhost:3000```.

#### Stopping the Containers
To stop the running containers, use:

```
docker-compose down
```

## Running the Game

1. Open two browser windows and navigate to `http://localhost:5173` in each.
2. In one window, click "Create Game" to start a new game.
3. Copy the generated Game ID.
4. In the second window, paste the Game ID and click "Join Game".
5. Once both players have joined, set up your teams.
6. The game will start once both teams are set up.

## Game Features

### Game Setup
- 5x5 grid board
- Two players
- Each player controls a team of 5 characters

### Character Types
1. Pawn (P):
- Moves one block in any direction (Left, Right, Forward, or Backward)
2. Hero1 (H1):
- Moves two blocks straight in any direction
- Eliminates any opponent's character in its path
3. Hero2 (H2):
- Moves two blocks diagonally in any direction
- Eliminates any opponent's character in its path

### Gameplay
- Turn-based moves
- Players can select their character and choose from available moves
- Characters can eliminate opponent's pieces by moving to their position
- The game ends when all of one player's characters are eliminated

### User Interface
- Interactive game board
- Team setup interface
- Move selection for characters
- Real-time game state updates

## Project Structure

```
main-directory/
├── server/
│   ├── src/
│   │   ├── server.js
│   │   ├── game.js
│   │   └── characters/
│   │       ├── Pawn.js
│   │       ├── Hero1.js
│   │       └── Hero2.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Board.jsx
│   │   │   ├── Cell.jsx
│   │   │   ├── Controls.jsx
│   │   │   └── MoveOptions.jsx
│   │   ├── hooks/
│   │   │   └── useSocket.js
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Key Components

### Backend
- `server.js`: Main server file, handles WebSocket connections and game events
- `game.js`: Implements game logic and state management
- Character classes: Define movement and attack patterns for each character type

### Frontend
- `App.jsx`: Main React component, manages game state and UI
- `Board.jsx`: Renders the game board
- `Controls.jsx`: Provides game control interface (create, join, setup)
- `MoveOptions.jsx`: Displays available moves for selected characters

## WebSocket Events

- `createGame`: Create a new game
- `joinGame`: Join an existing game
- `setupTeam`: Set up a player's team
- `move`: Make a move in the game
- `gameUpdate`: Update game state (sent from server to clients)
- `gameOver`: Notify game end and winner

## Future Enhancements

- Add more character types with unique abilities
- Implement a spectator mode
- Add a chat feature for players
- Create an AI opponent for single-player mode
- Implement a ranking system for competitive play

## Troubleshooting

- Ensure both the backend and frontend servers are running
- Check console logs for any error messages
- Verify that the WebSocket connection is established successfully

For more detailed information, refer to the backend and frontend documentation sections.