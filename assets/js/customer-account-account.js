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

// Address Manager Class (Now Uses Bootstrap Modals)
class AddressManager {
  constructor(containerId, modalId) {
    this.container = document.getElementById(containerId);
    this.modal = new bootstrap.Modal(document.getElementById(modalId)); // Bootstrap modal instance
    this.modalMessage = document.getElementById("modalMessage");
    this.addAddressBtn = document.getElementById("addAddressBtn");
    this.newAddressInput = document.getElementById("newAddress");
    this.addressCounter = 2;
    this.currentCardId = null; // Store the address ID for deletion

    this.initEventListeners();
  }

  initEventListeners() {
    this.container.addEventListener("click", (event) =>
      this.handleContainerClick(event)
    );
    this.addAddressBtn.addEventListener("click", () => this.addNewAddress());
    document
      .querySelector('[data-action="confirm-delete"]')
      .addEventListener("click", () => this.removeAddress());
  }

  handleContainerClick(event) {
    const target = event.target;
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
    } else if (target.dataset.bsTarget === "#removeAddressModal") {
      this.prepareModal(addressId);
    }
  }

  prepareModal(addressId) {
    this.modalMessage.textContent = `Are you sure you want to remove address ${addressId}?`;
    this.currentCardId = addressId;
    this.modal.show(); // Open Bootstrap modal
  }

  removeAddress() {
    if (this.currentCardId) {
      document
        .querySelector(`[data-address-id="${this.currentCardId}"]`)
        .closest(".col-md-6")
        .remove();
      this.modal.hide(); // Close Bootstrap modal
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
                    <button type="button" class="btn btn-sm btn-outline-danger w-100" data-bs-toggle="modal" data-bs-target="#removeAddressModal">
                      Remove
                    </button>
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
