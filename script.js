const ENABLE_POP_SOUND = true;
const ENABLE_MOVE_SOUND = true;

const heartsContainer = document.querySelector('.hearts');
const sparklesContainer = document.querySelector('.sparkles');
const finalPage = document.getElementById("final");

let lastPos = null;
let audioUnlocked = false;

// ---------------- AUDIO ----------------
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


// ---------------- HEART FLOATING ----------------
function createHeart(){
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random()*100 + "vw";
  heart.style.animationDuration = (4+Math.random()*3)+"s";
  heartsContainer.appendChild(heart);
  setTimeout(()=>heart.remove(),7000);
}
setInterval(createHeart, 500);


// ---------------- SPARKLE TRAIL ----------------
document.addEventListener("mousemove", e=>{
  createSparkle(e.clientX,e.clientY);
});
document.addEventListener("touchmove", e=>{
  const t=e.touches[0];
  createSparkle(t.clientX,t.clientY);
});

function createSparkle(x,y){
  const s=document.createElement("div");
  s.className="sparkle";
  s.style.left=x+"px";
  s.style.top=y+"px";
  sparklesContainer.appendChild(s);
  setTimeout(()=>s.remove(),1000);
}


// ---------------- PAGE NAV ----------------
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


// ---------------- YES / NO ----------------
function attachNoButton(){
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const responseText = document.getElementById("responseText");
  if(!yesBtn||!noBtn) return;

  // CENTER YES PROPERLY
  yesBtn.style.left="50%";
  yesBtn.style.top="55%";
  yesBtn.style.transform="translate(-50%,-50%)";

  placeNo();

  function placeNo(){
    const btnW=noBtn.offsetWidth;
    const btnH=noBtn.offsetHeight;
    const padding=20;
    const maxX=window.innerWidth-btnW-padding;
    const maxY=window.innerHeight-btnH-padding;

    let x,y;
    do{
      x=Math.random()*maxX;
      y=Math.random()*maxY;
    }while(isNearYes(x,y,btnW,btnH));

    noBtn.style.left=x+"px";
    noBtn.style.top=y+"px";
  }

  function isNearYes(x,y,w,h){
    const r=yesBtn.getBoundingClientRect();
    return !(x+w<r.left-100||x>r.right+100||y+h<r.top-100||y>r.bottom+100);
  }

  yesBtn.onclick=()=>{
    responseText.innerText="I knew it! 💖 Best decision ever 😌";
  }

  function moveNo(){
    placeNo();
    if(audioUnlocked && ENABLE_MOVE_SOUND){
      const s = moveAudio[Math.floor(Math.random()*moveAudio.length)].cloneNode();
      s.play().catch(()=>{});
    }
  }

  let noActive = false;

// Activate movement AFTER page is visible & stable
setTimeout(() => {
  noActive = true;
}, 800); // delay in ms (adjust if needed)

function guardedMoveNo() {
  if (!noActive) return;
  moveNo();
}

noBtn.addEventListener("mouseenter", guardedMoveNo);
noBtn.addEventListener("touchstart", guardedMoveNo);

}
