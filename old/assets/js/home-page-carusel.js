/**
 * IndexCarousel Class - 2026 Modern Standard (Non-Module version)
 */
class IndexCarousel {
  /**
   * @param {string} containerSelector - Wrapper class (e.g., '.index-carousel-container')
   * @param {Object} options - Bootstrap Carousel configuration settings
   */
  constructor(containerSelector, options = {}) {
    const container = document.querySelector(containerSelector);

    if (!container) {
      // Soft notification to avoid breaking other JS on the page
      console.warn(
        `IndexCarousel: Element "${containerSelector}" not found on this page.`
      );
      return;
    }

    this.carouselEl = container.querySelector(".carousel");

    if (!this.carouselEl) {
      console.error(
        `IndexCarousel: Inner .carousel element not found inside "${containerSelector}".`
      );
      return;
    }

    // Default configuration
    this.config = {
      interval: 5000,
      pause: "hover",
      ride: "carousel",
      touch: true,
      ...options,
    };

    this._init();
  }

  /**
   * Internal initialization (Private-like method)
   */
  _init() {
    if (typeof bootstrap === "undefined" || !bootstrap.Carousel) {
      console.error("IndexCarousel: Bootstrap JS is not loaded.");
      return;
    }

    // Create Bootstrap instance
    this.instance = new bootstrap.Carousel(this.carouselEl, this.config);

    console.log("IndexCarousel: Initialized successfully.");
  }

  // Methods for external control
  next() {
    this.instance?.next();
  }

  prev() {
    this.instance?.prev();
  }
}

/**
 * Instance Initialization
 * Wrapped in a document state check so the script can be loaded
 * either in the <head> or at the end of the <body>
 */
const initHomeCarousel = () => {
  // Create instance and save to a global constant for potential later access
  window.homeHeroCarousel = new IndexCarousel(".index-carousel-container");
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomeCarousel);
} else {
  initHomeCarousel();
}

//===============================================================================

/**
 * Scoped Initialization OLD VERSION
 * This prevents variable leaks and allows multiple "index-carousels" to exist
 */
/*
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const indexContainers = document.querySelectorAll(
      ".index-carousel-container"
    );

    indexContainers.forEach((container) => {
      const carouselElement = container.querySelector(".carousel");
      if (carouselElement) {
        new bootstrap.Carousel(carouselElement, {
          interval: 5000,
          wrap: true,
          pause: "hover",
        });
      }
    });
  });
})();
*/
