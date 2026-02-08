const ENABLE_POP_SOUND = true;
const ENABLE_MOVE_SOUND = true;
const moveSounds = ["whoosh1.mp4","whoosh2.mp4","whoosh3.mp4","whoosh4.mp4"];

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
    .then(r=>r.text())
    .then(html=>{
      memoriesSection.innerHTML = html;
      page3.style.display = "none";
      memoriesSection.style.display = "flex";

      // Attach back button inside memories
      const backBtn = memoriesSection.querySelector("#memoriesBackBtn");
      backBtn.addEventListener("click", ()=>{
        memoriesSection.style.display="none";
        page3.style.display="flex";
      });
    })
    .catch(e=> alert("Could not load memories. Make sure you are running on a server."));
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
window.addEventListener("DOMContentLoaded", ()=>{
  const yesBtn=document.getElementById("yesBtn");
  const noBtn=document.getElementById("noBtn");
  const responseText=document.getElementById("responseText");
  if(!yesBtn || !noBtn) return;

  yesBtn.addEventListener("click", ()=>{
    responseText.innerText="I knew it! 💖 Best decision ever 😌";
    yesBtn.style.transform="scale(1.15)";
    setTimeout(()=> yesBtn.style.transform="scale(1)",300);
  });

  function moveNoButton(){
    const padding=20;
    const btnW=noBtn.offsetWidth;
    const btnH=noBtn.offsetHeight;
    const maxX=window.innerWidth-btnW-padding;
    const maxY=window.innerHeight-btnH-padding;
    const yesRect=yesBtn.getBoundingClientRect();
    let newX,newY,tries=0;
    do{
      newX=Math.random()*maxX;
      newY=Math.random()*maxY;
      tries++;
    } while (
      newX<yesRect.right &&
      newX+btnW>yesRect.left &&
      newY<yesRect.bottom &&
      newY+btnH>yesRect.top &&
      tries<50
    );
    noBtn.style.left=newX+"px";
    noBtn.style.top=newY+"px";
    playMoveSound();
  }

  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("touchstart", moveNoButton);
});

function playMoveSound(){
  if(!audioUnlocked || !ENABLE_MOVE_SOUND) return;
  const src=moveSounds[Math.floor(Math.random()*moveSounds.length)];
  const s=new Audio(src);
  s.volume=0.12;
  s.playbackRate=0.9+Math.random()*0.3;
  s.play().catch(()=>{});
}
