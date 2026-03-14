// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Which language is primarily used for web development?",
    answers: [
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
      { text: "Java", correct: false },
    ],
  },
  {
    question:
      "Which language is known as the language of the Android platform?",
    answers: [
      { text: "Swift", correct: false },
      { text: "Kotlin", correct: true },
      { text: "Ruby", correct: false },
      { text: "C#", correct: false },
    ],
  },
  {
    question: "Which of the following is a frontend JavaScript framework?",
    answers: [
      { text: "React", correct: true },
      { text: "Django", correct: false },
      { text: "Flask", correct: false },
      { text: "Laravel", correct: false },
    ],
  },
  {
    question: "Which programming language is used for iOS app development?",
    answers: [
      { text: "Swift", correct: true },
      { text: "Java", correct: false },
      { text: "PHP", correct: false },
      { text: "Kotlin", correct: false },
    ],
  },
  {
    question: "Which language is commonly used for machine learning?",
    answers: [
      { text: "Python", correct: true },
      { text: "C#", correct: false },
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
    ],
  },
  {
    question: "Which language is mainly used for system programming?",
    answers: [
      { text: "C", correct: true },
      { text: "PHP", correct: false },
      { text: "JavaScript", correct: false },
      { text: "Ruby", correct: false },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Go", correct: false },
      { text: "HTML", correct: true },
      { text: "Rust", correct: false },
      { text: "Swift", correct: false },
    ],
  },
  {
    question: "Which language runs in a browser?",
    answers: [
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
      { text: "Python", correct: false },
      { text: "Java", correct: false },
    ],
  },
  {
    question: "Which language is primarily used for backend development?",
    answers: [
      { text: "PHP", correct: true },
      { text: "CSS", correct: false },
      { text: "HTML", correct: false },
      { text: "TypeScript", correct: false },
    ],
  },
  {
    question: "Which programming language was developed by Microsoft?",
    answers: [
      { text: "C#", correct: true },
      { text: "Python", correct: false },
      { text: "Ruby", correct: false },
      { text: "Go", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
