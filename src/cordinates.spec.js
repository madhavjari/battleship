import { ships } from "./cordinates";
import { makeCordinates } from "./cordinates";

test("random number", () => {
  const cordinates = makeCordinates();
  cordx = cordinates.x;
  cordy = cordinates.y;
  direction = cordinates.direction;
  madeCord = cordinates.madeCord;
  cordinate = cordinates.cordinates;
  expect(cordx).toBeLessThan(9);
  expect(cordy).toBeLessThan(9);
  expect(direction === "h" || direction === "v").toBe(true);
  expect(madeCord).toBe(true);
});

test("board", () => {
  const board = ships();
  expect(board.flat()).toContainEqual("not occupied");
  expect(board.flat()).toContainEqual("battleship");
  expect(() => board[10][0]).toThrow(TypeError);
  expect(board.flat()).toContainEqual("destroyer");
  expect(board.flat()).toContainEqual("carrier");
  expect(board.flat()).toContainEqual("submarine");
  expect(board.flat()).toContainEqual("patrol boat");
  expect(board.flat().filter((v) => v === "battleship").length).toBe(4);
  expect(board.flat().filter((v) => v === "destroyer").length).toBe(3);
  expect(board.flat().filter((v) => v === "carrier").length).toBe(5);
  expect(board.flat().filter((v) => v === "submarine").length).toBe(2);
  expect(board.flat().filter((v) => v === "patrol boat").length).toBe(1);
});
