document.addEventListener("DOMContentLoaded", function () {
  // --- Logic for interactive stars in "Your Review" modal form ---
  const modalRatingStars = document.getElementById("modalRatingStars");
  const selectedModalRatingInput = document.getElementById(
    "selectedModalRating"
  );
  let currentModalRating = 0; // Separate state for modal stars

  // Function to update star display based on a given rating
  function updateStars(starsContainer, selectedRating) {
    Array.from(starsContainer.children).forEach((star) => {
      const starRating = parseInt(star.dataset.rating);
      if (starRating <= selectedRating) {
        star.classList.remove("fa-regular");
        star.classList.add("fa-solid", "active");
      } else {
        star.classList.remove("fa-solid", "active");
        star.classList.add("fa-regular");
      }
    });
  }

  modalRatingStars.addEventListener("mouseover", function (e) {
    if (e.target.classList.contains("fa-star")) {
      const hoverRating = parseInt(e.target.dataset.rating);
      Array.from(modalRatingStars.children).forEach((star) => {
        const starRating = parseInt(star.dataset.rating);
        if (starRating <= hoverRating) {
          star.classList.remove("fa-regular", "active"); // Remove active on hover to show hover effect
          star.classList.add("fa-solid", "hover-effect");
        } else if (starRating > currentModalRating) {
          // Only set regular if greater than current selected and not hover
          star.classList.remove("fa-solid", "hover-effect", "active");
          star.classList.add("fa-regular");
        }
      });
    }
  });

  modalRatingStars.addEventListener("mouseout", function () {
    updateStars(modalRatingStars, currentModalRating); // Revert to selected rating on mouseout
    Array.from(modalRatingStars.children).forEach((star) => {
      star.classList.remove("hover-effect"); // Remove hover effect
    });
  });

  modalRatingStars.addEventListener("click", function (e) {
    if (e.target.classList.contains("fa-star")) {
      currentModalRating = parseInt(e.target.dataset.rating);
      selectedModalRatingInput.value = currentModalRating;
      updateStars(modalRatingStars, currentModalRating);

      // Remove validation feedback immediately on click if valid
      if (currentModalRating > 0) {
        selectedModalRatingInput.classList.remove("is-invalid");
        selectedModalRatingInput.nextElementSibling.style.display = "none";
      }
    }
  });

  // --- Logic for photo previews in review modal form ---
  const reviewPhotosModalInput = document.getElementById("reviewPhotosModal");
  const photoPreviewModalContainer =
    document.getElementById("photoPreviewModal");

  reviewPhotosModalInput.addEventListener("change", function (e) {
    photoPreviewModalContainer.innerHTML = ""; // Clear previous previews
    const files = e.target.files;
    if (files.length > 5) {
      alert("You can upload a maximum of 5 photos.");
      e.target.value = ""; // Reset selected files
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.classList.add("review-photo-preview");
          photoPreviewModalContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });
  });

  // --- Logic for "Helpful" button ---
  document.querySelectorAll(".helpful-btn").forEach((button) => {
    button.addEventListener("click", function () {
      // In a real application, this would be an AJAX request to the server
      // to record the "vote" and update the count.
      const helpfulCountSpan = this.querySelector(".helpful-count");
      let currentCount = parseInt(helpfulCountSpan.textContent);

      if (!this.classList.contains("active-helpful")) {
        currentCount++;
        this.classList.add("active-helpful");
        this.querySelector(".fa-thumbs-up").classList.remove("fa-regular");
        this.querySelector(".fa-thumbs-up").classList.add("fa-solid");
      } else {
        currentCount--;
        this.classList.remove("active-helpful");
        this.querySelector(".fa-thumbs-up").classList.remove("fa-solid");
        this.querySelector(".fa-thumbs-up").classList.add("fa-regular");
      }
      helpfulCountSpan.textContent = currentCount;
    });
  });

  // --- Logic for "Report Abuse" button ---
  document.querySelectorAll(".report-abuse-btn").forEach((button) => {
    button.addEventListener("click", function () {
      alert('The "Report Abuse" feature will be implemented here.');
    });
  });

  // --- Logic for submitting the review modal form ---
  const submitReviewModalBtn = document.getElementById("submitReviewModalBtn");
  const reviewTextModal = document.getElementById("reviewTextModal");

  submitReviewModalBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default form submission

    const rating = selectedModalRatingInput.value;
    const reviewTitle = document.getElementById("reviewTitle").value;
    const reviewText = reviewTextModal.value;
    const reviewPhotos = reviewPhotosModalInput.files;

    let isValid = true;

    // Validation for rating
    if (rating === "0") {
      selectedModalRatingInput.classList.add("is-invalid");
      selectedModalRatingInput.nextElementSibling.style.display = "block"; // Show invalid feedback
      isValid = false;
    } else {
      selectedModalRatingInput.classList.remove("is-invalid");
      selectedModalRatingInput.nextElementSibling.style.display = "none";
    }

    // Validation for review text
    if (!reviewText.trim()) {
      reviewTextModal.classList.add("is-invalid");
      isValid = false;
    } else {
      reviewTextModal.classList.remove("is-invalid");
    }

    if (!isValid) {
      // If there are validation errors, stop here
      return;
    }

    // In a real application, this would be an AJAX request (fetch API or XMLHttpRequest)
    // to send review data (rating, title, text, photos) to the server.
    console.log(
      `Review submitted (demo only):\nRating: ${rating} stars\nTitle: "${reviewTitle}"\nText: "${reviewText}"\nPhotos: ${reviewPhotos.length} pcs.`
    );
    alert(`Review submitted successfully! (Demo)`);

    // Clear the form and close modal (for demo)
    document.getElementById("reviewForm").reset(); // Reset form fields
    selectedModalRatingInput.value = "0";
    currentModalRating = 0; // Reset star state
    updateStars(modalRatingStars, 0); // Reset stars display
    photoPreviewModalContainer.innerHTML = "";

    // Remove any validation classes after successful submission
    reviewTextModal.classList.remove("is-invalid");

    const reviewModal = bootstrap.Modal.getInstance(
      document.getElementById("reviewModal")
    );
    if (reviewModal) {
      reviewModal.hide();
    }
  });

  // Event listener to reset form validation when modal is hidden
  const reviewModalElement = document.getElementById("reviewModal");
  reviewModalElement.addEventListener("hidden.bs.modal", function () {
    document.getElementById("reviewForm").reset();
    selectedModalRatingInput.value = "0";
    currentModalRating = 0;
    updateStars(modalRatingStars, 0);
    photoPreviewModalContainer.innerHTML = "";
    reviewTextModal.classList.remove("is-invalid", "is-valid");
    selectedModalRatingInput.classList.remove("is-invalid");
    selectedModalRatingInput.nextElementSibling.style.display = "none";
  });

  // --- Logic for Filters and Sorting (for demonstration only) ---
  // In a real application, this would reload reviews from the server
  document
    .querySelectorAll(
      "#dropdownFilter .dropdown-item, #dropdownSort .dropdown-item"
    )
    .forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        const parentDropdownToggle =
          this.closest(".dropdown").querySelector(".dropdown-toggle");
        let selectedOptionText = this.textContent;

        // For sorting, update the button text
        if (this.closest(".dropdown").id === "dropdownSort") {
          parentDropdownToggle.textContent = `Sort by: ${selectedOptionText}`;
        } else if (this.closest(".dropdown").id === "dropdownFilter") {
          // For filters, you might want to show which filter is active
          // Or change the button text to reflect the filter if only one can be active
          // For now, we'll just keep "Filters"
        }

        // Here, you would implement the logic to send a request to the server
        // or filter/sort reviews on the client (if all reviews are loaded).
        // Example of getting parameters:
        const filterRating = this.dataset.filterRating;
        const filterPhotos = this.dataset.filterPhotos;
        const filterVerified = this.dataset.filterVerified;
        const filterClear = this.dataset.filterClear;
        const sortBy = this.dataset.sort;

        if (filterClear) {
          console.log("Demo: Filters cleared!");
          alert("Demo: Filters cleared!");
          document.getElementById("dropdownFilter").textContent = "Filters"; // Reset filter button text
        } else if (filterRating) {
          console.log("Filter by rating:", filterRating);
          alert(`Demo: Filter reviews by ${filterRating}`);
        } else if (filterPhotos) {
          console.log("Filter by photos:", filterPhotos);
          alert(`Demo: Filter reviews with photos/videos`);
        } else if (filterVerified) {
          console.log("Filter by verified purchase:", filterVerified);
          alert(`Demo: Filter reviews by verified purchase`);
        } else if (sortBy) {
          console.log("Sort by:", sortBy);
          alert(`Demo: Sort reviews by ${sortBy}`);
        }
      });
    });

  // --- Logic for Replies (demonstration only) ---
  document.querySelectorAll(".collapse .btn-primary").forEach((button) => {
    button.addEventListener("click", function () {
      const replyTextarea = this.previousElementSibling;
      const replyText = replyTextarea.value.trim();

      if (replyText) {
        alert("Demo: Reply submitted: " + replyText);
        replyTextarea.value = "";
        // Dynamically add reply to the appropriate container
        const parentReviewSection = this.closest(".review-section");
        const repliesContainer = parentReviewSection.querySelector(
          '[id^="repliesContainer"]'
        );

        if (repliesContainer) {
          // Generate a random ID for reply photo
          const randomId = Math.floor(Math.random() * 1000) + 1; // ID from 1 to 1000
          const newReplyHtml = `
                            <div class="d-flex align-items-center mb-2 mt-3">
                                <img src="https://picsum.photos/id/${randomId}/30/30" class="rounded-circle me-2" alt="Reply Avatar">
                                <div>
                                    <small class="fw-bold">You (User)</small>
                                    <small class="text-muted d-block">${new Date().toLocaleDateString(
                                      "en-US"
                                    )}</small>
                                </div>
                            </div>
                            <p class="small mb-2 ps-4">
                                ${replyText}
                            </p>
                            <button type="button" class="btn btn-sm btn-link text-danger report-abuse-btn ps-4">
                                Report Abuse
                            </button>
                        `;
          repliesContainer.insertAdjacentHTML("beforeend", newReplyHtml);
        }
        // Close the reply form
        const replyFormCollapse = new bootstrap.Collapse(
          this.closest(".collapse"),
          {
            toggle: false,
          }
        );
        replyFormCollapse.hide();
      } else {
        alert("Please enter your reply text.");
      }
    });
  });
});
