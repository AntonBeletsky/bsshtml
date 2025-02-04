function toggleMenu(cardId) {
  /*alert(cardId);*/
  if (cardId == null) {
    console.log(
      "Card ID is null, you need use onclick=\"toggleMenu('id-00001')\" to pass the card ID."
    );
  }
  const menuId = "cardMenu-" + cardId;
  /*alert(menuId);*/
  const menu = document.getElementById(menuId);
  menu.classList.toggle("d-none");
}

function removeCard(cardId) {
  /*alert(`Card ${cardId} removed!`);*/
  openRemoveDialog(cardId);
}

function openRemoveDialog(cardId) {
  const modal = document.getElementById("removeCardModal");
  modal.querySelector(
    "p#msg"
  ).innerHTML = `Your card ${cardId} has been successfully removed.`;
  modal.showModal();
}

function closeRemoveDialog() {
  document.getElementById("removeCardModal").close();
}
