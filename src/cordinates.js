export function makeCordinates(shipLength, shipName, board) {
  let counter = 0;
  let x;
  let y;
  let direction;
  let madeCord = false;
  let cordinates = [];
  let cordCheck = true;
  while (!madeCord) {
    cordCheck = true;
    x = parseInt(Math.random() * 9);
    y = parseInt(Math.random() * 9);
    direction = Math.random() < 0.5 ? "h" : "v";
    if (direction === "h") {
      if (y + shipLength > 10) {
        continue;
      } else {
        for (let j = y; j < y + shipLength; j++) {
          if (board[x][j] !== "not occupied") cordCheck = false;
        }
      }
    } else if (direction === "v") {
      if (x + shipLength > 10) {
        continue;
      } else {
        for (let i = x; i < x + shipLength; i++) {
          if (board[i][y] !== "not occupied") cordCheck = false;
        }
      }
    }
    if (!cordCheck) continue;
    if (direction === "h") {
      for (let j = y; j < y + shipLength; j++) {
        board[x][j] = shipName;
        cordinates.push([x, j]);
      }
    } else if (direction === "v") {
      for (let i = x; i < x + shipLength; i++) {
        board[i][y] = shipName;
        cordinates.push([i, y]);
      }
    }
    madeCord = true;
  }
  return { x, y, direction, madeCord, cordinates };
}

export function ships() {
  let board = createBoard();
  const carrier = makeCordinates(5, "carrier", board);
  const battleShip = makeCordinates(4, "battleship", board);
  const destroyer = makeCordinates(3, "destroyer", board);
  const submarine = makeCordinates(2, "submarine", board);
  const patrolBoat = makeCordinates(1, "patrol boat", board);
  return board;
}

function createBoard() {
  let board = [];
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      board[i][j] = "not occupied";
    }
  }
  return board;
}

//   shipCordinates(ship, direction, [x, y]) {

//     if (direction === "horizontal") {
//       for (let j = y; j < y + ship.length; j++) {
//         this.board[x][j] = ship.name;
//         ship.allCordinates.push([x, j]);
//       }
//     } else if (direction === "vertical") {
//       for (let i = x; i < x + ship.length; i++) {
//         this.board[i][y] = ship.name;
//         ship.allCordinates.push([i, y]);
//       }
//     }
//   }
