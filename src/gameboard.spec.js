import { Gameboard } from "./gameboard";

test("gameboard random check", () => {
  const gameBoard = new Gameboard();
  gameBoard.createBoard();
  expect(gameBoard.board[8][7]).toEqual("not occupied");
});
