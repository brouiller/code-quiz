var startButton = document.querySelector("#start-button");
var countDown = document.querySelector("#countdown");
var question = document.querySelector("#question");
var answerOne = document.querySelector("#one");
var answerTwo = document.querySelector("#two");
var answerThree = document.querySelector("#three");
var answerFour = document.querySelector("#four");
var scoreList = document.querySelector("#scores");
var answerClass = document.querySelectorAll(".answer");

var time;
var timer;
var score;
var gameWon = true;
var qCount = 0;

var questionArray = ["question 1", "question 2", "question 3", "question 4", "question 5"];
var answerArray = [
  ["answer 1-1", "answer 1-2", "answer 1-3", "answer 1-4"],
  ["answer 2-1", "answer 2-2", "answer 2-3", "answer 2-4"],
  ["answer 3-1", "answer 3-2", "answer 3-3", "answer 3-4"],
  ["answer 4-1", "answer 4-2", "answer 4-3", "answer 4-4"],
  ["answer 5-1", "answer 5-2", "answer 5-3", "answer 5-4"],
];
var questionAnswers = [
  {
    question: "1. Which type of variable is 'var x = 1;'?",
    answer1: "array",
    answer2: "string",
    answer3: "object",
    answer4: "number",
    correct: "number"
  },
  {
    question: "2. Which html tag will you find below an external JavaScript link?",
    answer1: "</body>",
    answer2: "<div>",
    answer3: "<footer>",
    answer4: "</html>",
    correct: "</body>"
  },
  {
    question: "3. Which method is used to change the text inside an html element?",
    answer1: "this",
    answer2: "length",
    answer3: "textContent",
    answer4: "toLowerCase",
    correct: "textContent"
  },
  {
    question: "4. How many times will this loop run? for(var i = 0; i <= 4, i++)",
    answer1: "1",
    answer2: "0",
    answer3: "5",
    answer4: "4",
    correct: "5"
  },
  {
    question: "5. Which of these is a popular JavaScript library?",
    answer1: "Bootstrap",
    answer2: "PHP",
    answer3: "qJerry",
    answer4: "jQuery",
    correct: "jQuery"
  }
];


function startQuiz() {
  time = 10;
  startCountdown();
  var cut = document.getElementById("start-button");
  cut.remove();
  askQuestion(qCount);
}

function startCountdown() {
  timer = setInterval(function () {
    time--;
    countDown.textContent = time;
    if (time >= 0) {
      if (gameWon && time < 0) {
        score = time;
        clearInterval(timer);
        saveScore();
      }
    }
    if (time === 0) {
      clearInterval(timer);
      gameLost();
    }
  }, 1000);
}

function saveScore() {
  console.log("score saved");
}

function gameLost() {}

function askQuestion(x) {
  if (x < questionAnswers.length) {
    question.textContent = questionAnswers[x].question;
    for (var i = 0; answerClass.length > i; i++) {
      answerClass[i].style.border = "1px solid var(--honeyDew)";
    }
    answerOne.textContent = questionAnswers[x].answer1;
    answerOne.addEventListener("click", nextQuestion);
    answerTwo.textContent = questionAnswers[x].answer2;
    answerTwo.addEventListener("click", nextQuestion);
    answerThree.textContent = questionAnswers[x].answer3;
    answerThree.addEventListener("click", nextQuestion);
    answerFour.textContent = questionAnswers[x].answer4;
    answerFour.addEventListener("click", nextQuestion);
    qCount++;
  }
}

function nextQuestion() {
  if (qCount < questionAnswers.length) {
    var z = qCount;
    askQuestion(z);
  } else {
    saveScore();
  }
}

startButton.addEventListener("click", startQuiz);
