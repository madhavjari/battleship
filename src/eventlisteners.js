export function attachListener(player1, player2) {
  const computerUI = document.querySelectorAll(".computer >*");

  computerUI.forEach((div) => {
    div.addEventListener("click", () => {
      player2.gameBoard.receiveAttack(div.dataset.cordx, div.dataset.cordy);
      attackFeatureOnDOM(div);
      if (div.classList[1] === "ship") {
        const ship = foundShip(player2, div.classList[0]);
        checkSunk(computerUI, ship);
      }
      if (player2.gameBoard.sunkCount === 5) {
        console.log("human won");
      }
    });
  });
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
  console.log(ship);
  for (let i = 0; i < player.gameBoard.ship.length; i++) {
    if (player.gameBoard.ship[i].name === ship) {
      return player.gameBoard.ship[i];
    }
  }
}

function checkSunk(UI, ship) {
  if (ship.sunk) {
    const allShipClass = document.querySelectorAll(`.computer > .${ship.name}`);
    allShipClass.forEach((div) => {
      div.classList.add("sunk");
    });
  }
}
