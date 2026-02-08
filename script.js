// ================= OPTIONS =================
const ENABLE_POP_SOUND = true;
const ENABLE_MOVE_SOUND = true;
const ENABLE_MUSIC = true;

// ================= AUDIO =================
let audioUnlocked = false;
const bgMusic = document.getElementById("bgMusic");

// preload sounds once (IMPORTANT for laptop)
const moveSounds = [
  new Audio("whoosh1.mp4"),
  new Audio("whoosh2.mp4"),
  new Audio("whoosh3.mp4"),
  new Audio("whoosh4.mp4")
];

moveSounds.forEach(s => s.volume = 0.15);

function unlockAudio() {
  if (audioUnlocked) return;
  const s = new Audio("pop.mp3");
  s.volume = 0;
  s.play().then(() => {
    audioUnlocked = true;
    if (ENABLE_MUSIC) bgMusic.play().catch(()=>{});
  }).catch(()=>{});
}

document.addEventListener("click", unlockAudio);
document.addEventListener("touchstart", unlockAudio);

// ================= PAGE NAV =================
function next() {
  page1.style.display = "none";
  page2.style.display = "flex";
}
function next2() {
  page2.style.display = "none";
  page3.style.display = "flex";
}
function startSlideshow() {
  page3.style.display = "none";
  slideshow.style.display = "flex";
}
function surprise() {
  slideshow.style.display = "none";
  final.style.display = "flex";
}

// ================= HEARTS =================
const heartsContainer = document.querySelector(".hearts");

function playPop() {
  if (!audioUnlocked || !ENABLE_POP_SOUND) return;
  const s = new Audio("pop.mp3");
  s.volume = 0.1;
  s.play().catch(()=>{});
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random()*100 + "vw";
  heart.style.animationDuration = (6+Math.random()*3)+"s";
  heartsContainer.appendChild(heart);

  heart.addEventListener("animationend", () => {
    playPop();
    heart.remove();
  });
}
setInterval(createHeart, 700);

// ================= SLIDESHOW =================
const photos = ["photos/pic1.jpg","photos/pic2.jpg","photos/pic3.jpg"];
let index = 0;

setInterval(() => {
  const img = document.getElementById("memoryPhoto");
  if (!img || slideshow.style.display !== "flex") return;
  index = (index+1)%photos.length;
  img.src = photos[index];
}, 2500);

// ================= YES / NO BUTTON =================
window.addEventListener("DOMContentLoaded", () => {

  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const responseText = document.getElementById("responseText");
  const container = document.querySelector(".valentine-buttons");

  yesBtn.addEventListener("click", () => {
    responseText.innerText = "I knew it! 💖 Best decision ever 😌";
    yesBtn.style.transform = "scale(1.2)";
    setTimeout(()=> yesBtn.style.transform="scale(1)",300);
  });

  function moveNoButton() {
    const rect = container.getBoundingClientRect();
    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;

    const maxX = rect.width - btnW - 10;
    const maxY = rect.height - btnH - 10;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    noBtn.style.transform = `translate(${newX}px, ${newY}px)`;

    if (audioUnlocked && ENABLE_MOVE_SOUND) {
      const sound = moveSounds[Math.floor(Math.random()*moveSounds.length)];
      sound.currentTime = 0;
      sound.play().catch(()=>{});
    }
  }

  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("touchstart", moveNoButton);
});
