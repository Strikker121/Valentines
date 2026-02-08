const memories = [
  {
    img: "photos/pic1.jpg",
    text: "The day we met and everything changed 💫"
  },
  {
    img: "photos/pic2.jpg",
    text: "Our first photo together ❤️"
  },
  {
    img: "photos/pic3.jpg",
    text: "Laughing at nothing but loving everything 😌"
  }
];

const timeline = document.getElementById("timeline");

memories.forEach(m => {
  const div = document.createElement("div");
  div.className = "memory";

  div.innerHTML = `
    <img src="${m.img}">
    <div class="memory-text">${m.text}</div>
  `;

  timeline.appendChild(div);
});

function goBack() {
  window.location.href = "index.html";
}
