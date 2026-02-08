// ===== OPTIONS =====
const ENABLE_POP_SOUND = true;
const ENABLE_MOVE_SOUND = true;

function goToMemories() {
  window.location.href = "memories.html";
}

// ===== AUDIO UNLOCK =====
let audioUnlocked = false;
document.addEventListener("click", () => {
  if (audioUnlocked) return;
  new Audio("pop.mp3").play().then(()=> audioUnlocked = true).catch(()=>{});
  document.getElementById("bgMusic").play().catch(()=>{});
});

// ===== PAGE NAV =====
function next(){ page1.style.display="none"; page2.style.display="flex"; }
function next2(){ page2.style.display="none"; page3.style.display="flex"; }
function startSlideshow() {
  document.getElementById("page3").style.display = "none";
  document.getElementById("memoriesSection").style.display = "flex";
}

function closeMemories() {
  document.getElementById("memoriesSection").style.display = "none";
  document.getElementById("page3").style.display = "flex";
}


function surprise(){ slideshow.style.display="none"; final.style.display="flex"; }

// ===== HEARTS =====
const heartsContainer = document.querySelector('.hearts');

function playPop(){
  if(!audioUnlocked || !ENABLE_POP_SOUND) return;
  const s=new Audio("pop.mp3");
  s.volume=0.1; s.playbackRate=0.9+Math.random()*0.3; s.play().catch(()=>{});
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

// ===== SPARKLES =====
document.addEventListener("mousemove", e=>{
  const s=document.createElement("div");
  s.className="sparkle";
  s.style.left=e.clientX+"px";
  s.style.top=e.clientY+"px";
  document.querySelector(".sparkles").appendChild(s);
  setTimeout(()=>s.remove(),800);
});

// ===== SLIDESHOW =====
const photos = [
  "photos/pic1.jpg",
  "photos/pic2.jpg",
  "photos/pic3.jpg"
];
let index=0;
setInterval(()=>{
  if(slideshow.style.display==="flex"){
    index=(index+1)%photos.length;
    memoryPhoto.src=photos[index];
  }
},2500);

// ===== BUTTONS =====
const noBtn=document.getElementById("noBtn");
const yesBtn=document.getElementById("yesBtn");
const responseText=document.getElementById("responseText");
const moveSounds=["whoosh1.mp4","whoosh2.mp4","whoosh3.mp4","whoosh4.mp4"];

yesBtn.onclick=()=>{
  responseText.innerText="I knew it! 💖 Best decision ever 😌";
  yesBtn.style.transform="scale(1.15)";
  setTimeout(()=>yesBtn.style.transform="scale(1)",300);
};

function playMoveSound(){
  if(!audioUnlocked||!ENABLE_MOVE_SOUND)return;
  const s=new Audio(moveSounds[Math.floor(Math.random()*moveSounds.length)]);
  s.volume=0.15; s.play().catch(()=>{});
}

function moveNoButton(){
  const box=document.querySelector(".valentine-buttons").getBoundingClientRect();
  const btnW=noBtn.offsetWidth, btnH=noBtn.offsetHeight;
  const maxX=box.width-btnW, maxY=box.height-btnH;
  noBtn.style.left=Math.random()*maxX+"px";
  noBtn.style.top=Math.random()*maxY+"px";
  playMoveSound();
}

noBtn.addEventListener("mouseenter",moveNoButton);
noBtn.addEventListener("touchstart",moveNoButton);
