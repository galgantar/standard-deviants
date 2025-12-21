// State variable to track the current position in the tree
let currentNodeId = "q_start";
let FIRST_CLUSTER = "";
let QUIZ_DATA = "";

/**
 * Renders the current question or result into the HTML container.
 * @param {string} nodeId - The ID of the node to render.
 */
function renderQuestion(nodeId, quizContainer) {
    const node = QUIZ_DATA[nodeId];

    if (node.is_leaf) {
        quizContainer.innerHTML = `
            <div class="result-card">
                <h2>Your Virality score:</h2>
                <p><strong>${node.question}</strong></p>
                <button class="option-button" onclick="resetQuiz()">Start Over</button>
            </div>
        `;
        return;
    }

    quizContainer.innerHTML = "";

    // 2. Render a standard question node
    if (node.clusters == "false"){
        quizContainer.innerHTML = `
            <h3>${node.question}</h3>
            <div class="options-container">
                <button class="option-button" onclick="handleAnswer('B', false)">
                    ${node.option_B}
                </button>
                <button class="option-button" onclick="handleAnswer('A', false)">
                    ${node.option_A}
                </button>
            </div>
        `;
    }
    else{
        quizContainer.innerHTML = `
            <h3>${node.question}</h3>
            <div class="options-container">
                <button class="option-button" onclick="handleAnswer('Gaming', true)">
                    ${node.Gaming}
                </button>
                <button class="option-button" onclick="handleAnswer('Politics', true)">
                    ${node.Politics}
                </button>
                <button class="option-button" onclick="handleAnswer('Sports', true)">
                    ${node.Sports}
                </button>
                <button class="option-button" onclick="handleAnswer('Technology', true)">
                    ${node.Technology}
                </button>
                <button class="option-button" onclick="handleAnswer('RedditMeta', true)">
                    ${node.RedditMeta}
                </button>
                <button class="option-button" onclick="handleAnswer('PopCulture', true)">
                    ${node.PopCulture}
                </button>
                <button class="option-button" onclick="handleAnswer('Lifestyle', true)">
                    ${node.Lifestyle}
                </button>
            </div>
        `;
    }
}

/**
 * Handles the user's answer and updates the current node ID.
 * @param {string} choice - 'A' for the left path, 'B' for the right path.
 */
function handleAnswer(choice, cluster) {
    const quizContainer = document.getElementById('quiz-app');
    const currentNode = QUIZ_DATA[currentNodeId];
    let nextNodeId;
    if (!cluster){
        nextNodeId = choice === 'A' ? currentNode.path_A : currentNode.path_B;
    }
    else{
        if (FIRST_CLUSTER == ""){
            FIRST_CLUSTER = choice;
            currentNodeId = "q_target"
            renderQuestion(currentNodeId, quizContainer);
            return
        }
        else{
            fetch('assets/jsons/quiz_data_' + FIRST_CLUSTER + '_' + choice + '.json')
                .then(response => response.json())
                .then(data => {
                    QUIZ_DATA = data;
                    currentNodeId = "q_start"
                    renderQuestion(currentNodeId, quizContainer)
                    return
                });
        }
    }
    
    // Update the state and render the next question
    currentNodeId = nextNodeId;
    renderQuestion(currentNodeId, quizContainer);
}

/**
 * Resets the quiz to the starting node.
 */
function resetQuiz() {
    const quizContainer = document.getElementById('quiz-app');
    setquizdata();
    FIRST_CLUSTER = "";
    currentNodeId = "q_start";
    renderQuestion(currentNodeId, quizContainer);
}

// Start the quiz when the page loads
window.onload = () => {
    setquizdata();
    const quizContainer = document.getElementById('quiz-app');
    if (quizContainer) {
        renderQuestion(currentNodeId, quizContainer);
    }
};

function setquizdata(){
    QUIZ_DATA = {
        "q_start": {
            "question": "Which Cluster would you like to post in?",
            "Gaming": "Gaming",
            "Politics": "Politics",
            "Sports": "Sports",
            "Technology": "Technology",
            "RedditMeta": "RedditMeta",
            "PopCulture": "PopCulture",
            "Lifestyle": "Lifestyle",
            "clusters": "true",
        },
        "q_target": {
            "question": "Which Cluster would you like to link to?",
            "Gaming": "Gaming",
            "Politics": "Politics",
            "Sports": "Sports",
            "Technology": "Technology",
            "RedditMeta": "RedditMeta",
            "PopCulture": "PopCulture",
            "Lifestyle": "Lifestyle",
            "clusters": "true",
        },
    };
}
