// Wait until the DOM content is fully loaded before initializing the carousel
document.addEventListener("DOMContentLoaded", function () {
  // Find the carousel element by its ID
  var carouselElement = document.querySelector("#heroCarousel");

  // Check if the element exists before initializing
  if (carouselElement) {
    // Initialize Bootstrap carousel with specific options
    var carousel = new bootstrap.Carousel(carouselElement, {
      interval: 5000, // Time between automatic slide transitions (5 seconds)
      wrap: true, // Allow cycling back to the first slide after the last
    });
  } else {
    /*console.warn('Carousel element with ID "#heroCarousel" was not found.');*/
  }
});
