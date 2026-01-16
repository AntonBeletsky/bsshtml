/**
 * ThemeSwitcher Class (Simplified Binary Toggle)
 * Switches between 'light' and 'dark' modes only.
 */
class ThemeSwitcher {
  // Private constants
  #STORAGE_KEY = "user-theme-preference";
  #ICONS = {
    light: "☀️",
    dark: "🌙",
  };

  /**
   * @param {string} defaultTheme - Initial theme ('light' or 'dark')
   */
  constructor(defaultTheme = "light") {
    this.button = null;
    this.defaultTheme = defaultTheme;
    this.init();
  }

  /**
   * Application entry point
   */
  init() {
    this.#createButton();
    this.#applyInitialTheme();
    this.#attachEventListeners();
  }

  /**
   * Creates and styles the floating toggle button
   */
  #createButton() {
    this.button = document.createElement("button");
    this.button.setAttribute("aria-label", "Toggle Theme");

    // Standard floating button styles
    Object.assign(this.button.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: "9999",
      border: "none",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "26px",
      cursor: "pointer",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      outline: "none"
    });

    document.body.appendChild(this.button);
  }

  /**
   * Updates the theme and button appearance
   * @param {string} theme - 'light' or 'dark'
   */
  setTheme(theme) {
    // 1. Set global data attribute for CSS
    document.documentElement.setAttribute("data-bs-theme", theme);
    
    // 2. Save user preference
    localStorage.setItem(this.#STORAGE_KEY, theme);

    // 3. Update button colors and icon
    this.#updateUI(theme);
  }

  /**
   * Changes button colors based on the active theme
   */
  #updateUI(theme) {
    const isDark = theme === "dark";

    this.button.style.backgroundColor = isDark ? "#212529" : "#ffffff";
    this.button.style.color = isDark ? "#f8f9fa" : "#212529";
    this.button.style.border = `2px solid ${isDark ? "#343a40" : "#e9ecef"}`;
    this.button.style.boxShadow = isDark 
      ? "0 8px 24px rgba(0,0,0,0.5)" 
      : "0 8px 24px rgba(0,0,0,0.1)";

    this.button.textContent = this.#ICONS[theme];
  }

  /**
   * Loads saved theme or defaults to constructor value
   */
  #applyInitialTheme() {
    const savedTheme = localStorage.getItem(this.#STORAGE_KEY);
    // If no saved theme, use the default from constructor
    this.setTheme(savedTheme || this.defaultTheme);
  }

  /**
   * Sets up interaction listeners
   */
  #attachEventListeners() {
    this.button.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-bs-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      this.setTheme(nextTheme);
    });

    // Simple hover effect
    this.button.addEventListener("mouseenter", () => {
      this.button.style.transform = "scale(1.1) rotate(10deg)";
    });
    this.button.addEventListener("mouseleave", () => {
      this.button.style.transform = "scale(1) rotate(0deg)";
    });
  }
}

// Initialize: Default to 'light', remembers choice on refresh
// "dark" or "light"
const themeSwitcher = new ThemeSwitcher("light");