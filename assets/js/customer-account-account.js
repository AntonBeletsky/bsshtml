// Personal Information Manager Class
class PersonalInfoManager {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.editButton = this.form.querySelector(".personal-data-edit-btn");
    this.saveButton = this.form.querySelector(".personal-data-save-btn");
    this.inputs = this.form.querySelectorAll(".personal-data-input");
    this.initEventListeners();
  }

  initEventListeners() {
    this.editButton.addEventListener("click", () => this.toggleEdit());
    this.saveButton.addEventListener("click", () => this.saveEdit());
  }

  toggleEdit() {
    this.inputs.forEach((input) => input.removeAttribute("readonly"));
    this.inputs[0].focus();
    this.editButton.classList.add("d-none");
    this.saveButton.classList.remove("d-none");
  }

  saveEdit() {
    this.inputs.forEach((input) => input.setAttribute("readonly", "true"));
    this.saveButton.classList.add("d-none");
    this.editButton.classList.remove("d-none");
    // Add server-side save logic here if needed
  }
}

// Address Manager Class
class AddressManager {
  constructor(containerId, modalId) {
    this.container = document.getElementById(containerId);
    this.modal = document.getElementById(modalId);
    this.modalMessage = document.getElementById("modalMessage");
    this.addAddressBtn = document.getElementById("addAddressBtn");
    this.newAddressInput = document.getElementById("newAddress");
    this.addressCounter = 2;
    this.initEventListeners();
  }

  initEventListeners() {
    this.container.addEventListener("click", (event) =>
      this.handleContainerClick(event)
    );
    this.addAddressBtn.addEventListener("click", () => this.addNewAddress());
    this.modal.addEventListener("click", (event) =>
      this.handleModalClick(event)
    );
  }

  handleContainerClick(event) {
    const target = event.target;
    // Find the address card that was clicked
    const card = target.closest(".address-card");
    if (!card) return;
    const addressId = card.dataset.addressId;
    const input = card.querySelector(`#${addressId}`);
    const editButton = card.querySelector(".address-edit-btn");
    const saveButton = card.querySelector(".address-save-btn");

    if (target.classList.contains("address-edit-btn")) {
      this.toggleEdit(input, editButton, saveButton);
    } else if (target.classList.contains("address-save-btn")) {
      this.saveEdit(input, editButton, saveButton);
    } else if (target.classList.contains("address-menu-btn")) {
      // Clicking the Remove button immediately opens the modal
      this.openRemoveDialog(addressId);
    }
  }

  handleModalClick(event) {
    const target = event.target;
    const addressId = this.modal.dataset.currentCard;
    if (!addressId) return;

    if (target.matches('[data-action="confirm-delete"]')) {
      const card = document.querySelector(`[data-address-id="${addressId}"]`);
      if (card) {
        this.removeAddress(card);
      }
      this.closeRemoveDialog();
    } else if (target.matches('[data-action="close-modal"]')) {
      this.closeRemoveDialog();
    }
  }

  toggleEdit(input, editButton, saveButton) {
    input.removeAttribute("readonly");
    input.focus();
    editButton.classList.add("d-none");
    saveButton.classList.remove("d-none");
  }

  saveEdit(input, editButton, saveButton) {
    input.setAttribute("readonly", "true");
    saveButton.classList.add("d-none");
    editButton.classList.remove("d-none");
    // Add server-side save logic here if needed
  }

  openRemoveDialog(addressId) {
    this.modalMessage.textContent = `Are you sure you want to remove address ${addressId}?`;
    this.modal.dataset.currentCard = addressId;
    this.modal.showModal();
  }

  removeAddress(card) {
    card.closest(".col-md-6").remove();
    // Add server-side delete logic here if needed
  }

  closeRemoveDialog() {
    this.modal.close();
    delete this.modal.dataset.currentCard;
  }

  addNewAddress() {
    const addressValue = this.newAddressInput.value.trim();
    if (!addressValue) return;
    this.addressCounter++;
    const newId = `address${this.addressCounter}`;
    const newCol = document.createElement("div");
    newCol.className = "col-md-6";
    newCol.innerHTML = `
            <div class="card address-card" data-address-id="${newId}">
              <div class="card-body">
                <h6>Address ${this.addressCounter}</h6>
                <label for="${newId}">Delivery Address</label>
                <input type="text" class="form-control mb-3 address-input" id="${newId}" value="${addressValue}" readonly>
                <div class="row g-2">
                  <div class="col-6">
                    <button type="button" class="btn btn-sm btn-outline-primary w-100 address-edit-btn" data-action="edit">Edit</button>
                    <button type="button" class="btn btn-sm btn-outline-success w-100 d-none address-save-btn" data-action="save">Save</button>
                  </div>
                  <div class="col-6">
                    <button type="button" class="btn btn-sm btn-outline-danger w-100 address-menu-btn" data-action="toggle-menu">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          `;
    this.container.appendChild(newCol);
    this.newAddressInput.value = "";
    // Add server-side save logic here if needed
  }
}

// Initialize modules after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PersonalInfoManager("personalDataForm");
  new AddressManager("addressContainer", "removeAddressModal");
});

/* old code removed for brevity 
// Personal Information Module
class PersonalInfoManager {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.editButton = this.form.querySelector(".personal-data-edit-btn");
    this.saveButton = this.form.querySelector(".personal-data-save-btn");
    this.inputs = this.form.querySelectorAll(".personal-data-input");
    this.initEventListeners();
  }

  initEventListeners() {
    this.editButton.addEventListener("click", () => this.toggleEdit());
    this.saveButton.addEventListener("click", () => this.saveEdit());
  }

  toggleEdit() {
    this.inputs.forEach((input) => input.removeAttribute("readonly"));
    this.inputs[0].focus();
    this.editButton.style.display = "none";
    this.saveButton.style.display = "inline-block";
  }

  saveEdit() {
    this.inputs.forEach((input) => input.setAttribute("readonly", "true"));
    this.saveButton.style.display = "none";
    this.editButton.style.display = "inline-block";
    // Add server-side save logic here
  }
}

// Address Management Module
class AddressManager {
  constructor(containerId, modalId) {
    this.container = document.getElementById(containerId);
    this.modal = document.getElementById(modalId);
    this.modalMessage = document.getElementById("modalMessage");
    this.addAddressBtn = document.getElementById("addAddressBtn");
    this.newAddressInput = document.getElementById("newAddress");
    this.addressCounter = 2;
    this.initEventListeners();
  }

  initEventListeners() {
    this.container.addEventListener("click", (event) =>
      this.handleContainerClick(event)
    );
    this.addAddressBtn.addEventListener("click", () => this.addNewAddress());
    this.modal.addEventListener("click", (event) =>
      this.handleModalClick(event)
    );
  }

  handleContainerClick(event) {
    const target = event.target;
    const card = target.closest(".address-card");
    if (!card) return;

    const addressId = card.dataset.addressId;
    const input = card.querySelector(`#${addressId}`);
    const editButton = card.querySelector(".address-edit-btn");
    const saveButton = card.querySelector(".address-save-btn");
    const menu = card.querySelector(`#menu-${addressId}`);

    if (target.classList.contains("address-edit-btn")) {
      this.toggleEdit(input, editButton, saveButton);
    } else if (target.classList.contains("address-save-btn")) {
      this.saveEdit(input, editButton, saveButton);
    } else if (target.classList.contains("address-menu-btn")) {
      this.toggleMenu(menu);
    } else if (target.classList.contains("address-delete-link")) {
      event.preventDefault();
      this.openRemoveDialog(card, addressId);
    }
  }

  handleModalClick(event) {
    const target = event.target;
    const card = this.modal.dataset.currentCard;
    if (target.matches('[data-action="confirm-delete"]')) {
      this.removeAddress(document.querySelector(`[data-address-id="${card}"]`));
      this.closeRemoveDialog();
    } else if (target.matches('[data-action="close-modal"]')) {
      this.closeRemoveDialog();
    }
  }

  toggleEdit(input, editButton, saveButton) {
    input.removeAttribute("readonly");
    input.focus();
    editButton.classList.add("d-none");
    saveButton.classList.remove("d-none");
  }

  saveEdit(input, editButton, saveButton) {
    input.setAttribute("readonly", "true");
    saveButton.classList.add("d-none");
    editButton.classList.remove("d-none");
    // Add server-side save logic here
  }

  toggleMenu(menu) {
    menu.classList.toggle("active");
  }

  openRemoveDialog(card, addressId) {
    this.modalMessage.textContent = `Are you sure you want to remove address ${addressId}?`;
    this.modal.dataset.currentCard = addressId;
    this.modal.showModal();
  }

  removeAddress(card) {
    card.closest(".col-md-6").remove();
    // Add server-side delete logic here
  }

  closeRemoveDialog() {
    this.modal.close();
    delete this.modal.dataset.currentCard;
  }

  addNewAddress() {
    const addressValue = this.newAddressInput.value.trim();
    if (!addressValue) return;

    this.addressCounter++;
    const newId = `address${this.addressCounter}`;
    const newCard = document.createElement("div");
    newCard.className = "col-md-6";

    newCard.innerHTML = `
                    <div class="card address-card" data-address-id="${newId}">
                        <div class="card-body">
                            <h6>Address ${this.addressCounter}</h6>
                            <label for="${newId}">Delivery Address</label>
                            <input type="text" class="form-control mb-3 address-input" id="${newId}" value="${addressValue}" readonly>
                            <div class="row g-2">
                                <div class="col-6">
                                    <button type="button" class="btn btn-sm btn-outline-primary w-100 address-edit-btn" data-action="edit">Edit</button>
                                    <button type="button" class="btn btn-sm btn-outline-success w-100 d-none address-save-btn" data-action="save">Save</button>
                                </div>
                                <div class="col-6">
                                    <button type="button" class="btn btn-sm btn-outline-danger w-100 address-menu-btn" data-action="toggle-menu">Remove</button>
                                </div>
                            </div>
                            <div class="menu d-none mt-2" id="menu-${newId}">
                                <a href="#" class="address-delete-link" data-action="delete">Remove</a>
                            </div>
                        </div>
                    </div>
                `;
    this.container.appendChild(newCard);
    this.newAddressInput.value = "";
    // Add server-side save logic here
  }
}

// Initialize modules
document.addEventListener("DOMContentLoaded", () => {
  new PersonalInfoManager("personalDataForm");
  new AddressManager("addressContainer", "removeAddressModal");
});
*/
