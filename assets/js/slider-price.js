/**
 * PriceFilter Class
 * Encapsulates price range slider logic.
 * Safe to include on every page.
 */
class PriceFilter {
  constructor(containerSelector, options = {}) {
    // 1. Silent Check: If container doesn't exist, exit quietly
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    // 2. Configuration & Defaults
    this.settings = {
      min: options.min || 0,
      max: options.max || 1000,
      ...options,
    };

    this.selectors = {
      track: ".slider-track",
      range: ".slider-range",
      thumbLeft: ".slider-thumb-left",
      thumbRight: ".slider-thumb-right",
      inputLeft: ".input-left",
      inputRight: ".input-right",
      btnApply: ".btn-apply",
      ...options.selectors,
    };

    // 3. Elements Discovery (Scoped to the container)
    this.track = this.container.querySelector(this.selectors.track);
    this.range = this.container.querySelector(this.selectors.range);
    this.thumbLeft = this.container.querySelector(this.selectors.thumbLeft);
    this.thumbRight = this.container.querySelector(this.selectors.thumbRight);
    this.inputLeft = this.container.querySelector(this.selectors.inputLeft);
    this.inputRight = this.container.querySelector(this.selectors.inputRight);
    this.btnApply = this.container.querySelector(this.selectors.btnApply);

    this.priceRange = this.settings.max - this.settings.min;

    this.init();
  }

  init() {
    // Guard against missing essential elements inside the container
    if (!this.track || !this.thumbLeft || !this.thumbRight) return;

    // Set initial visual CSS positions if missing
    if (!this.thumbLeft.style.left) this.thumbLeft.style.left = "0%";
    if (!this.thumbRight.style.left) this.thumbRight.style.left = "100%";

    this.attachSliderEvents(this.thumbLeft, "left");
    this.attachSliderEvents(this.thumbRight, "right");
    this.attachInputEvents(this.inputLeft, this.thumbLeft, "min");
    this.attachInputEvents(this.inputRight, this.thumbRight, "max");

    if (this.btnApply) {
      this.btnApply.addEventListener("click", () => this.handleApply());
    }

    this.updateSliderVisuals();
  }

  updateSliderVisuals() {
    const leftPerc = parseFloat(this.thumbLeft.style.left) || 0;
    const rightPerc = parseFloat(this.thumbRight.style.left) || 100;

    const minValue =
      this.settings.min + Math.round((this.priceRange * leftPerc) / 100);
    const maxValue =
      this.settings.min + Math.round((this.priceRange * rightPerc) / 100);

    if (this.inputLeft) this.inputLeft.value = minValue;
    if (this.inputRight) this.inputRight.value = maxValue;

    if (this.range) {
      this.range.style.left = `${leftPerc}%`;
      this.range.style.width = `${rightPerc - leftPerc}%`;
    }
  }

  moveHandler(event, thumb, direction) {
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const rect = this.track.getBoundingClientRect();
    let position = ((clientX - rect.left) / rect.width) * 100;

    position = Math.max(0, Math.min(100, position));

    const leftPos = parseFloat(this.thumbLeft.style.left);
    const rightPos = parseFloat(this.thumbRight.style.left);

    if (direction === "left" && position >= rightPos) return;
    if (direction === "right" && position <= leftPos) return;

    thumb.style.left = `${position}%`;
    this.updateSliderVisuals();
  }

  attachSliderEvents(thumb, direction) {
    const startMove = (e) => {
      e.preventDefault();
      const onMove = (event) => this.moveHandler(event, thumb, direction);
      const onStop = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("mouseup", onStop);
        document.removeEventListener("touchend", onStop);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("touchmove", onMove);
      document.addEventListener("mouseup", onStop);
      document.addEventListener("touchend", onStop);
    };
    thumb.addEventListener("mousedown", startMove);
    thumb.addEventListener("touchstart", startMove);
  }

  attachInputEvents(input, thumb, type) {
    if (!input) return;

    input.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      const otherVal =
        type === "min"
          ? parseInt(this.inputRight.value, 10)
          : parseInt(this.inputLeft.value, 10);

      const isValid =
        !isNaN(val) &&
        val >= this.settings.min &&
        val <= this.settings.max &&
        (type === "min" ? val < otherVal : val > otherVal);

      if (isValid) {
        input.classList.remove("is-invalid");
        const pos = ((val - this.settings.min) / this.priceRange) * 100;
        thumb.style.left = `${pos}%`;
        this.updateSliderVisuals();
      } else {
        input.classList.add("is-invalid");
      }
    });

    input.addEventListener("blur", () => {
      input.classList.remove("is-invalid");
      this.updateSliderVisuals();
    });
  }

  handleApply() {
    const result = {
      min: parseInt(this.inputLeft?.value || this.settings.min),
      max: parseInt(this.inputRight?.value || this.settings.max),
    };

    // Dispatch custom event for external listeners
    const event = new CustomEvent("priceFilterApply", {
      detail: result,
      bubbles: true,
    });
    this.container.dispatchEvent(event);
  }
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  // This will run safely on all pages
  const filter = new PriceFilter(".price-filter-widget", {
    min: 0,
    max: 1000,
  });
});
