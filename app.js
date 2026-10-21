// QuizApp
"use strict";

// STEP 1: Question Bank
const questionBank = [
    {
        question: "What does CSS stand for?",
        choices: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correctAnswer: 1
    },
    {
        question: "Which language provides structure to a webpage?",
        choices: ["Java", "CSS", "HTML", "Python"],
        correctAnswer: 2
    },
    {
        question: "Which language makes a webpage interactive?",
        choices: ["HTML", "CSS", "JavaScript", "SQL"],
        correctAnswer: 2
    },
    {
        question: "Which HTML tag creates a hyperlink?",
        choices: ["<link>", "<a>", "<p>", "<h1>"],
        correctAnswer: 1
    },
    {
        question: "Which CSS property changes text color?",
        choices: ["font-size", "background", "margin", "color"],
        correctAnswer: 3
    }
];

// STEP 2: Select HTML Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const startForm = document.getElementById("start-form");
const playerNameInput = document.getElementById("player-name");
const nameError = document.getElementById("name-error");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const progress = document.getElementById("progress");
const questionElement = document.getElementById("question");
const choicesContainer = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const playerResult = document.getElementById("player-result");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

// STEP 3: Initialize Variables
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answerSubmitted = false;
let playerName = "";

// STEP 4: Start the Quiz
function startQuiz(event) {
    event.preventDefault();

    playerName = playerNameInput.value.trim();
    if (!playerName) {
        nameError.textContent = "Please enter your name to start the quiz.";
        playerNameInput.focus();
        return;
    }

    nameError.textContent = "";
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    answerSubmitted = false;

    startScreen.classList.add("hidden");
    resultsScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    nextBtn.textContent = "Next";

    loadQuestion();
}

// STEP 5: Load a Question
function loadQuestion() {
    const currentQuestion = questionBank[currentQuestionIndex];

    progress.textContent =
        `Question ${currentQuestionIndex + 1} of ${questionBank.length}`;

    questionElement.textContent = currentQuestion.question;

    choicesContainer.innerHTML = "";
    feedback.textContent = "";

    selectedAnswer = null;
    answerSubmitted = false;
    nextBtn.disabled = true;

    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");

        button.textContent = choice;
        button.type = "button";

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        choicesContainer.appendChild(button);
    });
}

// STEP 6: Select an Answer
function selectAnswer(index) {
    if (answerSubmitted) {
        return;
    }

    selectedAnswer = index;

    const choiceButtons =
        choicesContainer.querySelectorAll("button");

    choiceButtons.forEach((button, buttonIndex) => {
        button.classList.toggle(
            "selected",
            buttonIndex === index
        );
    });

    nextBtn.disabled = false;
}

// STEP 7: Check Answer and Move Forward
function handleNextClick() {
    // Check the answer on the first click
    if (!answerSubmitted) {
        if (selectedAnswer === null) {
            return;
        }

        answerSubmitted = true;

        const currentQuestion =
            questionBank[currentQuestionIndex];

        const choiceButtons =
            choicesContainer.querySelectorAll("button");

        // Highlight the correct answer
        choiceButtons[currentQuestion.correctAnswer]
            .classList.add("correct");

        if (selectedAnswer === currentQuestion.correctAnswer) {
            score++;

            feedback.textContent = "Correct! Well done.";
        } else {
            choiceButtons[selectedAnswer]
                .classList.add("incorrect");

            feedback.textContent =
                "Incorrect! The correct answer is highlighted.";
        }

        // Prevent changing the answer
        choiceButtons.forEach(button => {
            button.disabled = true;
        });

        nextBtn.textContent =
            currentQuestionIndex === questionBank.length - 1
                ? "View Results"
                : "Next Question";

        return;
    }

    // Move to the next question on the next click
    currentQuestionIndex++;

    if (currentQuestionIndex < questionBank.length) {
        nextBtn.textContent = "Next";
        loadQuestion();
    } else {
        showResults();
    }
}

// STEP 8: Display Results
function showResults() {
    quizScreen.classList.add("hidden");
    resultsScreen.classList.remove("hidden");

    playerResult.textContent = `${playerName}, here are your results:`;
    finalScore.textContent =
        `You scored ${score}/${questionBank.length}!`;

    const percentage =
        (score / questionBank.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent =
            "Excellent! You answered every question correctly!";
    } else if (percentage >= 70) {
        resultMessage.textContent =
            "Great job! You have a good understanding of the subject.";
    } else if (percentage >= 40) {
        resultMessage.textContent =
            "Good effort! Keep practicing to improve your score.";
    } else {
        resultMessage.textContent =
            "Keep learning! Practice makes progress.";
    }
}

// STEP 9: Restart the Quiz
function restartQuiz() {
    resultsScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");

    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    answerSubmitted = false;

    nextBtn.textContent = "Next";
}

// STEP 10: Attach Event Listeners
startForm.addEventListener("submit", startQuiz);
nextBtn.addEventListener("click", handleNextClick);
restartBtn.addEventListener("click", restartQuiz);
