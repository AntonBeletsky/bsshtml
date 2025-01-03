// API simulation functions
function getMaxPrice() {
  return 1000;
}

function getMinPrice() {
  return 0;
}

// Constants
const minPrice = getMinPrice();
const maxPrice = getMaxPrice();
const priceRange = maxPrice - minPrice;

// DOM Elements
const sliderThumbLeft = document.getElementById("slider-thumb-left");
const sliderThumbRight = document.getElementById("slider-thumb-right");
const sliderTrack = document.getElementById("slider-track");
const sliderRange = document.getElementById("slider-range");
const inputLeft = document.getElementById("input-left");
const inputRight = document.getElementById("input-right");

// Update slider visuals and inputs
function updateSlider() {
  const leftValue = parseFloat(sliderThumbLeft.style.left) || 0;
  const rightValue = parseFloat(sliderThumbRight.style.left) || 100;

  const minValue = minPrice + Math.round((priceRange * leftValue) / 100);
  const maxValue = minPrice + Math.round((priceRange * rightValue) / 100);

  inputLeft.value = minValue;
  inputRight.value = maxValue;

  sliderRange.style.left = `${leftValue}%`;
  sliderRange.style.width = `${rightValue - leftValue}%`;
}

// Handle movement for slider thumbs (mouse or touch)
function moveHandler(event, thumb, direction) {
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const sliderTrackRect = sliderTrack.getBoundingClientRect();
  let newPosition =
    ((clientX - sliderTrackRect.left) / sliderTrackRect.width) * 100;

  newPosition = Math.max(0, Math.min(100, newPosition));

  if (
    direction === "left" &&
    newPosition >= parseFloat(sliderThumbRight.style.left)
  )
    return;
  if (
    direction === "right" &&
    newPosition <= parseFloat(sliderThumbLeft.style.left)
  )
    return;

  thumb.style.left = `${newPosition}%`;
  updateSlider();
}

// Attach mouse and touch events to slider thumbs
function attachHandlers(thumb, direction) {
  // Mouse events
  thumb.onmousedown = (event) => {
    event.preventDefault();
    document.onmousemove = (e) => moveHandler(e, thumb, direction);
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  // Touch events
  thumb.ontouchstart = (event) => {
    event.preventDefault();
    document.ontouchmove = (e) => moveHandler(e, thumb, direction);
    document.ontouchend = () => {
      document.ontouchmove = null;
      document.ontouchend = null;
    };
  };
}

attachHandlers(sliderThumbLeft, "left");
attachHandlers(sliderThumbRight, "right");

// Validate input values
function isValidRange(type, value, comparisonValue) {
  if (isNaN(value) || value < minPrice || value > maxPrice) return false;

  if (type === "min" && value >= comparisonValue) return false;
  if (type === "max" && value <= comparisonValue) return false;

  return true;
}

// Handle input events for manual value changes
function handleInput(input, thumb, type) {
  input.addEventListener("input", (event) => {
    const value = parseInt(event.target.value, 10);
    const comparisonValue =
      type === "min"
        ? parseInt(inputRight.value, 10)
        : parseInt(inputLeft.value, 10);

    // Allow independent input but show visual feedback for invalid input
    if (!isValidRange(type, value, comparisonValue)) {
      input.classList.add("error"); // Add error styling
      return;
    }
    input.classList.remove("error"); // Remove error styling

    const newPosition = ((value - minPrice) / priceRange) * 100;
    const otherThumbPosition = parseFloat(
      type === "min" ? sliderThumbRight.style.left : sliderThumbLeft.style.left
    );

    if (
      (type === "min" && newPosition < otherThumbPosition) ||
      (type === "max" && newPosition > otherThumbPosition)
    ) {
      thumb.style.left = `${newPosition}%`;
      updateSlider();
    }
  });

  input.addEventListener("blur", () => {
    if (input.classList.contains("error")) {
      // Reset to current thumb value on invalid input
      const thumbPosition =
        parseFloat(thumb.style.left) || (type === "min" ? 0 : 100);
      input.value = minPrice + Math.round((priceRange * thumbPosition) / 100);
      input.classList.remove("error");
    }
  });
}

handleInput(inputLeft, sliderThumbLeft, "min");
handleInput(inputRight, sliderThumbRight, "max");

// Initialize slider
updateSlider();
