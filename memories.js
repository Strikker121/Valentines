function initMemories() {

  const overlay = document.getElementById("memoryOverlay");
  const memoryCards = document.querySelectorAll(".memory-box");
  const memoriesContainer = document.querySelector(".memories-container");

  if (!overlay || memoryCards.length === 0) return;

  memoryCards.forEach(card => {
    card.addEventListener("click", () => {

      const isActive = card.classList.contains("active");

      memoryCards.forEach(c => c.classList.remove("active"));
      overlay.classList.remove("show");
      memoriesContainer.classList.remove("dim");

      if (!isActive) {
        card.classList.add("active");
        overlay.classList.add("show");
        memoriesContainer.classList.add("dim");
      }

    });
  });

  overlay.addEventListener("click", () => {
    memoryCards.forEach(c => c.classList.remove("active"));
    overlay.classList.remove("show");
    memoriesContainer.classList.remove("dim");
  });

  console.log("Memories initialized");
}
