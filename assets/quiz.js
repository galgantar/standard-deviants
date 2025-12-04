// State variable to track the current position in the tree
let currentNodeId = "q_start";

/**
 * Renders the current question or result into the HTML container.
 * @param {string} nodeId - The ID of the node to render.
 */
function renderQuestion(nodeId, quizContainer) {
    const node = QUIZ_DATA[nodeId];

    if (node.is_leaf) {
        quizContainer.innerHTML = `
            <div class="result-card">
                <h2>Your Recommendation:</h2>
                <p><strong>${node.question}</strong></p>
                <button class="option-button" onclick="resetQuiz()">Start Over</button>
            </div>
        `;
        return;
    }

    // 2. Render a standard question node
    quizContainer.innerHTML = `
        <h3>${node.question}</h3>
        <div class="options-container">
            <button class="option-button" onclick="handleAnswer('A')">
                ${node.option_A}
            </button>
            <button class="option-button" onclick="handleAnswer('B')">
                ${node.option_B}
            </button>
        </div>
    `;
}

/**
 * Handles the user's answer and updates the current node ID.
 * @param {string} choice - 'A' for the left path, 'B' for the right path.
 */
function handleAnswer(choice) {
    const quizContainer = document.getElementById('quiz-app');
    const currentNode = QUIZ_DATA[currentNodeId];
    
    // Determine the next node ID based on the user's choice
    let nextNodeId = choice === 'A' ? currentNode.path_A : currentNode.path_B;
    
    // Update the state and render the next question
    currentNodeId = nextNodeId;
    renderQuestion(currentNodeId, quizContainer);
}

/**
 * Resets the quiz to the starting node.
 */
function resetQuiz() {
    const quizContainer = document.getElementById('quiz-app');
    currentNodeId = "q_start";
    renderQuestion(currentNodeId, quizContainer);
}

// Start the quiz when the page loads
window.onload = () => {
    const quizContainer = document.getElementById('quiz-app');
    if (quizContainer) {
        renderQuestion(currentNodeId, quizContainer);
    }
};

const QUIZ_DATA = {
  "q_start": {
    "question": "Are you primarily interested in data visualization or data analysis?",
    "option_A": "Data Visualization",
    "path_A": "q_viz_1",
    "option_B": "Data Analysis",
    "path_B": "q_analysis_1"
  },
  "q_viz_1": {
    "question": "Do you need a static or an interactive chart?",
    "option_A": "Interactive",
    "path_A": "result_interactive",
    "option_B": "Static/Print",
    "path_B": "result_static"
  },
  "q_analysis_1": {
    "question": "Is your data time-series or categorical?",
    "option_A": "Time-Series",
    "path_A": "result_time",
    "option_B": "Categorical",
    "path_B": "q_analysis_2"
  },
  "q_analysis_2": {
    "question": "Do you want to see proportions (parts of a whole)?",
    "option_A": "Yes",
    "path_A": "result_pie",
    "option_B": "No, just compare counts",
    "path_B": "result_bar"
  },
  // --- Leaf Nodes (Results) ---
  "result_interactive": {
    "question": "Recommendation: Use a Flourish Scatter Plot or Network Graph.",
    "is_leaf": true
  },
  "result_static": {
    "question": "Recommendation: Use a simple Bar Chart or Line Chart (External Tool).",
    "is_leaf": true
  },
  "result_time": {
    "question": "Recommendation: Use a Flourish Line Chart or Animated Bar Chart Race.",
    "is_leaf": true
  },
  "result_pie": {
    "question": "Recommendation: Use a Pie/Donut Chart.",
    "is_leaf": true
  },
  "result_bar": {
    "question": "Recommendation: Use a standard Bar Chart.",
    "is_leaf": true
  }
};