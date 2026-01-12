 (function() {
            const THEME_STORAGE_KEY = 'theme'; // Key for storing the theme in localStorage
            const LIGHT_ICON = '☀️'; // Icon for the light theme
            const DARK_ICON = '🌙';  // Icon for the dark theme

            // 1. Create the button element
            const themeSwitcherButton = document.createElement('button');
            themeSwitcherButton.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                /* Background color will be set based on the theme */
                color: #fff; /* Icon/text color - white by default (for dark background) */
                border: none;
                border-radius: 50%; /* Makes the button round */
                width: 50px; /* Width */
                height: 50px; /* Height */
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px; /* Icon size */
                cursor: pointer;
                box-shadow: 0 1px 3px rgba(0,0,0,0.2); /* Subtle shadow */
                transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Smooth color and shadow transition */
            `;

            // Add the button to the page body
            document.body.appendChild(themeSwitcherButton);

            // 2. Function to set the theme and update button styles
            function setTheme(theme) {
                document.documentElement.setAttribute('data-bs-theme', theme);
                localStorage.setItem(THEME_STORAGE_KEY, theme); // Save the choice to localStorage

                // Update the button's background color based on the theme
                if (theme === 'dark') {
                    themeSwitcherButton.style.backgroundColor = '#495057'; // Dark gray for dark theme
                    themeSwitcherButton.style.color = '#fff'; // White text/icon
                } else {
                    themeSwitcherButton.style.backgroundColor = '#adb5bd'; // Light gray for light theme
                    themeSwitcherButton.style.color = '#212529'; // Dark text/icon
                }
                updateButtonIcon(theme); // Update the button's icon
            }

            // 3. Function to update the button's icon
            function updateButtonIcon(currentTheme) {
                themeSwitcherButton.textContent = currentTheme === 'dark' ? DARK_ICON : LIGHT_ICON;
            }

            // 4. Initialize the theme when the page loads
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme) {
                setTheme(savedTheme); // Set the saved theme
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                // If the user prefers dark theme in OS settings
                setTheme('dark');
            } else {
                setTheme('light'); // Default to light theme
            }

            // 5. Add a click event listener to the button
            themeSwitcherButton.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-bs-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
            });
        })();