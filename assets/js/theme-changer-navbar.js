/**
 * ThemeChangerNavBar
 * Handles Bootstrap 5.3+ light/dark mode switching.
 * Requires: FontAwesome for icons and Bootstrap 5.3 CSS/JS.
 */
class ThemeChangerNavBar {
    constructor() {
        // Key used to remember user choice in the browser
        this.storageKey = 'theme-preference';
        
        // Map theme names to FontAwesome icon classes
        this.icons = {
            'light': 'fa-sun',
            'dark': 'fa-moon',
            'auto': 'fa-circle-half-stroke'
        };
        
        this.init();
    }

    /**
     * Entry point: sets initial theme and binds UI events
     */
    init() {
        // Fallback order: 1. Saved preference, 2. Default to 'light'
        const savedTheme = this.getStoredTheme();
        const initialTheme = savedTheme || 'light';
        
        // Apply theme immediately
        this.setTheme(initialTheme);

        // Find all buttons with data-bs-theme-value attribute
        const themeButtons = document.querySelectorAll('[data-bs-theme-value]');
        
        // Only attach listeners if elements exist on the current page
        if (themeButtons.length > 0) {
            themeButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const theme = btn.getAttribute('data-bs-theme-value');
                    this.setTheme(theme);
                });
            });
        }

        // Listen for OS theme changes (only matters if 'auto' is selected)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (this.getStoredTheme() === 'auto') {
                this.setTheme('auto');
            }
        });
    }

    getStoredTheme() {
        return localStorage.getItem(this.storageKey);
    }

    getPreferredTheme() {
        // Detects OS/System level dark mode preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    /**
     * Logic to apply the theme and save settings
     */
    setTheme(theme) {
        // If 'auto', pick based on system; otherwise use the string ('light' or 'dark')
        const actualTheme = theme === 'auto' ? this.getPreferredTheme() : theme;

        // Apply data-bs-theme to <html> for Bootstrap 5 logic
        document.documentElement.setAttribute('data-bs-theme', actualTheme);

        // Save the setting so it persists on page refresh
        localStorage.setItem(this.storageKey, theme);

        // Update visual elements in the navbar
        this.updateUI(theme);
    }

    /**
     * Updates icons and active states in the navbar
     */
    updateUI(theme) {
        const themeButtons = document.querySelectorAll('[data-bs-theme-value]');
        
        themeButtons.forEach(el => {
            // Manage Bootstrap 'active' class for dropdown items
            el.classList.remove('active');
            el.setAttribute('aria-pressed', 'false');
            
            if (el.getAttribute('data-bs-theme-value') === theme) {
                el.classList.add('active');
                el.setAttribute('aria-pressed', 'true');
            }
        });

        // Safely update the main toggle icon if it exists
        const mainIcon = document.getElementById('current-theme-icon');
        if (mainIcon) {
            const iconName = this.icons[theme] || this.icons.light;
            mainIcon.className = `fas ${iconName} fa-fw`;
        }
    }
}

// Wait for HTML to be fully loaded before running logic
document.addEventListener('DOMContentLoaded', () => {
    new ThemeChangerNavBar();
});