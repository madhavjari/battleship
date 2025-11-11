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
    this.shipCordinates(
      "carrier",
      carrier.length,
      this.cordinates[1],
      this.cordinates[0],
    );
    const battleShip = new Ship("battleship", 4);
    this.shipCordinates(
      "battleship",
      battleShip.length,
      this.cordinates[3],
      this.cordinates[2],
    );
    const destroyer = new Ship("destroyer", 3);
    this.shipCordinates(
      "destroyer",
      destroyer.length,
      this.cordinates[5],
      this.cordinates[4],
    );
    const submarine = new Ship("submarine", 2);
    this.shipCordinates(
      "submarine",
      submarine.length,
      this.cordinates[7],
      this.cordinates[6],
    );
    const patrolBoat = new Ship("patrolboat", 1);
    this.shipCordinates(
      "patrolboat",
      patrolBoat.length,
      this.cordinates[9],
      this.cordinates[8],
    );
    this.ship.push(carrier, battleShip, destroyer, submarine, patrolBoat);
  }

  shipCordinates(name, length, direction, [x, y]) {
    if (direction === "horizontal") {
      if (y + length > 10) throw new Error("cannot proceed furthur");
      else {
        for (let j = y; j < y + length; j++) {
          if (this.board[x][j] !== "not occupied")
            throw new Error("already occupied");
        }
      }
    } else if (direction === "vertical") {
      if (x + length > 10) throw new Error("cannot proceed furthur");
      else {
        for (let i = x; i < x + length; i++) {
          if (this.board[i][y] !== "not occupied")
            throw new Error("already occupied");
        }
      }
    }

    if (direction === "horizontal") {
      for (let j = y; j < y + length; j++) {
        this.board[x][j] = name;
      }
    } else if (direction === "vertical") {
      for (let i = x; i < x + length; i++) {
        this.board[i][y] = name;
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
      return "missed";
    }
  }
}
