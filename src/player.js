import Gameboard from "./gameboard";

export default class Player {
  constructor(name) {
    this.name = name;
    this.player = new Gameboard();
    this.board = this.player.createBoard();
    this.ships = this.player.createShips();
  }
}
