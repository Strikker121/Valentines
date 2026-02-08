// ===== OPTIONS =====
const ENABLE_POP_SOUND = true;
const ENABLE_MOVE_SOUND = true;
const ENABLE_MUSIC = true;

// ===== SOUND FILES =====
const moveSounds = ["whoosh1.mp4","whoosh2.mp4","whoosh3.mp4","whoosh4.mp4"];

// ===== AUDIO UNLOCK =====
let audioUnlocked = false;
document.addEventListener("click", unlockAudio);
document.addEventListener("touchstart", unlockAudio);

function unlockAudio() {
  if (audioUnlocked) return;
  const s = new Audio("pop.mp3");
  s.volume = 0;
  s.play().then(()=> {
    audioUnlocked = true;
    if (ENABLE_MUSIC) document.getElementById("bgMusic").play().catch(()=>{});
  }).catch(()=>{});
}

// ===== PAGE NAV =====
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

// ===== HEARTS =====
const heartsContainer = document.querySelector('.hearts');

function playPop() {
  if (!audioUnlocked || !ENABLE_POP_SOUND) return;
  const sound = new Audio("pop.mp3");
  sound.volume = 0.1;
  sound.play().catch(()=>{});
}

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = Math.random()*100 + 'vw';
  heart.style.animationDuration = (6 + Math.random()*3) + 's';
  heartsContainer.appendChild(heart);

  heart.addEventListener("animationend", () => {
    playPop();
    heart.remove();
  });
}
setInterval(createHeart, 700);

// ===== YES / NO BUTTON =====
window.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const responseText = document.getElementById("responseText");

  yesBtn.addEventListener("click", () => {
    responseText.innerText = "I knew it! 💖 Best decision ever 😌";
    yesBtn.style.transform = "scale(1.2)";
    setTimeout(()=> yesBtn.style.transform = "scale(1)", 300);
  });

  function moveNoButton() {
    const padding = 20;
    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;
    const maxX = window.innerWidth - btnW - padding;
    const maxY = window.innerHeight - btnH - padding;
    const yesRect = yesBtn.getBoundingClientRect();

    let newX, newY, tries = 0;
    do {
      newX = Math.random()*maxX;
      newY = Math.random()*maxY;
      tries++;
    } while (
      newX < yesRect.right &&
      newX + btnW > yesRect.left &&
      newY < yesRect.bottom &&
      newY + btnH > yesRect.top &&
      tries < 50
    );

    noBtn.style.left = newX + "px";
    noBtn.style.top = newY + "px";
    playMoveSound();
  }

  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("touchstart", moveNoButton);
});

function playMoveSound() {
  if (!audioUnlocked || !ENABLE_MOVE_SOUND) return;
  const src = moveSounds[Math.floor(Math.random()*moveSounds.length)];
  const s = new Audio(src);
  s.volume = 0.15;
  s.play().catch(()=>{});
}
