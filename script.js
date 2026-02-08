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





// YES CLICK
yesBtn.addEventListener("click", () => {
  responseText.innerText = "I knew it! 💖 Best decision ever 😌";
  yesBtn.style.transform = "scale(1.2)";
});

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
  const moveSounds = [
    new Audio("whoosh1.mp4"),
    new Audio("whoosh2.mp4"),
    new Audio("whoosh3.mp4"),
    new Audio("whoosh4.mp4")
  ];

  // YES CLICK
  yesBtn.addEventListener("click", () => {
    responseText.innerText = "I knew it! 💖 Best decision ever 😌";
    yesBtn.style.transform = "scale(1.2)";
  });

  function moveNoButton() {
    const containerRect = container.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    const maxX = containerRect.width - noBtn.offsetWidth - 10;
    const maxY = containerRect.height - noBtn.offsetHeight - 10;

    let newX, newY;
    let attempts = 0;

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

    const sound = moveSounds[Math.floor(Math.random() * moveSounds.length)];
    sound.currentTime = 0;
    sound.volume = 0.15;
    sound.playbackRate = 0.9 + Math.random() * 0.4;
    sound.play().catch(()=>{});
  }

  noBtn.addEventListener("mouseenter", moveNoButton); // laptop
  noBtn.addEventListener("touchstart", moveNoButton); // phone
});


