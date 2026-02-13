function initMemories() {

  const overlay = document.getElementById("memoryOverlay");
  const memoryCards = document.querySelectorAll(".memory-box");

  if (!overlay || memoryCards.length === 0) {
    console.log("Memories not found");
    return;
  }

  memoryCards.forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");

      overlay.innerHTML = `<img src="${img.src}" />`;
      overlay.classList.add("active");
    });
  });

  overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
    overlay.innerHTML = "";
  });

  console.log("Memories initialized");
}
