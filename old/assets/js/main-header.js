
const header = document.querySelector("header.main-header");

if (header) {
  const headerHeight = header.offsetHeight;
  document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
} else {
    const headerHeight = 0;
  document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
}
