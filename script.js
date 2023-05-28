const questions = [
  {
    question: "1. Inside which HTML element do we put the JavaScript?",
    answers: [
      {
        text: "Object-Oriented",
        correct: true,
      },
      {
        text: "Object-Based",
        correct: false,
      },
      {
        text: "Procedural",
        correct: false,
      },
      {
        text: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question: "2. Which of the following keywords is used to define a variable in Javascript?",
    answers: [
      {
        text: "var",
        correct: false,
      },
      {
        text: "let",
        correct: false,
      },
      {
        text: "Both A and B",
        correct: true,
      },
      {
        text: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question: "3. Which of the following methods is used to access HTML elements using Javascript?",
    answers: [
      {
        text: "geElementbyId()",
        correct: false,
      },
      {
        text: "getElementByClassName()",
        correct: false,
      },
      {
        text: "Both A and B",
        correct: true,
      },
      {
        text: "None of the Above",
        correct: false,
      },
    ],
  },
  {
    question: "4. Upon encountering empty statements, what does the Javascript Interpreter do?",
    answers: [
      {
        text: "Throws and error",
        correct: false,
      },
      {
        text: "Ignores the statements",
        correct: true,
      },
      {
        text: "Gives a warning",
        correct: false,
      },
      {
        text: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question: "5. Which of the following methods can be used to display data in some form using Javascript?",
    answers: [
      {
        text: "document.write()",
        correct: false,
      },
      {
        text: "console.log()",
        correct: false,
      },
      {
        text: "window.alert()",
        correct: false,
      },
      {
        text: "All of the above",
        correct: true,
      },
    ],
  },
  {
    question: "6. How can a datatype be declared to be a constant type?",
    answers: [
      {
        text: "const",
        correct: true,
      },
      {
        text: "var",
        correct: false,
      },
      {
        text: "let",
        correct: false,
      },
      {
        text: "constant",
        correct: false,
      },
    ],
  },
  {
    question: `7. What will be the output of the following code snippet?
    ${
    <code>
        <script type="text/javascript">
            a = 5 + "9";
            document.write(a);
        </script>
    </code>}`,
    answers: [
      {
        text: "Compilation Error",
        correct: false,
      },
      {
        text: "14",
        correct: false,
      },
      {
        text: "Runtime Error",
        correct: false,
      },
      {
        text: "59",
        correct: true,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextbutton.innerHTML = "Next";
  showQuestions();
}

function showQuestions() {
  resetState();
  // to get question
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextbutton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextbutton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextbutton.innerHTML = "play Again";
  nextbutton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    showScore();
  }
}

nextbutton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
