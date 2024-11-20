/* show all tabs on click all tabs  */
function initializeTabs() {
  const tabs = document.querySelectorAll(".nav-link");
  const allTab = document.querySelector('[href="#all-info"]');
  const allContent = document.querySelectorAll(".tab-pane");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      if (tab === allTab) {
        allContent.forEach((content) => {
          content.classList.add("show", "active");
        });
      } else {
        allContent.forEach((content) => {
          content.classList.remove("show", "active");
        });
        document
          .querySelector(tab.getAttribute("href"))
          .classList.add("show", "active");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initializeTabs);

/* show all tabs on load page */
document.addEventListener("DOMContentLoaded", function () {
  const tabPanes = document.querySelectorAll(".tab-pane");
  tabPanes.forEach((pane) => {
    pane.classList.add("show", "active");
  });
});
