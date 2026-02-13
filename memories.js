function initMemories() {

  const overlay = document.getElementById("memoryOverlay");
  const memoryCards = document.querySelectorAll(".memory-box");

  if (!overlay || memoryCards.length === 0) return;

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


  overlay.addEventListener("click", () => {
    memoryCards.forEach(c => c.classList.remove("active"));
    overlay.classList.remove("active");
    memoriesContainer.classList.remove("dim");
  });

  console.log("Memories initialized");
}
