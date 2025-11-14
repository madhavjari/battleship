export function attachListener(player1, player2) {
  let activePlayer = player1;
  const switchPlayerTurn = () =>
    (activePlayer = activePlayer === player1 ? player2 : player1);

  const checkWin = () => {
    if (activePlayer.gameBoard.sunkCount === 5) {
      switchPlayerTurn();
      console.log(`${activePlayer} won`);
      return true;
    }
    return false;
  };

  let result = false;
  const computerUI = document.querySelector(".computer");
  computerUI.addEventListener("click", (e) => {
    const attackPart = e.target;
    attackFeatureOnDOM(attackPart);
    switchPlayerTurn();
    console.log("computer Ships", activePlayer.gameBoard.ship);
    activePlayer.gameBoard.receiveAttack(
      attackPart.dataset.cordx,
      attackPart.dataset.cordy,
    );
    result = checkWin();
    const compCord = computerRandomSelect();
    attackFeatureOnDOM(compCord.selectedDIv);
    switchPlayerTurn();
    activePlayer.gameBoard.receiveAttack(compCord.x, compCord.y);
    result = checkWin();
    console.log("human ships", activePlayer.gameBoard.ship);
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
    console.log(div);
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

export function computerRandomSelect() {
  while (true) {
    let alreadyHit = false;
    let selectedDIv;
    let x = parseInt(Math.random() * 9.9);
    let y = parseInt(Math.random() * 9.9);
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
