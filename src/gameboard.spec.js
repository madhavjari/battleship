import { Gameboard } from "./gameboard";

const gameBoard = new Gameboard();
gameBoard.createBoard();

test("gameboard random check", () => {
  expect(gameBoard.board[8][7]).toEqual("not occupied");
});

gameBoard.createShips();

test("ship placement", () => {
  expect(gameBoard.board[4][3]).toEqual("battleship");
  expect(gameBoard.board[0][0]).toEqual("patrolboat");
  expect(gameBoard.board[1][0]).toEqual("not occupied");
  expect(gameBoard.board[9][6]).toEqual("destroyer");
});

test("attack", () => {
  expect(gameBoard.receiveAttack([2, 2])).toEqual("missed");
  gameBoard.receiveAttack([0, 0]);
  expect(gameBoard.ship[4].sunk).toBe(true);
});

test("many hits", () => {
  gameBoard.receiveAttack([7, 6]);
  gameBoard.receiveAttack([8, 6]);
  expect(gameBoard.ship[2].name).toBe("destroyer");
  expect(gameBoard.ship[2].length).toBe(3);
  expect(gameBoard.ship[2].hitCount).toBe(2);
  expect(gameBoard.ship[2].sunk).toBe(false);
  gameBoard.receiveAttack([9, 6]);
  expect(gameBoard.ship[2].hitCount).toBe(3);
  expect(gameBoard.ship[2].sunk).toBe(true);
  expect(gameBoard.ship[4].sunk).toBe(true);
  expect(gameBoard.sunkCount).toBe(2);
});
