import "./style.css";
import Player from "./player";
import { render } from "./render";
import { attachListener } from "./eventlisteners";

const player1 = new Player("Real");
const player2 = new Player("Computer");

render(player1, player2);
attachListener(player1, player2);
