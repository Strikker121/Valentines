const heartsContainer = document.querySelector('.hearts');

function playPop() {
  const sound = new Audio("pop.mp3");
  sound.volume = 0.8 + Math.random() * 0.2;
  sound.playbackRate = 0.9 + Math.random() * 0.2;
  sound.play().catch(()=>{});
}

function createHeart() {
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

function next() {
  document.querySelector(".section").style.display = "none";
  document.getElementById("page2").style.display = "flex";
}

function next2() {
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "flex";
}

function surprise() {
  document.getElementById("page3").style.display = "none";
  document.getElementById("final").style.display = "flex";
}
