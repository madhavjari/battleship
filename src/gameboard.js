import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.board = [];
    this.ship = [];
    this.sunkCount;
  }
  createBoard() {
    for (let i = 0; i < 10; i++) {
      this.board[i] = [];
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = "not occupied";
      }
    }
  }

  getBoard = () => {
    return this.board;
  };

  createShips() {
    this.createBoard();
    this.ship[0] = new Ship("carrier", 5);
    this.ship[0]["cordinates"] = this.makeCordinates(
      this.ship[0].length,
      this.ship[0].name,
    );
    this.ship[1] = new Ship("battleship", 4);
    this.ship[1]["cordinates"] = this.makeCordinates(
      this.ship[1].length,
      this.ship[1].name,
    );
    this.ship[2] = new Ship("destroyer", 3);
    this.ship[2]["cordinates"] = this.makeCordinates(
      this.ship[2].length,
      this.ship[2].name,
    );
    this.ship[3] = new Ship("submarine", 2);
    this.ship[3]["cordinates"] = this.makeCordinates(
      this.ship[3].length,
      this.ship[3].name,
    );
    this.ship[4] = new Ship("patrolboat", 1);
    this.ship[4]["cordinates"] = this.makeCordinates(
      this.ship[4].length,
      this.ship[4].name,
    );
  }

  makeCordinates(shipLength, shipName) {
    let x;
    let y;
    let direction;
    let madeCord = false;
    let cordinate = [];
    let cordCheck = true;
    while (!madeCord) {
      cordCheck = true;
      x = parseInt(Math.random() * 9);
      y = parseInt(Math.random() * 9);
      direction = Math.random() < 0.5 ? "h" : "v";
      if (direction === "h") {
        if (y + shipLength > 10) {
          continue;
        } else {
          for (let j = y; j < y + shipLength; j++) {
            if (this.board[x][j] !== "not occupied") cordCheck = false;
          }
        }
      } else if (direction === "v") {
        if (x + shipLength > 10) {
          continue;
        } else {
          for (let i = x; i < x + shipLength; i++) {
            if (this.board[i][y] !== "not occupied") cordCheck = false;
          }
        }
      }
      if (!cordCheck) continue;
      if (direction === "h") {
        for (let j = y; j < y + shipLength; j++) {
          this.board[x][j] = shipName;
          cordinate.push([x, j]);
        }
      } else if (direction === "v") {
        for (let i = x; i < x + shipLength; i++) {
          this.board[i][y] = shipName;
          cordinate.push([i, y]);
        }
      }
      madeCord = true;
    }
    return cordinate;
  }

  receiveAttack(x, y) {
    this.sunkCount = 0;
    if (this.board[x][y] !== "not occupied") {
      const hitShip = this.board[x][y];
      for (let i = 0; i < this.ship.length; i++) {
        if (this.ship[i].name === hitShip) {
          this.board[x][y] = "hit";
          this.ship[i].hit();
          break;
        }
      }
      for (let i = 0; i < this.ship.length; i++) {
        if (this.ship[i].sunk === true) {
          this.sunkCount++;
        }
      }
    } else {
      this.board[x][y] = "missed";
    }
  }
}
