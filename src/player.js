import Gameboard from "./gameboard";

export default class Player {
  constructor(name, cordinates) {
    this.name = name;
    this.gameBoard = new Gameboard(cordinates);
  }
}
