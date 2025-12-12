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

async function newRound() {
    document.getElementById("loading-message").style.display = "block";
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = "";
    const viral = await loadJsonlFile("assets/jsons//viral_posts.jsonl");
    const nonviral = await loadJsonlFile("assets/jsons/non_viral_posts.jsonl");

    const v = viral[Math.floor(Math.random() * viral.length)];
    const nv = nonviral.sort(() => 0.5 - Math.random()).slice(0, 3);

    const posts = [v, ...nv].sort(() => 0.5 - Math.random());
    const letters = ["A", "B", "C", "D"];

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

    document.querySelectorAll(".guess-btn").forEach((btn, i) => {
    btn.onclick = () => {
        console.log("Clicked");
        const cards = document.querySelectorAll(".post-card");
        cards.forEach(card => card.classList.remove("correct", "wrong"));
        const correctCard = cards[correctIndex];
        const selectedCard = cards[i];
        correctCard.classList.add("correct");
        if (i !== correctIndex) {
            selectedCard.classList.add("wrong");
        }
    };
});
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("new-round-btn").onclick = newRound;
    newRound();
});
