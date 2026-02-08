const ENABLE_POP_SOUND = true;
const ENABLE_MOVE_SOUND = true;

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

// Unlock on **start button click** to ensure sounds work
document.getElementById("startBtn").addEventListener("click", unlockAudio);

// YES / NO Buttons
function attachNoButton(){
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const responseText = document.getElementById("responseText");
  if(!yesBtn || !noBtn) return;

  const padding = 20;
  const buffer = 80;

  // YES initial position
  yesBtn.style.left = "35%";
  yesBtn.style.top = "50%";

  // NO initial safe spot
  function placeNoInitially(){
    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;
    const yesRect = yesBtn.getBoundingClientRect();
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    let newX, newY, attempts = 0;

    do {
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

  yesBtn.addEventListener("click", ()=>{
    responseText.innerText = "I knew it! 💖 Best decision ever 😌";
    yesBtn.style.transform = "scale(1.15)";
    setTimeout(()=>yesBtn.style.transform="scale(1)",300);
  });

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

    if(audioUnlocked && ENABLE_MOVE_SOUND){
      const s = moveAudio[Math.floor(Math.random()*moveAudio.length)].cloneNode();
      s.volume = 0.12;
      s.playbackRate = 0.9 + Math.random()*0.3;
      s.play().catch(()=>{});
    }
  }

  noBtn.addEventListener("mouseenter", moveNo);
  noBtn.addEventListener("touchstart", moveNo);
}

// Call attachNoButton() when final page is shown
const finalObserver = new MutationObserver(() => {
  if(finalPage.style.display === "flex") attachNoButton();
});
finalObserver.observe(finalPage, { attributes: true, attributeFilter: ["style"] });
