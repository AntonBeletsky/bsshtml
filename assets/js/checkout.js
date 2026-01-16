/**
 * Configuration
 */
const paymentBoxContainer = ".payment-box";

/**
 * Updates the visual classes for all payment options within a container
 * Logic is centralized here to prevent style desync
 */
const updatePaymentVisuals = (container, selectedOption) => {
  const options = container.querySelectorAll(
    `${paymentBoxContainer} .payment-option`
  );

  options.forEach((opt) => {
    // If the option is the one selected
    if (opt === selectedOption) {
      opt.classList.add("active", "border-warning");
      opt.classList.remove("hover-border-info");
    } else {
      // Restore default state for others
      opt.classList.remove("active", "border-warning");
      opt.classList.add("hover-border-info");
    }
  });
};

/**
 * Click Handler
 * Manages user interaction and ensures the radio button syncs with the card click
 */
document.addEventListener("click", (event) => {
  // 1. Scope check: ensure click is inside the target container
  const container = event.target.closest(paymentBoxContainer);
  if (!container) return;

  // 2. Element check: find the specific payment card
  const card = event.target.closest(`${paymentBoxContainer} .payment-option`);
  if (!card) return;

  // 3. Status check: ignore clicks if the option is disabled
  const radio = card.querySelector('input[name="payMethod"]');
  if (!radio || radio.disabled) return;

  // 4. Action: Select the radio button if it wasn't the direct click target
  if (event.target !== radio) {
    radio.checked = true;
  }

  // 5. UI Update: Refresh visual states
  updatePaymentVisuals(container, card);
});

/**
 * Initial State Handler
 * Syncs the UI on page load based on the pre-selected radio button
 */
document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(paymentBoxContainer);

  containers.forEach((container) => {
    // Find the radio that is checked by default (from server or HTML)
    const activeRadio = container.querySelector(
      'input[name="payMethod"]:checked'
    );

    if (activeRadio) {
      const activeCard = activeRadio.closest(
        `${paymentBoxContainer} .payment-option`
      );
      if (activeCard) {
        updatePaymentVisuals(container, activeCard);
      }
    }
  });
});
