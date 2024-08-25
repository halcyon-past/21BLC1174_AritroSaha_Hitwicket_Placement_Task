class Hero2 {
    constructor(playerId, name, x, y) {
      this.playerId = playerId;
      this.name = name;
      this.x = x;
      this.y = y;
    }
  
    isValidMove(direction, board) {
      const [dx, dy] = this.getDirectionOffset(direction);
      const newX = this.x + dx;
      const newY = this.y + dy;
      return this.isWithinBounds(newX, newY) && !this.isFriendlyOccupied(newX, newY, board);
    }
  
    getDirectionOffset(direction) {
      const offsets = {
        'FL': [1, this.playerId === 0 ? 1 : -1],
        'FR': [1, this.playerId === 0 ? 1 : -1],
        'BL': [-1, this.playerId === 0 ? -1 : 1],
        'BR': [1, this.playerId === 0 ? -1 : 1]
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
      return [this.x + dx, this.y + dy];
    }
  
    move(newX, newY) {
      this.x = newX;
      this.y = newY;
    }
  }
  
  module.exports = Hero2;