/**
 * @file This script manages Bootstrap tab functionality, including
 * activation based on URL hash and updating the hash when tabs change.
 */

/* opens external links */
document.addEventListener("DOMContentLoaded", function () {
  function activateTabFromHash() {
    const hash = window.location.hash;
    if (hash) {
      // Find the trigger element by href or data-bs-target
      const triggerEl = document.querySelector(
        `a[href="${hash}"], [data-bs-target="${hash}"]`
      );
      if (triggerEl) {
        const tab = new bootstrap.Tab(triggerEl);
        tab.show();
      }
    }
  }

  // Activate the tab on load if there is a hash
  activateTabFromHash();

  // Activate the tab when the hash changes
  window.addEventListener("hashchange", activateTabFromHash);

  // Update the hash when a tab is shown to support shareability
  document.querySelectorAll('[data-bs-toggle="tab"]').forEach(function (el) {
    el.addEventListener("shown.bs.tab", function (event) {
      const target =
        event.target.getAttribute("data-bs-target") ||
        event.target.getAttribute("href");
      window.location.hash = target;
    });
  });
});

/* open click links */
// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Select all <a> elements with the class 'account-card'
  const links = document.querySelectorAll("a.account-card");

  // Iterate over each link to attach a click event listener
  links.forEach((link) => {
    // Add click event listener to override default behavior
    link.addEventListener("click", (event) => {
      // Prevent the default tab toggle behavior
      event.preventDefault();
      // Get the href attribute value of the clicked link
      const href = link.getAttribute("href");
      // Check if href exists and is a fragment identifier (starts with #)
      if (href && href.startsWith("#")) {
        // Navigate to the href as a regular URL
        window.location.href = href;
      }
    });
  });
});
