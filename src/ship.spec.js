import Ship from "./ship";

test("Ship length", () => {
  const newShip = new Ship("", 1);
  expect(newShip.length).toBe(1);
});

test("Ship hit initial is 0", () => {
  const newShip = new Ship("", 2);
  expect(newShip.hitCount).toBe(0);
});

test("First hit", () => {
  const newShip = new Ship("", 3);
  newShip.hit();
  expect(newShip.hitCount).toBe(1);
});

test("Ship is Sunk", () => {
  const newShip = new Ship("", 3);
  newShip.hit();
  newShip.hit();
  newShip.hit();
  expect(newShip.sunk).toBe(true);
});

test("New ship status", () => {
  const newShip = new Ship("", 1);
  newShip.hit();
  expect(newShip).toEqual({
    name: "",
    length: 1,
    hitCount: 1,
    sunk: true,
  });
});
