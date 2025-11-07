export class Ship {
  constructor(name, length, direction, firstCord, hitCount = 0, sunk = false) {
    this.name = name;
    this.length = length;
    this.direction = direction;
    this.firstCord = firstCord;
    this.hitCount = hitCount;
    this.sunk = sunk;
  }

  shipCordinates(board) {
    if (this.direction === "horizontal") {
      if (this.firstCord[1] + this.length > 10) throw "cannot proceed furthur";
      else {
        for (
          let j = this.firstCord[1];
          j < this.firstCord[1] + this.length;
          j++
        ) {
          if (board[this.firstCord[0]][j] === "not occupied") {
            board[this.firstCord[0]][j] = this.name;
          } else throw "already occupied";
        }
      }
    } else if (this.direction === "vertical") {
      if (this.firstCord[0] + this.length > 10) throw "cannot proceed furthur";
      else {
        for (
          let i = this.firstCord[0];
          i < this.firstCord[1] + this.length;
          i++
        ) {
          if (board[i][this.firstCord[1]] === "not occupied") {
            board[i][this.firstCord[1]] = this.name;
          } else throw "already occupied";
        }
      }
    }
  }

  hit() {
    this.hitCount++;
    this.isSunk();
    return this.hitCount;
  }

  isSunk() {
    if (this.hitCount === this.length) this.sunk = true;
  }
}
