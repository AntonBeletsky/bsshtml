/*
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
*/

/*


document.addEventListener("DOMContentLoaded", () => {
  const stickyElement = document.querySelector(
    ".products_compare_table tr.stickyElement"
  );

  if (!stickyElement) return; // Exit if the sticky element is not found

  const offsetTop = stickyElement.offsetTop; // Initial position of the sticky element
  let isStuck = false; // Current sticky state

  // Function to handle scroll logic
  const handleScroll = () => {
    const shouldBeStuck = window.scrollY >= offsetTop;

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
*/

/*
document.addEventListener("DOMContentLoaded", () => {
  // Находим элемент с классом "stickyElement" внутри строки таблицы в таблице с классом "products_compare_table"
  const stickyElement = document.querySelector(
    ".products_compare_table tr.stickyElement"
  );

  // Если элемент не найден, выходим из функции, дальнейший код не выполняется
  if (!stickyElement) return;

  // Получаем начальное положение элемента относительно верхней границы страницы
  const offsetTop = stickyElement.offsetTop;
  // Переменная для отслеживания текущего состояния "прилипший/неприлипший"
  let isStuck = false;

  // Функция, которая обрабатывает логику "прилипания" элемента при прокрутке
  const handleScroll = () => {
    // Проверяем, находится ли текущая прокрутка ниже начального положения элемента
    const shouldBeStuck = window.scrollY >= offsetTop;

    // Если состояние изменилось, обновляем класс и переменную состояния
    if (shouldBeStuck !== isStuck) {
      // Добавляем или удаляем класс "stuck" в зависимости от состояния
      stickyElement.classList.toggle("stuck", shouldBeStuck);
      // Обновляем состояние "прилипший/неприлипший"
      isStuck = shouldBeStuck;
    }
  };

  // Оптимизация обработчика прокрутки с использованием requestAnimationFrame
  let isThrottled = false;
  const throttledScrollHandler = () => {
    // Если обработчик уже выполняется, выходим
    if (isThrottled) return;
    isThrottled = true;

    // Запускаем обработку с помощью requestAnimationFrame
    requestAnimationFrame(() => {
      handleScroll(); // Вызываем основную логику прокрутки
      isThrottled = false; // Сбрасываем состояние "занятости"
    });
  };

  // Добавляем обработчик прокрутки окна, используя оптимизированную функцию
  window.addEventListener("scroll", throttledScrollHandler);
});
*/

document.addEventListener("DOMContentLoaded", () => {
  const stickyElement = document.querySelector(
    ".products_compare_table tr.stickyElement"
  );

  if (!stickyElement) return;

  const offsetTop = stickyElement.offsetTop;
  let isStuck = false;
  const hysteresis = 35; // Граничная зона в пикселях

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    // Добавляем граничную зону, чтобы избежать частого переключения
    const shouldBeStuck =
      currentScroll >= offsetTop + (isStuck ? -hysteresis : hysteresis);

    if (shouldBeStuck !== isStuck) {
      stickyElement.classList.toggle("stuck", shouldBeStuck);
      isStuck = shouldBeStuck;
    }
  };

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
