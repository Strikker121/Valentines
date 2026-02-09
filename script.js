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
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random()*100 + "vw";
  heart.style.animationDuration = (4+Math.random()*3)+"s";
  heartsContainer.appendChild(heart);
  setTimeout(()=>heart.remove(),7000);
}
setInterval(createHeart, 500);


/* ---------------- SPARKLE TRAIL ---------------- */

document.addEventListener("mousemove", e=> createSparkle(e.clientX,e.clientY));
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

  yesBtn.onclick=()=>{
    responseText.innerText="I knew it! 💖 Best decision ever 😌";
  };

  let noActive=false;
  setTimeout(()=> noActive=true, 500);

  function moveNo(){
    if(!noActive) return;

    const area = yesBtn.parentElement.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    let x,y,tries=0;

    do{
      x=(Math.random()*120)-60;  // small move range
      y=(Math.random()*60)-30;
      tries++;
      if(tries>40) break;
    }
    while(isNearYes(btnRect.left+x, btnRect.top+y, yesRect));

    noBtn.style.transform = `translate(${x}px, ${y}px)`;

    if(audioUnlocked && ENABLE_MOVE_SOUND){
      const s = moveAudio[Math.floor(Math.random()*moveAudio.length)].cloneNode();
      s.play().catch(()=>{});
    }
  }

  function isNearYes(x,y,yesRect){
    return !(
      x+noBtn.offsetWidth < yesRect.left-30 ||
      x > yesRect.right+30 ||
      y+noBtn.offsetHeight < yesRect.top-30 ||
      y > yesRect.bottom+30
    );
  }

  noBtn.addEventListener("mouseenter", moveNo);
  noBtn.addEventListener("touchstart", moveNo);
}

  /* --- YES CLICK --- */

  yesBtn.onclick=()=>{
    responseText.innerText="I knew it! 💖 Best decision ever 😌";
    if(audioUnlocked && ENABLE_POP_SOUND){
      const s = new Audio("pop.mp3");
      s.volume=0.3;
      s.play().catch(()=>{});
    }
  };

 
