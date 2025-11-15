import Gameboard from "./gameboard";

const gameBoard = new Gameboard();
gameBoard.createShips();
const board = gameBoard.board;

test("No outbound ship", () => {
  expect(() => board[10][0]).toThrow(TypeError);
});

test("all ship placed", () => {
  expect(board.flat()).toContainEqual("not occupied");
  expect(board.flat()).toContainEqual("battleship");
  expect(board.flat()).toContainEqual("destroyer");
  expect(board.flat()).toContainEqual("carrier");
  expect(board.flat()).toContainEqual("submarine");
  expect(board.flat()).toContainEqual("patrolboat");
});

test("all ship length", () => {
  expect(board.flat().filter((v) => v === "battleship").length).toBe(4);
  expect(board.flat().filter((v) => v === "destroyer").length).toBe(3);
  expect(board.flat().filter((v) => v === "carrier").length).toBe(5);
  expect(board.flat().filter((v) => v === "submarine").length).toBe(2);
  expect(board.flat().filter((v) => v === "patrolboat").length).toBe(1);
});

test("attack", () => {
  expect(gameBoard.receiveAttack(2, 2)).toEqual("missed");
  gameBoard.receiveAttack(0, 0);
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
