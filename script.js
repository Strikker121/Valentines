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

      setTimeout(() => {
        const backBtn = memoriesSection.querySelector("#memoriesBackBtn");
        if(backBtn){
          backBtn.addEventListener("click", (e) => {
            e.preventDefault();
            memoriesSection.style.display = "none";
            finalPage.style.display = "flex"; // Show final page
            attachNoButton(); // Attach YES/NO buttons **now**
          });
        }
      }, 10);
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
  const responseText = document.getElementById("responseText");

  if (!yesBtn || !noBtn) return;

  yesBtn.addEventListener("click", () => {
    responseText.innerText = "I knew it! 💖 Best decision ever 😌";
    yesBtn.style.transform = "scale(1.15)";
    setTimeout(() => yesBtn.style.transform = "scale(1)", 300);
  });

  noBtn.addEventListener("mouseenter", moveNoButton); // PC
  noBtn.addEventListener("touchstart", moveNoButton);  // mobile
}


  // NO button movement + sound
function moveNoButton() {
  const noBtn = document.getElementById("noBtn");
  const container = document.getElementById("final");

  const btnRect = noBtn.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const btnW = btnRect.width;
  const btnH = btnRect.height;

  const maxX = containerRect.width - btnW;
  const maxY = containerRect.height - btnH;

  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;

  noBtn.style.transform = `translate(${newX - btnRect.left + containerRect.left}px, ${newY - btnRect.top + containerRect.top}px)`;

  // whoosh sound
  if (audioUnlocked && ENABLE_MOVE_SOUND) {
    const s = moveAudio[Math.floor(Math.random() * moveAudio.length)].cloneNode();
    s.volume = 0.12;
    s.playbackRate = 0.9 + Math.random() * 0.3;
    s.play().catch(() => {});
  }
}


// Attach events after showing #final page
const noBtn = document.getElementById("noBtn");
noBtn.addEventListener("mouseenter", moveNoButton); // PC
noBtn.addEventListener("touchstart", moveNoButton);  // mobile tap


}




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



