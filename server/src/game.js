const Pawn = require('./characters/Pawn');
const Hero1 = require('./characters/Hero1');
const Hero2 = require('./characters/Hero2');

class Game {
  constructor() {
    this.players = [];
    this.board = this.initializeBoard();
    this.currentTurn = 0;
    this.teams = {};
  }

  initializeBoard() {
    return Array(5).fill(null).map(() => Array(5).fill(null));
  }

  canJoin() {
    return this.players.length < 2;
  }

  addPlayer(playerId) {
    if (this.players.length < 2) {
      this.players.push(playerId);
      return true;
    }
    return false;
  }

  removePlayer(playerId) {
    this.players = this.players.filter(id => id !== playerId);
  }

  hasPlayer(playerId) {
    return this.players.includes(playerId);
  }

  isReady() {
    return this.players.length === 2;
  }

  setupTeam(playerId, team) {
    console.log('Setting up team for player:', playerId);
    console.log('Team composition:', team);
    if (team.length !== 5) {
      console.log('Invalid team length');
      return false;
    }
    const validCharacters = ['P', 'H1', 'H2'];
    if (!team.every(char => validCharacters.includes(char.slice(0, 2)))) {
      console.log('Invalid character in team');
      return false;
    }
    
    const row = this.players.indexOf(playerId) === 0 ? 0 : 4;
    console.log('Player row:', row);
    this.teams[playerId] = team.map((char, index) => {
      const piece = `${playerId.slice(0, 1)}-${char}`;
      this.board[row][index] = piece;
      return piece;
    });
  
    console.log('Team setup complete. Current board state:', this.board);
    return true;
  }

  areTeamsReady() {
    return this.players.every(playerId => this.teams[playerId]);
  }

  isValidMove(playerId, move) {
    if (this.players[this.currentTurn] !== playerId) return false;
    const [charName, direction] = move.split(':');
    const character = this.teams[playerId].find(char => char.name === charName);
    if (!character) return false;
    return character.isValidMove(direction, this.board);
  }

  makeMove(move) {
    const [charName, direction] = move.split(':');
    const playerId = this.players[this.currentTurn];
    const character = this.teams[playerId].find(char => char.name === charName);
    const [newX, newY] = character.getNewPosition(direction);
    
    // Remove any opponent's character at the new position
    const opponentId = this.players[(this.currentTurn + 1) % 2];
    this.teams[opponentId] = this.teams[opponentId].filter(char => char.x !== newX || char.y !== newY);
    
    // Update character position
    character.move(newX, newY);
    
    // Update board
    this.updateBoard();
    
    // Switch turn
    this.currentTurn = (this.currentTurn + 1) % 2;
  }

  updateBoard() {
    this.board = this.initializeBoard();
    for (const playerId of this.players) {
      for (const character of this.teams[playerId]) {
        this.board[character.y][character.x] = character.name;
      }
    }
  }

  getState() {
    return {
      board: this.board,
      currentTurn: this.currentTurn,
      teams: this.teams
    };
  }

  isGameOver() {
    return this.players.some(playerId => this.teams[playerId].length === 0);
  }

  getWinner() {
    return this.players.find(playerId => this.teams[playerId].length > 0);
  }
}

module.exports = Game;