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
  s.play().then(()=> audioUnlocked=true).catch(()=>{});
}
document.addEventListener("click", unlockAudio, {once:true});
document.addEventListener("touchstart", unlockAudio, {once:true});

// PAGE NAV
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const memoriesSection = document.getElementById("memoriesSection");
const finalPage = document.getElementById("final");

document.getElementById("startBtn").addEventListener("click", ()=>{
  page1.style.display="none";
  page2.style.display="flex";
});
document.getElementById("next2Btn").addEventListener("click", ()=>{
  page2.style.display="none";
  page3.style.display="flex";
});
document.getElementById("memoriesBtn").addEventListener("click", loadMemories);

function loadMemories(){
  fetch("memories.html")
    .then(r=>r.text())
    .then(html=>{
      memoriesSection.innerHTML = html;
      page3.style.display="none";
      memoriesSection.style.display="flex";

      setTimeout(()=>{
        const backBtn = memoriesSection.querySelector("#memoriesBackBtn");
        if(backBtn){
          backBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            memoriesSection.style.display="none";
            finalPage.style.display="flex";
            attachNoButton(); // attach after visible
          });
        }
      }, 10);
    })
    .catch(e=>alert("Could not load memories. Make sure you are running on a server."));
}

// YES / NO Buttons
function attachNoButton(){
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const responseText = document.getElementById("responseText");
  if(!yesBtn || !noBtn) return;

  const padding = 20; // distance from screen edge
  const buffer = 80; // distance from YES

  // Set YES initial position
  yesBtn.style.left = "35%";
  yesBtn.style.top = "50%";

  // Set NO initial safe position
  function placeNoInitially(){
    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;
    const yesRect = yesBtn.getBoundingClientRect();
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    let newX, newY, attempts=0;
    do{
      newX = Math.random()*(screenW-btnW-2*padding)+padding;
      newY = Math.random()*(screenH-btnH-2*padding)+padding;

      const overlap = !(
        newX+btnW < yesRect.left-buffer ||
        newX > yesRect.right+buffer ||
        newY+btnH < yesRect.top-buffer ||
        newY > yesRect.bottom+buffer
      );
      attempts++;
      if(attempts>50) break;
    } while(overlap);

    noBtn.style.left = newX+"px";
    noBtn.style.top = newY+"px";
  }
  placeNoInitially();

  // YES click
  yesBtn.addEventListener("click", ()=>{
    responseText.innerText = "I knew it! 💖 Best decision ever 😌";
    yesBtn.style.transform = "scale(1.15)";
    setTimeout(()=>yesBtn.style.transform="scale(1)",300);
  });

  // NO move function
  function moveNo(){
    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;
    const yesRect = yesBtn.getBoundingClientRect();
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    let newX, newY, attempts=0;
    do{
      newX = Math.random()*(screenW-btnW-2*padding)+padding;
      newY = Math.random()*(screenH-btnH-2*padding)+padding;
      const overlap = !(
        newX+btnW < yesRect.left-buffer ||
        newX > yesRect.right+buffer ||
        newY+btnH < yesRect.top-buffer ||
        newY > yesRect.bottom+buffer
      );
      attempts++;
      if(attempts>50) break;
    } while(overlap);

    noBtn.style.left = newX+"px";
    noBtn.style.top = newY+"px";

    // Play whoosh sound
    if(audioUnlocked && ENABLE_MOVE_SOUND){
      const s = moveAudio[Math.floor(Math.random()*moveAudio.length)].cloneNode();
      s.volume = 0.12;
      s.playbackRate = 0.9 + Math.random()*0.3;
      s.play().catch(()=>{});
    }
  }

  noBtn.addEventListener("mouseenter", moveNo); // PC
  noBtn.addEventListener("touchstart", moveNo); // Mobile
}
