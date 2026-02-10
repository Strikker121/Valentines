document.addEventListener("DOMContentLoaded", () => {

const ENABLE_POP_SOUND = true;
const ENABLE_MOVE_SOUND = true;

const heartsContainer = document.querySelector('.hearts');
const sparklesContainer = document.querySelector('.sparkles');
const finalPage = document.getElementById("final");

let audioUnlocked = false;

/* ---------------- AUDIO ---------------- */

const moveAudio = ["whoosh1.mp3","whoosh2.mp3","whoosh3.mp3","whoosh4.mp3"].map(src => {
  const a = new Audio(src);
  a.volume = 0.12;
  return a;
});

function unlockAudio() {
  if (audioUnlocked) return;
  const s = new Audio("pop.mp3");
  s.volume = 0;
  s.play().then(()=> audioUnlocked=true).catch(()=>{});
}
document.addEventListener("click", unlockAudio, {once:true});
document.addEventListener("touchstart", unlockAudio, {once:true});


/* ---------------- HEART FLOATING ---------------- */

function createHeart(){
  if(!heartsContainer) return;
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random()*100 + "vw";
  heart.style.animationDuration = (4+Math.random()*3)+"s";
  heartsContainer.appendChild(heart);
  setTimeout(()=>heart.remove(),7000);
}
setInterval(createHeart, 500);


/* ---------------- SPARKLE TRAIL ---------------- */

function createSparkle(x,y){
  if(!sparklesContainer) return;
  const s=document.createElement("div");
  s.className="sparkle";
  s.style.left=x+"px";
  s.style.top=y+"px";
  sparklesContainer.appendChild(s);
  setTimeout(()=>s.remove(),1000);
}

document.addEventListener("mousemove", e=> createSparkle(e.clientX,e.clientY));
document.addEventListener("touchmove", e=>{
  const t=e.touches[0];
  createSparkle(t.clientX,t.clientY);
});


/* ---------------- PAGE NAV ---------------- */

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const memoriesSection = document.getElementById("memoriesSection");

document.getElementById("startBtn").onclick=()=>{page1.style.display="none";page2.style.display="flex";}
document.getElementById("next2Btn").onclick=()=>{page2.style.display="none";page3.style.display="flex";}
document.getElementById("memoriesBtn").onclick=loadMemories;

function loadMemories(){
  fetch("memories.html").then(r=>r.text()).then(html=>{
    memoriesSection.innerHTML=html;
    page3.style.display="none";
    memoriesSection.style.display="flex";
    setTimeout(()=>{
      const backBtn = memoriesSection.querySelector("#memoriesBackBtn");
      backBtn.onclick=()=>{
        memoriesSection.style.display="none";
        finalPage.style.display="flex";
        attachNoButton();
      }
    },50);
  });
}


/* ---------------- YES / NO BUTTON LOGIC ---------------- */

function attachNoButton(){

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const responseText = document.getElementById("responseText");
  if(!yesBtn||!noBtn) return;

  // Prevent text selection highlight on mobile
  noBtn.style.userSelect = "none";
  noBtn.style.webkitTapHighlightColor = "transparent";

  // Ensure button starts inside screen
  noBtn.style.left = (window.innerWidth * 0.65) + "px";
  noBtn.style.top  = (window.innerHeight * 0.55) + "px";

  let noActive = false;
  setTimeout(()=> noActive = true, 600);

  const ESCAPE_DISTANCE = 180;

  function distance(x1,y1,x2,y2){
    return Math.hypot(x2-x1, y2-y1);
  }

  function isNearYes(x,y,w,h,yesRect){
    return !(
      x+w < yesRect.left-120 ||
      x > yesRect.right+120 ||
      y+h < yesRect.top-120 ||
      y > yesRect.bottom+120
    );
  }

  function moveNoAway(cursorX, cursorY){
    if(!noActive) return;

    noBtn.classList.add("moving");


    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const yesRect = yesBtn.getBoundingClientRect();

    let newX,newY,tries=0;

    do{
      newX = Math.random()*(screenW-btnW-20);
      newY = Math.random()*(screenH-btnH-20);
      tries++;
      if(tries>100) break;
    }
    while(
      isNearYes(newX,newY,btnW,btnH,yesRect) ||
      distance(newX+btnW/2,newY+btnH/2,cursorX,cursorY)<ESCAPE_DISTANCE
    );

    noBtn.style.left=newX+"px";
    noBtn.style.top=newY+"px";

    if(audioUnlocked && ENABLE_MOVE_SOUND){
      const s = moveAudio[Math.floor(Math.random()*moveAudio.length)].cloneNode();
      s.play().catch(()=>{});
    }
  }

  // PC
  document.addEventListener("mousemove", e=>{
    const rect = noBtn.getBoundingClientRect();
    const d = distance(rect.left+rect.width/2,rect.top+rect.height/2,e.clientX,e.clientY);
    if(d < ESCAPE_DISTANCE){
      moveNoAway(e.clientX,e.clientY);
    }
  });

  // PHONE
  noBtn.addEventListener("touchstart", e=>{
    const t=e.touches[0];
    moveNoAway(t.clientX,t.clientY);
  });

  // YES CLICK
  yesBtn.onclick=()=>{
    responseText.innerText="I knew it! 💖 Best decision ever 😌";
    if(audioUnlocked && ENABLE_POP_SOUND){
      const s=new Audio("pop.mp3");
      s.volume=0.3;
      s.play().catch(()=>{});
    }
  };

}


const musicBtn = document.getElementById("musicBtn");
const dropdown = document.getElementById("musicDropdown");
const bgMusic = document.getElementById("bgMusic");

let musicOpen = false;
let isPlaying = false;

const playlist = [
  "song2.mp3",
  "song3.mp3",
  "song4.mp3"
];

// toggle dropdown
musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("show");
  musicOpen = !musicOpen;
});

// close if clicking outside
document.addEventListener("click", () => {
  dropdown.classList.remove("show");
});

// play main theme
function playMainSong() {
  bgMusic.src = "music.mp3";
  bgMusic.loop = true;
  bgMusic.play().then(() => {
    musicBtn.classList.add("playing");
    isPlaying = true;
  }).catch(()=>{});
}

// play random romantic song
function playRandomSong() {
  const random = playlist[Math.floor(Math.random() * playlist.length)];
  bgMusic.src = random;
  bgMusic.loop = true;
  bgMusic.play().then(() => {
    musicBtn.classList.add("playing");
    isPlaying = true;
  }).catch(()=>{});
}

// stop music
function stopMusic() {
  bgMusic.pause();
  bgMusic.currentTime = 0;
  musicBtn.classList.remove("playing");
  isPlaying = false;
}

  
});
