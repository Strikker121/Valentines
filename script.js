const heartsContainer = document.querySelector('.hearts');
let audioUnlocked = false;

// Unlock audio
function unlockAudio() {
  if (audioUnlocked) return;
  const s = new Audio("pop.mp3");
  s.volume = 0;
  s.play().then(()=> audioUnlocked = true).catch(()=>{});
}
document.addEventListener("click", unlockAudio);
document.addEventListener("touchstart", unlockAudio);

// Page navigation
function next() {
  document.getElementById("page1").style.display = "none";
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

// Pop sound
function playPop() {
  if (!audioUnlocked) return;
  const sound = new Audio("pop.mp3");
  sound.volume = 0.12 + Math.random() * 0.12;
  sound.playbackRate = 0.8 + Math.random() * 0.5;
  sound.play().catch(()=>{});
}

// Create heart
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = Math.random() * 100 + 'vw';

  const duration = 6 + Math.random() * 3;
  heart.style.animationDuration = duration + 's';

  heartsContainer.appendChild(heart);

  // POP WHEN IT REACHES TOP
  setTimeout(() => {
    heart.classList.add('pop');
    playPop();
    setTimeout(() => heart.remove(), 250);
  }, duration * 1000 - 250);
}

setInterval(createHeart, 700);
