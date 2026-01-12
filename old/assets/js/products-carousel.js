/**
 * ProductsCarousel Class
 * Designed for modularity and supporting multiple instances on one page.
 */
class ProductsCarousel {
  /**
   * @param {string} containerSelector - Unique CSS selector for the carousel wrapper.
   * @param {Object} options - Configuration object.
   */
  constructor(containerSelector, options = {}) {
    // Select the main wrapper
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      console.warn(
        `Carousel: Container ${containerSelector} for product-carusel not found.`
      );
      return;
    }

    // Configuration
    this.scrollMode = options.scrollMode || "page"; // 'single' or 'page'
    this.currentIndex = 0;

    // Scoped element selection (prevents conflicts with other carousels)
    this.track = this.container.querySelector(".carousel-track");
    this.prevBtn = this.container.querySelector(".carousel-nav-prev");
    this.nextBtn = this.container.querySelector(".carousel-nav-next");
    this.paginationContainer = this.container.querySelector(
      ".carousel-pagination"
    );

    if (!this.track) return;

    // Initialize state and events
    this.updateCards();
    this.bindEvents();
    this.init();
  }

  /**
   * Syncs the internal list of card elements.
   */
  updateCards() {
    this.productCards = Array.from(this.track.querySelectorAll(".card-item"));
  }

  /**
   * Calculates the width of a single item including margins.
   */
  getSingleItemWidth() {
    if (this.productCards.length > 0) {
      const item = this.productCards[0];
      const style = window.getComputedStyle(item);
      const width = item.offsetWidth;
      const margin =
        parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      return width + margin;
    }
    return 0;
  }

  /**
   * Generates pagination dots based on the number of cards.
   */
  createPaginationDots() {
    if (!this.paginationContainer) return;

    this.paginationContainer.innerHTML = "";
    this.productCards.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("pagination-dot");
      dot.setAttribute("role", "button");
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

      dot.addEventListener("click", () => this.scrollToIndex(index));
      this.paginationContainer.appendChild(dot);
    });
    this.updateUI();
  }

  /**
   * Refreshes the active states of dots and navigation buttons.
   */
  updateUI() {
    const itemWidth = this.getSingleItemWidth();
    if (itemWidth === 0) return;

    // Calculate current index based on scroll position
    const visibleIndex = Math.round(this.track.scrollLeft / itemWidth);
    this.currentIndex = visibleIndex;

    // Update dots
    if (this.paginationContainer) {
      const dots = this.paginationContainer.children;
      Array.from(dots).forEach((dot, index) => {
        dot.classList.toggle("active", index === visibleIndex);
      });
    }

    // Update button states (disabled at boundaries)
    const maxScroll = this.track.scrollWidth - this.track.offsetWidth;
    if (this.prevBtn) this.prevBtn.disabled = this.track.scrollLeft <= 5;
    if (this.nextBtn)
      this.nextBtn.disabled = this.track.scrollLeft >= maxScroll - 5;
  }

  /**
   * Scrolls the track to a specific card index.
   */
  scrollToIndex(index, smooth = true) {
    const itemWidth = this.getSingleItemWidth();
    this.track.scroll({
      left: itemWidth * index,
      behavior: smooth ? "smooth" : "auto",
    });
  }

  /**
   * Logic for moving the track left or right.
   */
  handleNavigation(direction) {
    const itemWidth = this.getSingleItemWidth();
    let step;

    if (this.scrollMode === "single") {
      step = itemWidth;
    } else {
      // Overlap logic: Visible width minus one item width
      step = this.track.offsetWidth - itemWidth;
    }

    this.track.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  }

  /**
   * Sets up all event listeners.
   */
  bindEvents() {
    // Navigation button clicks
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () =>
        this.handleNavigation("prev")
      );
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () =>
        this.handleNavigation("next")
      );
    }

    // Scroll listener for UI updates
    this.track.addEventListener("scroll", () => this.updateUI());

    // Window resize listener (debounced or simple)
    window.addEventListener("resize", () => {
      this.createPaginationDots();
      this.scrollToIndex(this.currentIndex, false); // Maintain position
    });
  }

  /**
   * Initial component rendering.
   */
  init() {
    this.createPaginationDots();
  }
}

// --- INITIALIZATION ---

window.addEventListener("load", () => {
  // Instance 1: Pages mode
  const heroCarousel = new ProductsCarousel(".carousel-track-container", {
    scrollMode: "page",
  });

  // Instance 2: Single item mode
  /*
  const productsCarousel = new ProductsCarousel(".product-carousel-wrapper", {
    scrollMode: "single",
  });
  */
});
