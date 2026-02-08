window.addEventListener("DOMContentLoaded", () => {

  const heartsContainer = document.querySelector('.hearts');

  function playPop() {
  const sound = new Audio("pop.mp3");

  // Softer volume (romantic, not gunshot 💀)
  sound.volume = 0.15 + Math.random() * 0.15;  // 0.15 – 0.30

  // Pitch variation
  sound.playbackRate = 0.85 + Math.random() * 0.4; // 0.85 – 1.25

  sound.play().catch(()=>{});
}


  function createHeart() {
    if (!heartsContainer) return;

    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';

    const duration = 5 + Math.random() * 3;
    heart.style.animation = `floatUp ${duration}s linear forwards`;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.classList.add('pop');
      playPop();
      setTimeout(() => heart.remove(), 300);
    }, duration * 1000 - 300);
  }

  setInterval(createHeart, 700);

  // Page navigation
  window.next = function() {
    document.querySelector(".section").style.display = "none";
    document.getElementById("page2").style.display = "flex";
  }

  window.next2 = function() {
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "flex";
  }

  window.surprise = function() {
    document.getElementById("page3").style.display = "none";
    document.getElementById("final").style.display = "flex";
  }

});
