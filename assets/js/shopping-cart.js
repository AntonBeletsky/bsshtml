/**
 * Universal Cart Component
 * Handles calculations, selections, and quantity updates.
 */
class CartComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.confirmDialog = document.getElementById("confirm-dialog");
    this.selectAllCheckbox = this.container.querySelector(
      "#select-all-checkbox"
    );
    this.itemToRemove = null;

    // Settings
    this.SHIPPING_COST = 15.0;
    this.DISCOUNT_RATE = 0.1; // 10%

    this.init();
  }

  init() {
    // Main Click Listener
    this.container.addEventListener("click", (e) => this.handleActions(e));

    // Manual Input Change
    this.container.addEventListener("change", (e) => {
      if (e.target.classList.contains("quantity-input")) {
        this.handleManualInput(e.target);
      }
    });

    // Select All Toggle
    if (this.selectAllCheckbox) {
      this.selectAllCheckbox.addEventListener("change", () =>
        this.toggleSelectAll()
      );
    }

    // Dialog Handlers
    document
      .getElementById("confirm-remove")
      ?.addEventListener("click", () => this.executeRemoval());
    document
      .getElementById("cancel-remove")
      ?.addEventListener("click", () => this.confirmDialog.close());

    this.updateCartSummary();
  }

  handleActions(e) {
    const btn = e.target.closest("button") || e.target;
    const row = e.target.closest(".cart-item");

    if (btn.classList.contains("btn-plus")) this.changeQty(row, 1);
    if (btn.classList.contains("btn-minus")) this.changeQty(row, -1);
    if (btn.classList.contains("btn-remove")) {
      this.itemToRemove = row;
      this.confirmDialog.showModal();
    }
    if (e.target.classList.contains("item-checkbox")) {
      this.syncSelectAll();
      this.updateCartSummary();
    }
  }

  changeQty(row, delta) {
    const input = row.querySelector(".quantity-input");
    let value = parseInt(input.value) || 1;
    value += delta;
    input.value = value < 1 ? 1 : value;
    this.updateRowTotal(row);
  }

  handleManualInput(input) {
    let val = parseInt(input.value);
    if (isNaN(val) || val < 1) val = 1;
    input.value = val;
    this.updateRowTotal(input.closest(".cart-item"));
  }

  updateRowTotal(row) {
    const price = parseFloat(row.querySelector("[data-price]").dataset.price);
    const qty = parseInt(row.querySelector(".quantity-input").value);
    row.querySelector(".item-total").textContent = `$${(price * qty).toFixed(
      2
    )}`;
    this.updateCartSummary();
  }

  updateCartSummary() {
    const items = this.container.querySelectorAll(".cart-item");
    let subtotal = 0;

    items.forEach((item) => {
      if (item.querySelector(".item-checkbox").checked) {
        const totalText = item.querySelector(".item-total").textContent;
        subtotal += parseFloat(totalText.replace("$", "")) || 0;
      }
    });

    const shipping = subtotal > 0 ? this.SHIPPING_COST : 0;
    const discount = subtotal * this.DISCOUNT_RATE;
    const final = subtotal + shipping - discount;

    document.getElementById(
      "summary-subtotal"
    ).textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById(
      "summary-shipping"
    ).textContent = `$${shipping.toFixed(2)}`;
    document.getElementById(
      "summary-discount"
    ).textContent = `-$${discount.toFixed(2)}`;
    document.getElementById("summary-total").textContent = `$${final.toFixed(
      2
    )}`;
  }

  toggleSelectAll() {
    const state = this.selectAllCheckbox.checked;
    this.container
      .querySelectorAll(".item-checkbox")
      .forEach((cb) => (cb.checked = state));
    this.updateCartSummary();
  }

  syncSelectAll() {
    const cbs = [...this.container.querySelectorAll(".item-checkbox")];
    this.selectAllCheckbox.checked =
      cbs.length > 0 && cbs.every((cb) => cb.checked);
  }

  executeRemoval() {
    this.itemToRemove?.remove();
    this.updateCartSummary();
    this.syncSelectAll();
    this.confirmDialog.close();
  }
}

// Start
document.addEventListener(
  "DOMContentLoaded",
  () => new CartComponent("cart-items-container")
);
