import { Gameboard } from "./gameboard";

test("gameboard random check", () => {
  const gameBoard = new Gameboard();
  gameBoard.createBoard();
  expect(gameBoard.board[8][7]).toEqual("not occupied");
});

test("ship placement", () => {
  const gameBoard = new Gameboard();
  gameBoard.createBoard();
  gameBoard.createShips();
  expect(gameBoard.board[4][3]).toEqual("battleship");
  expect(gameBoard.board[0][0]).toEqual("patrolboat");
  expect(gameBoard.board[1][0]).toEqual("not occupied");
});

test("attack", () => {
  const gameBoard = new Gameboard();
  gameBoard.createBoard();
  gameBoard.createShips();
  expect(gameBoard.receiveAttack([2, 2])).toEqual("missed");
  expect(gameBoard.receiveAttack([3, 3])).toEqual(1);
});
