import Player from "./player";

export function render() {
  const body = document.querySelector("body");
  const gameUI = document.createElement("div");
  gameUI.classList.add("game-ui");
  body.appendChild(gameUI);

  const humanUI = document.createElement("div");
  humanUI.classList.add("human");

  const computerUI = document.createElement("div");
  computerUI.classList.add("computer");

  gameUI.append(humanUI, computerUI);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const gameSquare = document.createElement("div");
      gameSquare.classList.add("blank");
      computerUI.appendChild(gameSquare);
    }
  }
  const player1 = new Player("human");
  player1.player.createShips();
  const board = player1.player.getBoard();

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const gameSquare = document.createElement("div");
      if (board[i][j] === "not occupied") {
        gameSquare.classList.add("blank");
      } else {
        gameSquare.classList.add("ship");
      }
      humanUI.appendChild(gameSquare);
    }
  }
}
