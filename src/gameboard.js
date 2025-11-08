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
    const carrier = new Ship(5);
    this.shipCordinates("carrier", carrier.length, "horizontal", [2, 3]);
    const battleShip = new Ship(4);
    this.shipCordinates("battleship", battleShip.length, "vertical", [3, 3]);
    const destroyer = new Ship(3);
    this.shipCordinates("destroyer", destroyer.length, "vertical", [7, 6]);
    const submarine = new Ship(2);
    this.shipCordinates("submarine", submarine.length, "horizontal", [9, 1]);
    const patrolBoat = new Ship(1);
    this.shipCordinates("patrolboat", patrolBoat.length, "vertical", [0, 0]);
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

  receiveAttack([x, y]) {
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
