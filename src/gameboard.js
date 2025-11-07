import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.board = [];
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
    const carrier = new Ship(5, "horizontal", [2, 3]);
    const battleShip = new Ship(4, "vertical", [3, 3]);
    const destroyer = new Ship(3, "vertical", [7, 6]);
    const submarine = new Ship(2, "horizontal", [9, 1]);
    const patrolBoat = new Ship(1, "vertical", [0, 0]);
  }
}
