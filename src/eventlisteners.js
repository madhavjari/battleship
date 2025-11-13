export function attachListener(player1, player2) {
  let activePlayer = player1;
  const switchPlayerTurn = () =>
    (activePlayer = activePlayer === player1 ? player2 : player1);

  let result = false;
  let UI = document.querySelectorAll(".game-ui > * > *");
  UI.forEach((div) => {
    div.addEventListener("click", () => {
      console.log(div);
      disablePointer(activePlayer);
      activePlayer.gameBoard.receiveAttack(
        div.dataset.cordx,
        div.dataset.cordy,
      );
      attackFeatureOnDOM(div);
      if (div.classList[1] === "ship") {
        const ship = foundShip(activePlayer, div.classList[0]);
        checkSunk(activePlayer, ship);
      }

      if (activePlayer.gameBoard.sunkCount === 5) {
        console.log(`${activePlayer.name} won`);
        result = true;
      }
      switchPlayerTurn();
      console.log("sunk", activePlayer.gameBoard.sunkCount, activePlayer.name);
      console.log("hit", activePlayer.gameBoard.ship);
    });
  });
}

function disablePointer(player) {
  const computerUI = document.querySelectorAll(".computer > *");
  const humanUI = document.querySelectorAll(".human > *");
  if (player.name === "Computer") {
    humanUI.forEach((div) => {
      div.style.pointerEvents = "none";
    });
    computerUI.forEach((div) => {
      div.style.pointerEvents = "auto";
    });
  } else {
    computerUI.forEach((div) => {
      div.style.pointerEvents = "none";
    });
    humanUI.forEach((div) => {
      div.style.pointerEvents = "auto";
    });
  }
}

function attackFeatureOnDOM(div) {
  if (div.classList[0] === "blank") {
    div.classList.add("missed");
    div.style.pointerEvents = "none";
  } else {
    div.classList.add("hit");
    div.style.pointerEvents = "none";
  }
}

function foundShip(player, ship) {
  for (let i = 0; i < player.gameBoard.ship.length; i++) {
    if (player.gameBoard.ship[i].name === ship) {
      return player.gameBoard.ship[i];
    }
  }
}

function checkSunk(player, ship) {
  if (ship.sunk) {
    const allShipClass =
      player.name === "Computer"
        ? document.querySelectorAll(`.computer > .${ship.name}`)
        : document.querySelectorAll(`.human > .${ship.name}`);
    allShipClass.forEach((div) => {
      div.classList.add("sunk");
    });
  }
}
