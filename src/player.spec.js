import Player from "./player";

const player1 = new Player("madhav");
test("player name", () => {
  expect(player1.name).toEqual("madhav");
});

test("blank array", () => {
  player1.gameBoard.createBoard();
  const array = Array.from({ length: 10 }, () =>
    new Array(10).fill("not occupied"),
  );
  expect(player1.gameBoard.board).toEqual(array);
});
