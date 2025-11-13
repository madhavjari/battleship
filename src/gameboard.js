import Ship from "./ship";

export default class Gameboard {
  constructor(cordinates) {
    this.board = [];
    this.ship = [];
    this.sunkCount;
    this.cordinates = cordinates;
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
    const carrier = new Ship("carrier", 5);
    this.shipCordinates(carrier, this.cordinates[1], this.cordinates[0]);
    const battleShip = new Ship("battleship", 4);
    this.shipCordinates(battleShip, this.cordinates[3], this.cordinates[2]);
    const destroyer = new Ship("destroyer", 3);
    this.shipCordinates(destroyer, this.cordinates[5], this.cordinates[4]);
    const submarine = new Ship("submarine", 2);
    this.shipCordinates(submarine, this.cordinates[7], this.cordinates[6]);
    const patrolBoat = new Ship("patrolboat", 1);
    this.shipCordinates(patrolBoat, this.cordinates[9], this.cordinates[8]);
    this.ship.push(carrier, battleShip, destroyer, submarine, patrolBoat);
  }

  shipCordinates(ship, direction, [x, y]) {
    if (direction === "horizontal") {
      if (y + ship.length > 10) throw new Error("cannot proceed furthur");
      else {
        for (let j = y; j < y + ship.length; j++) {
          if (this.board[x][j] !== "not occupied")
            throw new Error("already occupied");
        }
      }
    } else if (direction === "vertical") {
      if (x + ship.length > 10) throw new Error("cannot proceed furthur");
      else {
        for (let i = x; i < x + ship.length; i++) {
          if (this.board[i][y] !== "not occupied")
            throw new Error("already occupied");
        }
      }
    }

    if (direction === "horizontal") {
      for (let j = y; j < y + ship.length; j++) {
        this.board[x][j] = ship.name;
        ship.allCordinates.push([x, j]);
      }
    } else if (direction === "vertical") {
      for (let i = x; i < x + ship.length; i++) {
        this.board[i][y] = ship.name;
        ship.allCordinates.push([i, y]);
      }
    }
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
