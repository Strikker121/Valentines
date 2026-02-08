// ===== OPTIONS =====
const ENABLE_POP_SOUND = true;
const ENABLE_MOVE_SOUND = true;
const moveSounds = ["whoosh1.mp4","whoosh2.mp4","whoosh3.mp4","whoosh4.mp4"];

// ===== AUDIO UNLOCK =====
let audioUnlocked = false;
function unlockAudio() {
  if (audioUnlocked) return;
  const s = new Audio("pop.mp3");
  s.volume = 0;
  s.play().then(()=> audioUnlocked = true).catch(()=>{});
}
document.addEventListener("click", unlockAudio);
document.addEventListener("touchstart", unlockAudio);

// ===== PAGE NAV =====
function next() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "flex";
}
function next2() {
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "flex";
}

// ===== LOAD MEMORIES HTML =====
function loadMemories() {
  fetch("memories.html")
    .then(response => response.text())
    .then(html => {
      const memSection = document.getElementById("memoriesSection");
      memSection.innerHTML = html;
      document.getElementById("page3").style.display = "none";
      memSection.style.display = "flex";
      // Attach back button event
      const backBtn = memSection.querySelector("button");
      backBtn.addEventListener("click", closeMemories);
    });
}
function closeMemories() {
  document.getElementById("memoriesSection").style.display = "none";
  document.getElementById("page3").style.display = "flex";
}

// ===== HEARTS =====
const heartsContainer = document.querySelector('.hearts');
function playPop() {
  if (!audioUnlocked || !ENABLE_POP_SOUND) return;
  const sound = new Audio("pop.mp3");
  sound.volume = 0.08 + Math.random()*0.05;
  sound.playbackRate = 0.85 + Math.random()*0.4;
  sound.play().catch(()=>{});
}
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = Math.random()*100 + 'vw';
  const duration = 6 + Math.random()*3;
  heart.style.animationDuration = duration + 's';
  heartsContainer.appendChild(heart);
  heart.addEventListener("animationend", () => {
    heart.classList.add("pop");
    playPop();
    setTimeout(()=>heart.remove(),250);
  });
}
setInterval(createHeart,700);

// ===== YES / NO =====
window.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const responseText = document.getElementById("responseText");
  if (!noBtn || !yesBtn) return;

  yesBtn.addEventListener("click", () => {
    responseText.innerText = "I knew it! 💖 Best decision ever 😌";
    yesBtn.style.transform = "scale(1.15)";
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
  s.volume = 0.12;
  s.playbackRate = 0.9 + Math.random()*0.3;
  s.play().catch(()=>{});
}
