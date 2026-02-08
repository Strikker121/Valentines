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

const timeline = document.getElementById("timeline");

memories.forEach(m => {
  const div = document.createElement("div");
  div.className = "memory";

  div.innerHTML = `
    <img src="${m.img}">
    <div class="memory-text">${m.text}</div>
  `;

  timeline.appendChild(div);
});

function goBack() {
  window.location.href = "index.html";
}

window.addEventListener('DOMContentLoaded', () => {
  const memories = document.querySelectorAll('.memory');

  // IntersectionObserver for fade-up on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = 1;
      }
    });
  }, { threshold: 0.1 });

  memories.forEach(m => {
    m.style.transform = 'translateY(20px)';
    m.style.opacity = 0;
    m.style.transition = 'all 0.6s ease-out';
    observer.observe(m);

    // Tap bounce effect for mobile
    m.addEventListener('touchstart', () => {
      m.style.transform = 'scale(1.05)';
      setTimeout(() => m.style.transform = '', 200);
    });
  });
});
