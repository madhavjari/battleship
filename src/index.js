import "./style.css";
import Player from "./player";
import { render } from "./render";
import { attachListener } from "./eventlisteners";

const player1 = new Player("Real");
const player2 = new Player("Computer");

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
