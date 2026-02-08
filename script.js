// ===== OPTIONS =====
const ENABLE_MUSIC = true;
const ENABLE_SPARKLES = true;
const ENABLE_SLIDESHOW = true;

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
  if (!audioUnlocked) return;
  const sound = new Audio("pop.mp3");
  sound.volume = 0.1 + Math.random()*0.1;
  sound.playbackRate = 0.8 + Math.random()*0.5;
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

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const responseText = document.getElementById("responseText");
const container = document.querySelector(".valentine-buttons");

// YES CLICK
yesBtn.addEventListener("click", () => {
  responseText.innerText = "I knew it! 💖 Best decision ever 😌";
  yesBtn.style.transform = "scale(1.2)";
});

// NO ESCAPE
function moveNoButton() {
  const containerRect = container.getBoundingClientRect();
  const maxX = containerRect.width - noBtn.offsetWidth;
  const maxY = containerRect.height - noBtn.offsetHeight;

  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;

  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";
}

// Trigger on hover (desktop) and touch (mobile)
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

