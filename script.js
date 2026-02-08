// ===== OPTIONS =====
const ENABLE_MUSIC = true;
const ENABLE_SPARKLES = true;
const ENABLE_SLIDESHOW = true;
const ENABLE_POP_SOUND = true;
const ENABLE_MOVE_SOUND = true;


// ===== AUDIO UNLOCK =====
let audioUnlocked = false;
function unlockAudio() {
  if (audioUnlocked) return;
  const s = new Audio("pop.mp3");
  s.volume = 0;
  s.play().then(()=> {
    audioUnlocked = true;
    if (ENABLE_MUSIC) document.getElementById("bgMusic").play().catch(()=>{});
  }).catch(()=>{});
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
function surprise() {
  document.getElementById("slideshow").style.display = "none";
  document.getElementById("final").style.display = "flex";
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

  // random horizontal start
  heart.style.left = Math.random() * 100 + 'vw';

  // random animation duration
  const duration = 6 + Math.random() * 3;
  heart.style.animationDuration = duration + 's';

  heartsContainer.appendChild(heart);

  // Use animationend instead of timeout (PERFECT TIMING)
  heart.addEventListener("animationend", () => {
    heart.classList.add("pop");
    playPop();
    setTimeout(() => heart.remove(), 250);
  });
}

setInterval(createHeart,700);

// ===== SPARKLES =====
if (ENABLE_SPARKLES) {
  document.addEventListener("mousemove", e => {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.left = e.clientX+"px";
    s.style.top = e.clientY+"px";
    document.querySelector(".sparkles").appendChild(s);
    setTimeout(()=>s.remove(),1000);
  });
}

// ===== SLIDESHOW =====
const photos = ["photos/pic1.jpg","photos/pic2.jpg","photos/pic3.jpg"];
let index = 0;

function startSlideshow() {
  document.getElementById("page3").style.display = "none";
  document.getElementById("slideshow").style.display = "flex";

  if (!ENABLE_SLIDESHOW) return;

  setInterval(()=>{
    index = (index+1)%photos.length;
    document.getElementById("memoryPhoto").src = photos[index];
  },2500);
}

function moveNoButton() {
  const containerRect = container.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  const maxX = containerRect.width - noBtn.offsetWidth - 10;
  const maxY = containerRect.height - noBtn.offsetHeight - 10;

  let newX, newY;
  let attempts = 0;

  // Prevent overlap with YES button
  do {
    newX = Math.random() * maxX;
    newY = Math.random() * maxY;
    attempts++;
  } while (
    newX < yesRect.right - containerRect.left &&
    newX + noBtn.offsetWidth > yesRect.left - containerRect.left &&
    newY < yesRect.bottom - containerRect.top &&
    newY + noBtn.offsetHeight > yesRect.top - containerRect.top &&
    attempts < 40
  );

  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";

  // 🎵 Play random sound
  const sound = moveSounds[Math.floor(Math.random() * moveSounds.length)];
  sound.currentTime = 0;
  sound.volume = 0.15;
  sound.playbackRate = 0.9 + Math.random() * 0.4;
  sound.play().catch(()=>{});
}


// Trigger on hover (desktop) and touch (mobile)
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

// ===== YES / NO BUTTON SYSTEM =====
window.addEventListener("DOMContentLoaded", () => {

  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const responseText = document.getElementById("responseText");
  const container = document.querySelector(".valentine-buttons");

  if (!noBtn || !yesBtn || !container) return;

  // ===== RANDOM MOVE SOUNDS =====
  const moveSounds = ["whoosh1.mp4","whoosh2.mp4","whoosh3.mp4","whoosh4.mp4"];


  // YES CLICK
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
    newX = Math.random() * maxX;
    newY = Math.random() * maxY;
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


  noBtn.addEventListener("mouseenter", moveNoButton); // laptop
  noBtn.addEventListener("touchstart", moveNoButton); // phone
});

function playMoveSound() {
  if (!audioUnlocked || !ENABLE_MOVE_SOUND) return;

  const src = moveSounds[Math.floor(Math.random()*moveSounds.length)];
  const s = new Audio(src);
  s.volume = 0.15;
  s.playbackRate = 0.9 + Math.random()*0.3;
  s.play().catch(()=>{});
}

