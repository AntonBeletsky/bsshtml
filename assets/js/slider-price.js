function getMaxPrice() {
  /* you request to API here */
  const maxPrice = 1000;
  return maxPrice;
}

function getMinPrice() {
  /* you request to API here */
  const minPrice = 0;
  return minPrice;
}

const minPrice = getMinPrice();
const maxPrice = getMaxPrice();

const range = maxPrice - minPrice;

const sliderThumbLeft = document.getElementById("slider-thumb-left");
const sliderThumbRight = document.getElementById("slider-thumb-right");
const sliderTrack = document.getElementById("slider-track");
const sliderRange = document.getElementById("slider-range");

const priceMin = document.getElementById("price-min");
const priceMax = document.getElementById("price-max");

const inputMin = document.getElementById("input-min");
const inputMax = document.getElementById("input-max");

/*
const left_output = document.querySelector("#slider-thumb-left output");
const rigth_output = document.querySelector("#slider-thumb-right output");
*/

function updateSlider() {
  const leftValue = parseFloat(sliderThumbLeft.style.left);
  const rightValue = parseFloat(sliderThumbRight.style.left);
  const minValue = minPrice + Math.round((range * leftValue) / 100);
  const maxValue = minPrice + Math.round((range * rightValue) / 100);

  sliderRange.style.left = leftValue + "%";
  sliderRange.style.width = rightValue - leftValue + "%";

  priceMin.textContent = `$${minValue}`;
  priceMax.textContent = `$${maxValue}`;

  inputMin.value = `${minValue}`;
  inputMax.value = `${maxValue}`;

  /*
  left_output.textContent = `$${minValue}`;
  rigth_output.textContent = `$${maxValue}`;
  */
}

function mouseMoveHandler(event, thumb, direction) {
  const sliderTrackRect = sliderTrack.getBoundingClientRect();
  let newPos =
    ((event.clientX - sliderTrackRect.left) / sliderTrackRect.width) * 100;

  if (newPos < 0) newPos = 0;
  if (newPos > 100) newPos = 100;
  if (direction === "left" && newPos >= parseFloat(sliderThumbRight.style.left))
    return;
  if (direction === "right" && newPos <= parseFloat(sliderThumbLeft.style.left))
    return;

  thumb.style.left = newPos + "%";
  updateSlider();
}

sliderThumbLeft.onmousedown = function (event) {
  event.preventDefault();
  document.onmousemove = function (event) {
    mouseMoveHandler(event, sliderThumbLeft, "left");
  };
  document.onmouseup = function () {
    document.onmousemove = null;
    document.onmouseup = null;
  };
};

sliderThumbRight.onmousedown = function (event) {
  event.preventDefault();
  document.onmousemove = function (event) {
    mouseMoveHandler(event, sliderThumbRight, "right");
  };
  document.onmouseup = function () {
    document.onmousemove = null;
    document.onmouseup = null;
  };
};

updateSlider(); // Initial update

inputMin.addEventListener("input", (event) => {
  priceMin.textContent = event.target.value;
  /* здесь нужно добавить такой код который переместит ползунки наоборот */
});

inputMax.addEventListener("input", (event) => {
  priceMax.textContent = event.target.value;
  /* здесь нужно добавить такой код который переместит ползунки наоборот */
});

inputMin.addEventListener("input", (event) => {
  let value = parseInt(event.target.value, 10);

  // if (isNaN(value) || value < minPrice) value = minPrice;

  // if (value > maxPrice) value = maxPrice;

  const newLeft = ((value - minPrice) / range) * 100;

  if (newLeft < parseFloat(sliderThumbRight.style.left)) {
    sliderThumbLeft.style.left = `${newLeft}%`;
    updateSlider();
  }
});

inputMax.addEventListener("input", (event) => {
  let value = parseInt(event.target.value, 10);

  // if (isNaN(value) || value < minPrice) value = minPrice;

  // if (value > maxPrice) value = maxPrice;

  const newRight = ((value - minPrice) / range) * 100;

  if (newRight > parseFloat(sliderThumbLeft.style.left)) {
    sliderThumbRight.style.left = `${newRight}%`;
    updateSlider();
  }
});
