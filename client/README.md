# Chess-like Game Frontend Documentation

- Created by Aritro Saha (21BLC1174)
- Created as a part of placement task in Hitwicket

## Overview

This frontend implements a web-based interface for a turn-based chess-like game using React. It manages game creation, joining, team setup, and gameplay through a WebSocket connection to the backend.

## Main Application (App.jsx)

The `App` component is the main container for the game interface.

### State Management

- `gameId`: Stores the current game ID
- `gameState`: Holds the current state of the game
- `selectedPiece`: Tracks the currently selected piece for move input
- `status`: Displays game status messages

### WebSocket Connection

Uses a custom `useSocket` hook to establish and manage the WebSocket connection.

### Key Components

1. `Controls`: Handles game creation, joining, and team setup
2. `Board`: Displays the game board
3. `MoveOptions`: Shows available moves for a selected piece

### WebSocket Event Handlers

- `gameCreated`: Sets the game ID when a new game is created
- `gameStart`: Initializes the game state when the game starts
- `gameUpdate`: Updates the game state after each move
- `waitingForPlayers`: Updates status when waiting for players
- `joinError`: Handles errors when joining a game
- `setupError`: Handles errors during team setup
- `invalidMove`: Notifies the player of an invalid move

### Key Methods

- `handleCreateGame()`: Emits a 'createGame' event to the server
- `handleJoinGame(id)`: Emits a 'joinGame' event to the server
- `handleSetupTeam(team)`: Emits a 'setupTeam' event to the server
- `handleSelectPiece(piece)`: Updates the selected piece
- `handleMove(move)`: Emits a 'move' event to the server

## Components

### Board (Board.jsx)

Renders the 5x5 game board.

#### Props
- `board`: 2D array representing the game board
- `onSelectPiece`: Callback function for piece selection
- `currentTurn`: Indicates the current player's turn

#### Rendering
Iterates over the `board` array to render `Cell` components.

### Cell (Cell.jsx)

Represents a single cell on the game board.

#### Props
- `piece`: The piece occupying the cell (if any)
- `onClick`: Callback function for cell click
- `isSelectable`: Boolean indicating if the piece can be selected

#### Styling
Uses CSS classes to style the cell based on occupation and selectability.

### Controls (Controls.jsx)

Provides UI for game creation, joining, and team setup.

#### State
- `joinId`: Stores the game ID for joining
- `team`: Stores the team composition for setup

#### Key Methods
- `handleJoin()`: Triggers the join game action
- `handleSetupTeam()`: Validates and triggers the team setup action

### MoveOptions (MoveOptions.jsx)

Displays available moves for a selected piece.

#### Props
- `piece`: The selected piece
- `onMove`: Callback function for move selection

#### Rendering
Renders buttons for each valid move based on the piece type.

## Custom Hooks

### useSocket (useSocket.js)

A custom hook for managing WebSocket connections.

#### Usage
```javascript
const socket = useSocket('http://localhost:3000');
```

### Functionality
- Establishes a WebSocket connection to the specified URL
- Manages connection lifecycle (connect, disconnect)
- Returns the socket instance for use in components

### Styling

The application uses CSS for styling. Key classes include:

- ```.App```: Main container styles
- ```.board```: Styles for the game board
- ```.cell```: Styles for individual board cells
- ```.controls```: Styles for the control panel
- ```.move-options```: Styles for the move option buttons

### State Flow

1. User creates or joins a game through the ```Controls``` component
2. Once two players join, team setup is initiated
3. After both teams are set up, the game starts and the ```Board``` is rendered
4. Players take turns selecting pieces and making moves
5. The game state updates after each move, re-rendering the board
6. The game continues until a win condition is met

### Error Handling
Errors from the server (e.g., invalid moves, setup errors) are displayed in the status area of the App component.

### Future Improvements

- Add animations for piece movements
- Implement a chat feature for players
- Add a game history or replay feature
- Improve UI/UX with more interactive elements
- Implement responsive design for mobile play