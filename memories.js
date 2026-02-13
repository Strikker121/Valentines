// Wait until page is fully loaded
window.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     MEMORY EXPAND LOGIC
  =============================== */

  const overlay = document.getElementById("memoryOverlay");
  const memoryCards = document.querySelectorAll(".memory-box");
  const memoriesContainer = document.querySelector(".memories-container");

  memoryCards.forEach(card => {

    card.addEventListener("click", () => {

      const isActive = card.classList.contains("active");

      // Reset all cards
      memoryCards.forEach(c => c.classList.remove("active"));
      overlay.classList.remove("show");
      memoriesContainer.classList.remove("dim");

      // Activate clicked card
      if (!isActive) {
        card.classList.add("active");
        overlay.classList.add("show");
        memoriesContainer.classList.add("dim");
      }

    });

  });

  // Close when clicking overlay
  overlay.addEventListener("click", () => {
    memoryCards.forEach(c => c.classList.remove("active"));
    overlay.classList.remove("show");
    memoriesContainer.classList.remove("dim");
  });


  /* ===============================
     FADE-IN ANIMATION ON LOAD
  =============================== */

  memoryCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.6s ease";

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 200);
  });


  /* ===============================
     SPARKLE TRAIL EFFECT
  =============================== */

  const sparklesContainer = document.querySelector(".sparkles");

  function createSparkle(x, y) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";

    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";

    sparkle.style.width = 6 + Math.random() * 6 + "px";
    sparkle.style.height = sparkle.style.width;

    sparkle.style.position = "absolute";
    sparkle.style.pointerEvents = "none";

    sparkle.style.animation =
      `sparkleAnim ${1 + Math.random()}s ease-out forwards`;

    sparklesContainer.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1500);
  }

  // Desktop mouse sparkle
  document.addEventListener("mousemove", e => {
    createSparkle(e.clientX, e.clientY);
  });

  // Mobile touch sparkle
  document.addEventListener("touchmove", e => {
    for (let touch of e.touches) {
      createSparkle(touch.clientX, touch.clientY);
    }
  });

});
