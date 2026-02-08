const ENABLE_POP_SOUND = true;   // turn heart pop sound ON/OFF
const ENABLE_MOVE_SOUND = true;  // turn whoosh ON/OFF

const moveSounds = ["whoosh1.mp3","whoosh2.mp3","whoosh3.mp3","whoosh4.mp3"];

let audioUnlocked = false;
function unlockAudio() {
  if (audioUnlocked) return;
  const s = new Audio("pop.mp3");
  s.volume = 0;
  s.play().then(()=> audioUnlocked = true).catch(()=>{});
}
document.addEventListener("click", unlockAudio);
document.addEventListener("touchstart", unlockAudio);

/* PAGE NAV */
function next(){ page1.style.display="none"; page2.style.display="flex"; }
function next2(){ page2.style.display="none"; page3.style.display="flex"; }
function startSlideshow(){ page3.style.display="none"; slideshow.style.display="flex"; }
function surprise(){ slideshow.style.display="none"; final.style.display="flex"; }

/* HEARTS */
const heartsContainer = document.querySelector('.hearts');

function playPop(){
  if(!audioUnlocked || !ENABLE_POP_SOUND) return;
  const s=new Audio("pop.mp3");
  s.volume=0.1; s.play().catch(()=>{});
}

function createHeart(){
  const heart=document.createElement('div');
  heart.className='heart';
  heart.style.left=Math.random()*100+'vw';
  heart.style.animationDuration=(6+Math.random()*3)+'s';
  heartsContainer.appendChild(heart);

  heart.addEventListener("animationend",()=>{
    heart.classList.add("pop");
    playPop();
    setTimeout(()=>heart.remove(),250);
  });
}
setInterval(createHeart,700);

/* YES / NO */
window.addEventListener("DOMContentLoaded",()=>{
  const noBtn=noBtn=document.getElementById("noBtn");
  const yesBtn=document.getElementById("yesBtn");
  const responseText=document.getElementById("responseText");

  yesBtn.addEventListener("click",()=>{
    responseText.innerText="I knew it! 💖 Best decision ever 😌";
  });

  function moveNo(){
    const pad=40;
    const w=noBtn.offsetWidth, h=noBtn.offsetHeight;
    const maxX=window.innerWidth-w-pad;
    const maxY=window.innerHeight-h-pad;
    const yesRect=yesBtn.getBoundingClientRect();

    let x,y,tries=0;
    do{
      x=Math.random()*maxX;
      y=Math.random()*maxY;
      tries++;
    }while(
      x<yesRect.right && x+w>yesRect.left &&
      y<yesRect.bottom && y+h>yesRect.top &&
      tries<50
    );

    noBtn.style.left=x+"px";
    noBtn.style.top=y+"px";
    playMoveSound();
  }

  noBtn.addEventListener("mouseenter",moveNo);
  noBtn.addEventListener("touchstart",moveNo);
});

/* MOVE SOUND */
function playMoveSound(){
  if(!audioUnlocked || !ENABLE_MOVE_SOUND) return;
  const src=moveSounds[Math.floor(Math.random()*moveSounds.length)];
  const s=new Audio(src);
  s.volume=0.15;
  s.play().catch(()=>{});
}
