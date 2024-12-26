// API simulation functions
function getMaxPrice() {
  // Simulated API request
  return 1000;
}

function getMinPrice() {
  // Simulated API request
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

// Handle mouse movement for slider thumbs
function mouseMoveHandler(event, thumb, direction) {
  const sliderTrackRect = sliderTrack.getBoundingClientRect();
  let newPosition =
    ((event.clientX - sliderTrackRect.left) / sliderTrackRect.width) * 100;

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

// Attach mouse events to slider thumbs
function attachMouseHandlers(thumb, direction) {
  thumb.onmousedown = (event) => {
    event.preventDefault();
    document.onmousemove = (e) => mouseMoveHandler(e, thumb, direction);
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}

attachMouseHandlers(sliderThumbLeft, "left");
attachMouseHandlers(sliderThumbRight, "right");

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

    if (!isValidRange(type, value, comparisonValue)) return;

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
}

handleInput(inputLeft, sliderThumbLeft, "min");
handleInput(inputRight, sliderThumbRight, "max");

// Initialize slider
updateSlider();
