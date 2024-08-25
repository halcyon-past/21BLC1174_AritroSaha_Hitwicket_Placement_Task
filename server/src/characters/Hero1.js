class Hero1 {
    constructor(playerId, name, x, y) {
      this.playerId = playerId;
      this.name = name;
      this.x = x;
      this.y = y;
    }
  
    isValidMove(direction, board) {
      const [dx, dy] = this.getDirectionOffset(direction);
      const newX = this.x + dx * 2;
      const newY = this.y + dy * 2;
      return this.isWithinBounds(newX, newY) && !this.isFriendlyOccupied(newX, newY, board);
    }
  
    getDirectionOffset(direction) {
      const offsets = {
        'L': [-1, 0],
        'R': [1, 0],
        'F': [0, this.playerId === 0 ? 1 : -1],
        'B': [0, this.playerId === 0 ? -1 : 1]
      };
      return offsets[direction] || [0, 0];
    }
  
    isWithinBounds(x, y) {
      return x >= 0 && x < 5 && y >= 0 && y < 5;
    }
  
    isFriendlyOccupied(x, y, board) {
      return board[y][x] && board[y][x][0] === this.name[0];
    }
  
    getNewPosition(direction) {
      const [dx, dy] = this.getDirectionOffset(direction);
      return [this.x + dx * 2, this.y + dy * 2];
    }
  
    move(newX, newY) {
      this.x = newX;
      this.y = newY;
    }
  }
  
  module.exports = Hero1;