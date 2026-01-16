/* get cardID for remove-btn 3points btn */
$(document).ready(function () {
  $("button[remove-card-btn]").click(function () {
    const removeCardBtnValue = $(this).attr("remove-card-btn");
    toggleMenu(removeCardBtnValue);
  });
});

/* get cardID for remove-a on Remove-btn */
$(document).ready(function () {
  $("a[remove-card-id]").click(function () {
    const removeCardAIdValue = $(this).attr("remove-card-id");
    removeCard(removeCardAIdValue);
  });
});

/* toggleM class remove-btn */
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

/* remove card */
function removeCard(cardId) {
  /*alert(`Card ${cardId} removed!`);*/
  openRemoveDialog(cardId);
}

/* remove card dialog */
function openRemoveDialog(cardId) {
  const modal = document.getElementById("removeCardModal");
  modal.querySelector(
    "p#msg"
  ).innerHTML = `Your card ${cardId} has been successfully removed.`;
  modal.showModal();
}

/* close remove card dialog */
function closeRemoveDialog() {
  document.getElementById("removeCardModal").close();
}
