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
  createShips() {
    const carrier = new Ship("carrier", 5, "horizontal", [2, 3]);
    carrier.shipCordinates(this.board);
    const battleShip = new Ship("battleship", 4, "vertical", [3, 3]);
    battleShip.shipCordinates(this.board);
    const destroyer = new Ship("destroyer", 3, "vertical", [7, 6]);
    destroyer.shipCordinates(this.board);
    const submarine = new Ship("submarine", 2, "horizontal", [9, 1]);
    submarine.shipCordinates(this.board);
    const patrolBoat = new Ship("patrolboat", 1, "vertical", [0, 0]);
    patrolBoat.shipCordinates(this.board);
    this.ship.push(carrier, battleShip, destroyer, submarine, patrolBoat);
    //return this.board;
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
