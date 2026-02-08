const ENABLE_POP_SOUND = true;
const ENABLE_MOVE_SOUND = true;
// Preload whoosh sounds
const moveAudio = ["whoosh1.mp3","whoosh2.mp3","whoosh3.mp3","whoosh4.mp3"].map(src => {
  const a = new Audio(src);
  a.volume = 0.12;
  return a;
});

let audioUnlocked = false;
function unlockAudio() {
  if (audioUnlocked) return;
  const s = new Audio("pop.mp3");
  s.volume = 0;
  s.play().then(()=> audioUnlocked = true).catch(()=>{});
}
document.addEventListener("click", unlockAudio);
document.addEventListener("touchstart", unlockAudio);

// PAGE NAV
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const memoriesSection = document.getElementById("memoriesSection");
const finalPage = document.getElementById("final");

document.getElementById("startBtn").addEventListener("click", ()=> { page1.style.display="none"; page2.style.display="flex"; });
document.getElementById("next2Btn").addEventListener("click", ()=> { page2.style.display="none"; page3.style.display="flex"; });
document.getElementById("memoriesBtn").addEventListener("click", loadMemories);

function loadMemories(){
  fetch("memories.html")
    .then(r => r.text())
    .then(html => {
      memoriesSection.innerHTML = html;
      page3.style.display = "none";
      memoriesSection.style.display = "flex";

      // Use a small timeout to ensure the button is fully in the DOM
      setTimeout(() => {
        const backBtn = memoriesSection.querySelector("#memoriesBackBtn");
        if(backBtn){
          backBtn.addEventListener("click", (e) => {
          e.preventDefault();
          memoriesSection.style.display = "none";
          finalPage.style.display = "flex"; 
          attachNoButton(); // Re-attach NO button events after showing final page
        });
        }
      }, 10); // 10ms delay ensures DOM is ready
    })
    .catch(e => alert("Could not load memories. Make sure you are running on a server."));
}


// HEARTS
const heartsContainer = document.querySelector('.hearts');
function playPop(){
  if(!audioUnlocked || !ENABLE_POP_SOUND) return;
  const sound = new Audio("pop.mp3");
  sound.volume=0.08+Math.random()*0.05;
  sound.playbackRate=0.85+Math.random()*0.4;
  sound.play().catch(()=>{});
}
function createHeart(){
  const heart=document.createElement("div");
  heart.className="heart";
  heart.style.left=Math.random()*100 + "vw";
  heart.style.animationDuration=(6+Math.random()*3)+"s";
  heartsContainer.appendChild(heart);
  heart.addEventListener("animationend", ()=>{
    heart.classList.add("pop");
    playPop();
    setTimeout(()=>heart.remove(),250);
  });
}
setInterval(createHeart,700);

// YES/NO
// Function to attach YES/NO button behaviors
function attachNoButton() {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  if(!yesBtn || !noBtn) return;

  const responseText = document.getElementById("responseText");

  // YES button
  yesBtn.addEventListener("click", () => {
    responseText.innerText = "I knew it! 💖 Best decision ever 😌";
    yesBtn.style.transform = "scale(1.15)";
    setTimeout(() => yesBtn.style.transform = "scale(1)", 300);
  });

  // NO button movement + sound
function moveNoButton() {
  const padding = 20;
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;
  const maxX = window.innerWidth - btnW - padding;
  const maxY = window.innerHeight - btnH - padding;

  let newX, newY, tries = 0;
  const yesRect = yesBtn.getBoundingClientRect();

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

  // Play random whoosh sound
  if(audioUnlocked && ENABLE_MOVE_SOUND){
    const s = moveAudio[Math.floor(Math.random()*moveAudio.length)].cloneNode();
    s.volume = 0.12;
    s.playbackRate = 0.9 + Math.random()*0.3;
    s.play().catch(()=>{});
  }
}



  noBtn.addEventListener("mouseenter", moveNoButton); // PC hover
noBtn.addEventListener("touchstart", moveNoButton); // Mobile tap

}

// Initial attach when page loads
window.addEventListener("DOMContentLoaded", attachNoButton);


// --- Global Sparkle Trail ---
const sparklesContainer = document.querySelector('.sparkles');
let lastPos = null;

function createSparkleAt(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  sparkle.style.width = 6 + Math.random() * 4 + 'px';
  sparkle.style.height = 6 + Math.random() * 4 + 'px';
  sparkle.style.background = 'rgba(255,255,255,0.8)';
  sparkle.style.borderRadius = '50%';
  sparkle.style.position = 'absolute';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.animation = `sparkleAnim ${0.8 + Math.random()*0.8}s ease-out forwards`;
  sparklesContainer.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1200);
}

function createTrail(x, y) {
  if (!lastPos) lastPos = {x, y};
  const dx = x - lastPos.x;
  const dy = y - lastPos.y;
  const distance = Math.max(Math.abs(dx), Math.abs(dy));
  for (let i = 0; i < distance; i += 4) {
    const px = lastPos.x + (dx * i / distance);
    const py = lastPos.y + (dy * i / distance);
    createSparkleAt(px, py);
  }
  lastPos = {x, y};
}

// PC: follow cursor
document.addEventListener('mousemove', e => createTrail(e.clientX, e.clientY));

// Mobile: follow finger
document.addEventListener('touchmove', e => {
  for (const touch of e.touches) {
    createTrail(touch.clientX, touch.clientY);
  }
});

// Touchstart sparkle (tap)
document.addEventListener('touchstart', e => {
  for (const touch of e.touches) {
    createTrail(touch.clientX, touch.clientY);
  }
});

// Reset last position on mouse leave / touch end
document.addEventListener('mouseleave', () => lastPos = null);
document.addEventListener('touchend', () => lastPos = null);



