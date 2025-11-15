import { render } from "./render";

export function attachListener(player1, player2) {
  let activePlayer = player1;
  const switchPlayerTurn = () =>
    (activePlayer = activePlayer === player1 ? player2 : player1);

  const checkWin = () => {
    if (activePlayer.gameBoard.sunkCount === 5) {
      switchPlayerTurn();
      const gameUI = document.querySelector(".game-ui");
      gameUI.classList.add("over");
      alert(`${activePlayer.name} won`);
    }
  };
  const computerUI = document.querySelectorAll(".computer > button");
  computerUI.forEach((button) => {
    button.addEventListener("click", (e) => {
      const attackPart = e.target;
      console.log(attackPart);
      attackFeatureOnDOM(attackPart);
      switchPlayerTurn();
      console.log("computer Ships", activePlayer.gameBoard.ship);
      activePlayer.gameBoard.receiveAttack(
        attackPart.dataset.cordx,
        attackPart.dataset.cordy,
      );
      checkSunk(activePlayer, activePlayer.gameBoard.ship);
      checkWin();
      const compCord = computerRandomSelect();
      attackFeatureOnDOM(compCord.selectedDIv);
      switchPlayerTurn();
      activePlayer.gameBoard.receiveAttack(compCord.x, compCord.y);
      checkSunk(activePlayer, activePlayer.gameBoard.ship);
      checkWin();
      console.log("human ships", activePlayer.gameBoard.ship);
    });
  });

  const newGame = document.querySelector("header>button");
  newGame.addEventListener("click", () => {
    resetGame(player1, player2);
  });
}

function attackFeatureOnDOM(div) {
  if (div.classList[0] === "blank") {
    div.classList.add("missed");
  } else {
    div.classList.add("hit");
  }
}

function checkSunk(player, ship) {
  for (let i = 0; i < ship.length; i++) {
    if (ship[i].sunk) {
      const allShipClass =
        player.name === "Computer"
          ? document.querySelectorAll(`.computer > .${ship[i].name}`)
          : document.querySelectorAll(`.human > .${ship[i].name}`);
      console.log(allShipClass);
      allShipClass.forEach((button) => {
        button.classList.remove("ship");
        button.classList.remove("hit");
        button.classList.add("sunk");
      });
    }
  }
}

function computerRandomSelect() {
  while (true) {
    let alreadyHit = false;
    let selectedDIv;
    let x = parseInt(Math.random() * 10);
    let y = parseInt(Math.random() * 10);
    const humanUI = document.querySelectorAll(".human > *");
    humanUI.forEach((div) => {
      if (
        x === parseInt(div.dataset.cordx) &&
        y === parseInt(div.dataset.cordy)
      ) {
        selectedDIv = div;
        if (div.classList.contains("hit") || div.classList.contains("missed")) {
          alreadyHit = true;
        }
      }
    });
    if (alreadyHit) continue;
    return { x, y, selectedDIv };
  }
}

function resetGame(player1, player2) {
  const gameUI = document.querySelector(".game-ui");
  gameUI.classList.remove("over");
  gameUI.innerHTML = "";
  render(player1, player2);
  attachListener(player1, player2);
}
