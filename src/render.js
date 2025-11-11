import Player from "./player";

export function render(player1, player2) {
  const body = document.querySelector("body");
  const gameUI = document.createElement("div");
  gameUI.classList.add("game-ui");
  body.appendChild(gameUI);

  const humanUI = document.createElement("div");
  humanUI.classList.add("human");

  const computerUI = document.createElement("div");
  computerUI.classList.add("computer");

  gameUI.append(humanUI, computerUI);

  player1.gameBoard.createShips();
  const player1Board = player1.gameBoard.getBoard();
  fillBoard(player1Board, humanUI);

  player2.gameBoard.createShips();
  const player2Board = player2.gameBoard.getBoard();
  fillBoard(player2Board, computerUI);

  function fillBoard(board, UI) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const gameSquare = document.createElement("div");
        gameSquare.dataset.cordx = i;
        gameSquare.dataset.cordy = j;
        if (board[i][j] === "not occupied") {
          gameSquare.classList.add("blank");
        } else {
          gameSquare.classList.add(board[i][j]);
          gameSquare.classList.add("ship");
        }
        UI.appendChild(gameSquare);
      }
    }
  }
}
