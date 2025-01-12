/*
document.addEventListener("DOMContentLoaded", () => {
  const stickyElement = document.querySelector(
    ".products_compare_table tr.stickyElement"
  );

  const offsetTop = stickyElement.offsetTop;

  window.addEventListener("scroll", () => {
    console.log(
      "window.scrollY = " + window.scrollY,
      "offsetTop = " + offsetTop
    );

    if (window.scrollY >= offsetTop) {
      stickyElement.classList.add("stuck");
    } else {
      stickyElement.classList.remove("stuck");
    }
  });
});
*/

/*
document.addEventListener("DOMContentLoaded", () => {
  const stickyElement = document.querySelector(
    ".products_compare_table tr.stickyElement"
  );

  if (!stickyElement) return;

  const offsetTop = stickyElement.offsetTop;
  let isStuck = false; // Текущее состояние элемента
  let isThrottled = false; // Флаг для throttle обновлений

  const handleScroll = () => {
    if (isThrottled) return;

    isThrottled = true;

    requestAnimationFrame(() => {
      const shouldBeStuck = window.scrollY >= offsetTop;

      if (shouldBeStuck !== isStuck) {
        stickyElement.classList.toggle("stuck", shouldBeStuck);
        isStuck = shouldBeStuck;
      }

      isThrottled = false;
    });
  };

  window.addEventListener("scroll", handleScroll);
});
*/

/*
document.addEventListener("DOMContentLoaded", () => {
  const stickyElement = document.querySelector(
    ".products_compare_table tr.stickyElement"
  );

  if (!stickyElement) return;

  const offsetTop = stickyElement.offsetTop;
  let isStuck = false; // Текущее состояние "прилипания"
  let lastScrollY = window.scrollY; // Последнее значение scrollY

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Если scrollY не изменился, ничего не делаем
    if (currentScrollY === lastScrollY) return;

    lastScrollY = currentScrollY;

    const shouldBeStuck = currentScrollY >= offsetTop;

    // Обновляем класс только если состояние изменилось
    if (shouldBeStuck !== isStuck) {
      stickyElement.classList.toggle("stuck", shouldBeStuck);
      isStuck = shouldBeStuck;
    }
  };

  // Оптимизация через requestAnimationFrame
  let isThrottled = false;
  const throttledScrollHandler = () => {
    if (isThrottled) return;
    isThrottled = true;

    requestAnimationFrame(() => {
      handleScroll();
      isThrottled = false;
    });
  };

  window.addEventListener("scroll", throttledScrollHandler);
});
*/

document.addEventListener("DOMContentLoaded", () => {
  const stickyElement = document.querySelector(
    ".products_compare_table tr.stickyElement"
  );

  // Exit if the sticky element is not found
  if (!stickyElement) return;

  const offsetTop = stickyElement.offsetTop; // Initial position of the sticky element
  let isStuck = false; // Current sticky state
  let lastScrollY = window.scrollY; // Last known scroll position

  // Function to handle scroll logic
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Skip processing if scrollY hasn't changed
    if (currentScrollY === lastScrollY) return;

    lastScrollY = currentScrollY;

    const shouldBeStuck = currentScrollY >= offsetTop;

    // Update the sticky class only if the state changes
    if (shouldBeStuck !== isStuck) {
      stickyElement.classList.toggle("stuck", shouldBeStuck);
      isStuck = shouldBeStuck;
    }
  };

  // Throttling scroll events with requestAnimationFrame
  let isThrottled = false;
  const throttledScrollHandler = () => {
    if (isThrottled) return;
    isThrottled = true;

    requestAnimationFrame(() => {
      handleScroll();
      isThrottled = false;
    });
  };

  // Attach throttled scroll handler to the window scroll event
  window.addEventListener("scroll", throttledScrollHandler);
});
