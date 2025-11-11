export function attachListener(player1, player2) {
  const computerUI = document.querySelectorAll(".computer >*");

  computerUI.forEach((div) => {
    div.addEventListener("click", () => {
      player2.gameBoard.receiveAttack(div.dataset.cordx, div.dataset.cordy);
      console.log(player2.gameBoard.ship);
    });
  });
}
