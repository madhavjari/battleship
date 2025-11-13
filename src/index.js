import "./style.css";
import Player from "./player";
import { render } from "./render";
import { attachListener } from "./eventlisteners";

const player1 = new Player("Real", [
  [2, 3],
  "horizontal",
  [3, 3],
  "vertical",
  [7, 6],
  "vertical",
  [9, 1],
  "horizontal",
  [0, 0],
  "vertical",
]);
const player2 = new Player("Computer", [
  [1, 9],
  "vertical",
  [5, 4],
  "horizontal",
  [2, 4],
  "horizontal",
  [2, 1],
  "vertical",
  [7, 3],
  "horizontal",
]);

render(player1, player2);
console.log(player1);
let result = false;
attachListener(player1, player2);
// while (result === false) {
//   activePlayer = player1;
//   console.log(player1);
//   result = attachListener(activePlayer);
//   if (result === true) {
//     alert(`${activePlayer.name} Won`);
//     break;
//   }
//   activePlayer = activePlayer === player1 ? player2 : player1;
// }
