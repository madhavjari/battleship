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

test("ship is sunk", () => {
  const ship = gameBoard.ship[0];
  ship.cordinates.forEach(([x, y]) => gameBoard.receiveAttack(x, y));
  expect(ship.sunk).toBe(true);
});

test("ship Count increases", () => {
  const ship = gameBoard.ship[0];
  ship.cordinates.forEach(([x, y]) => gameBoard.receiveAttack(x, y));
  expect(gameBoard.sunkCount).toBe(1);
});
