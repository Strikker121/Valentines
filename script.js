let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;

  const silentSound = new Audio("pop.mp3");
  silentSound.volume = 0;
  silentSound.play().then(() => {
    audioUnlocked = true;
  }).catch(()=>{});
}

// Unlock on ANY interaction
document.addEventListener("click", unlockAudio);
document.addEventListener("touchstart", unlockAudio);


window.addEventListener("DOMContentLoaded", () => {

  const heartsContainer = document.querySelector('.hearts');

  function playPop() {
  if (!audioUnlocked) return; // prevents blocked error

  const sound = new Audio("pop.mp3");
  sound.volume = 0.15 + Math.random() * 0.15;
  sound.playbackRate = 0.85 + Math.random() * 0.4;
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
