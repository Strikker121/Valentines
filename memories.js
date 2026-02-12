// Memory data
const memories = [
  {
    img: "photos/pic1.jpg",
    text: "The day we met and everything changed 💫"
  },
  {
    img: "photos/pic2.jpg",
    text: "Our first photo together ❤️"
  },
  {
    img: "photos/pic3.jpg",
    text: "Laughing at nothing but loving everything 😌"
  }
];

// Get timeline container
const timeline = document.getElementById("timeline");

// Dynamically create memory boxes
memories.forEach(m => {
  const div = document.createElement("div");
  div.className = "memory";

  div.innerHTML = `
    <img src="${m.img}">
    <div class="memory-text">${m.text}</div>
  `;

  timeline.appendChild(div);
});

// Optional: goBack function (can be used for a button)
function goBack() {
  window.location.href = "index.html";
}

// Wait until DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  const memoryBoxes = document.querySelectorAll('.memory, .memory-box');

  // --- Fade-up on scroll using IntersectionObserver ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = 1;
      }
    });
  }, { threshold: 0.1 });

  memoryBoxes.forEach(m => {
    // Initial state for animation
    m.style.transform = 'translateY(20px)';
    m.style.opacity = 0;
    m.style.transition = 'all 0.6s ease-out';

    observer.observe(m);

    // Tap bounce for mobile
    m.addEventListener('touchstart', () => {
      m.style.transform = 'scale(1.05)';
      setTimeout(() => m.style.transform = '', 200);
    });
  });

  // --- Sparkle Trail Effect ---
  const sparklesContainer = document.querySelector('.sparkles');

  function createSparkleAt(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = 8 + Math.random() * 4 + 'px';
    sparkle.style.height = 8 + Math.random() * 4 + 'px';
    sparkle.style.background = 'rgba(255,255,255,0.8)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.position = 'absolute';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = `sparkleAnim ${1 + Math.random() * 1}s ease-out forwards`;
    sparklesContainer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
  }

  // Mouse trail for PC
  document.addEventListener('mousemove', e => createSparkleAt(e.clientX, e.clientY));

  // Finger trail for mobile
  document.addEventListener('touchmove', e => {
    for (const touch of e.touches) {
      createSparkleAt(touch.clientX, touch.clientY);
    }
  });

  /* ===== Memory Expand Logic ===== */

const overlay = document.getElementById("memoryOverlay");
const memoryCards = document.querySelectorAll(".memory, .memory-box");
const memoriesContainer = document.querySelector(".memories-container");
const timelineContainer = document.querySelector(".timeline");

memoryCards.forEach(card=>{
  card.addEventListener("click", ()=>{
    const isActive = card.classList.contains("active");

    // reset all
    memoryCards.forEach(c=>c.classList.remove("active"));
    overlay.classList.remove("show");
    memoriesContainer?.classList.remove("dim");
    timelineContainer?.classList.remove("dim");

    // activate clicked
    if(!isActive){
      card.classList.add("active");
      overlay.classList.add("show");
      memoriesContainer?.classList.add("dim");
      timelineContainer?.classList.add("dim");
    }
  });
});

overlay.addEventListener("click", ()=>{
  memoryCards.forEach(c=>c.classList.remove("active"));
  overlay.classList.remove("show");
  memoriesContainer?.classList.remove("dim");
  timelineContainer?.classList.remove("dim");
});

});

function initMemoryExpand(){
  const overlay = document.getElementById("memoryOverlay");
  const memoryCards = document.querySelectorAll(".memory, .memory-box");
  const memoriesContainer = document.querySelector(".memories-container");
  const timelineContainer = document.querySelector(".timeline");

  memoryCards.forEach(card=>{
    card.addEventListener("click", ()=>{
      const isActive = card.classList.contains("active");

      memoryCards.forEach(c=>c.classList.remove("active"));
      overlay.classList.remove("show");
      memoriesContainer?.classList.remove("dim");
      timelineContainer?.classList.remove("dim");

      if(!isActive){
        card.classList.add("active");
        overlay.classList.add("show");
        memoriesContainer?.classList.add("dim");
        timelineContainer?.classList.add("dim");
      }
    });
  });

  overlay.addEventListener("click", ()=>{
    memoryCards.forEach(c=>c.classList.remove("active"));
    overlay.classList.remove("show");
    memoriesContainer?.classList.remove("dim");
    timelineContainer?.classList.remove("dim");
  });
}

