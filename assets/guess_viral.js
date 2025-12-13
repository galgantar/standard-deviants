async function loadJsonlFile(filePath) {
    try {
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const textContent = await response.text();
        const lines = textContent.split(/\r?\n/);
        const parsedData = [];
        for (const [index, line] of lines.entries()) {
            const trimmedLine = line.trim();
            if (trimmedLine) {
                const jsonObject = JSON.parse(trimmedLine);
                parsedData.push(jsonObject);
            }
        }

        return parsedData;

    } catch (error) {
        console.error('Error loading or processing the JSONL file:', error);
        return []; // Return an empty array or re-throw the error
    }
}

const svg = document.getElementById("overlay");
const width = 600;
const height = 250;

svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

async function createEmoji(correct) {
  const size = Math.random() * 20 + 24;
  const x = Math.random() * width;
  const duration = Math.random() + 2;

  const emoji = document.createElementNS("http://www.w3.org/2000/svg", "text");
  if (correct) {
    emoji.textContent = "😊";
  }
  else{
    emoji.textContent = "😢";
  }
  emoji.setAttribute("x", x);
  emoji.setAttribute("y", -20);
  emoji.setAttribute("font-size", size);

  const anim = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
  anim.setAttribute("attributeName", "transform");
  anim.setAttribute("type", "translate");
  anim.setAttribute("from", `0 0`);
  anim.setAttribute("to", `0 ${height + 40}`);
  anim.setAttribute("dur", `${duration}s`);
  anim.setAttribute("repeatCount", "1");

  emoji.appendChild(anim);
  svg.appendChild(emoji);

  anim.beginElement();

  setTimeout(() => svg.removeChild(emoji), duration * 1000);
}

let intervalId = 0;
let pressedNew = false;

async function newRound() {
    document.getElementById("loading-message").style.display = "block";
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = "";
    const viral = await loadJsonlFile("assets/jsons//viral_posts.jsonl");
    const nonviral = await loadJsonlFile("assets/jsons/non_viral_posts.jsonl");

    const v = viral[Math.floor(Math.random() * viral.length)];
    const nv = nonviral.sort(() => 0.5 - Math.random()).slice(0, 1);

    const posts = [v, ...nv].sort(() => 0.5 - Math.random());
    const letters = ["A", "B"];

    const correctIndex = posts.indexOf(v);
    document.getElementById("loading-message").style.display = "none";

    posts.forEach((post, i) => {
        const div = document.createElement("div");
        div.className = "post-card";
        div.innerHTML = `
            <h3>Post ${letters[i]}</h3>
            <p class="title-text"><strong>Title:</strong> ${post.Title}</p>
            <p><strong>Subreddit:</strong> r/${post.SOURCE_SUBREDDIT}</p>
            <p class="body-text">${post.Text}</p>
            <button class="guess-btn" data-letter="${letters[i]}">Guess</button>
        `;
        postsContainer.appendChild(div);
    });

    document.querySelectorAll(".guess-btn").forEach(async (btn, i) => {
    btn.onclick = async () => {
        if (!pressedNew){
            pressedNew = true;
            clearInterval(intervalId);
            const cards = document.querySelectorAll(".post-card");
            cards.forEach(card => card.classList.remove("correct", "wrong"));
            const correctCard = cards[correctIndex];
            const selectedCard = cards[i];
            correctCard.classList.add("correct");
            intervalId = setInterval(() => createEmoji(correctCard == selectedCard), 200);
            if (i !== correctIndex) {
                selectedCard.classList.add("wrong");
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
            clearInterval(intervalId);
            newRound();
            pressedNew = false;
        }
        
    };
});
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("new-round-btn").onclick = newRound;
    newRound();
});
