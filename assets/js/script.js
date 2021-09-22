var startButton = document.querySelector("#start-button");
var countDown = document.querySelector("#countdown");
var question = document.querySelector("#question");
var answerOne = document.querySelector("#one");
var answerTwo = document.querySelector("#two");
var answerThree = document.querySelector("#three");
var answerFour = document.querySelector("#four");
var scoreList = document.querySelector("#scores");
var answerClass = document.querySelectorAll(".answer");
var result = document.querySelector("#result");

var time;
var timer;
var score;
var gameWon = true;
var qCount = 0;
var check;


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
    answer1: "2",
    answer2: "3",
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
  time = 100;
  startCountdown();
  var cut = document.getElementById("start-button");
  cut.remove();
  askQuestion(qCount);
  console.log("startQ: " + qCount);
};
function startCountdown() {
  timer = setInterval(function () {
    time--;
    countDown.textContent = time;
    if (time >= 0) {
      if (time < 0) {
        score = time;
        clearInterval(timer);
      };
    };
    if (time === 0) {
      clearInterval(timer);
      gameLost();
    }
  }, 1000);
};

function saveScore() {
  console.log("score saved");
};

function gameLost() {
  console.log("game lost");
};

function askQuestion(x) {
  console.log("x: " + x);
  console.log("askQ count: " + qCount);
  answerOne.removeEventListener("click", nextQuestion);
  answerTwo.removeEventListener("click", nextQuestion);
  answerThree.removeEventListener("click", nextQuestion);
  answerFour.removeEventListener("click", nextQuestion);
  if (x < 5) {
    question.textContent = questionAnswers[x].question;
    //loop to style border of answer boxes
    for (var i = 0; answerClass.length > i; i++) {
      answerClass[i].style.border = "1px solid var(--honeyDew)";
    };
    answerOne.textContent = questionAnswers[x].answer1;
    answerOne.addEventListener("click", nextQuestion);
    if (questionAnswers[x].answer1 === questionAnswers[x].correct) {
      check = "one";
    };
    answerTwo.textContent = questionAnswers[x].answer2;
    answerTwo.addEventListener("click", nextQuestion);
    if (questionAnswers[x].answer2 === questionAnswers[x].correct) {
      check = "two";
    };
    answerThree.textContent = questionAnswers[x].answer3;
    answerThree.addEventListener("click", nextQuestion);
    if (questionAnswers[x].answer3 === questionAnswers[x].correct) {
      check = "three";
    };
    answerFour.textContent = questionAnswers[x].answer4;
    answerFour.addEventListener("click", nextQuestion);
    if (questionAnswers[x].answer4 === questionAnswers[x].correct) {
      check = "four";
    };
  };
};

function nextQuestion(event) {
  console.log(event.target.id);
  qCount++;
    if (event.target.id === check) {
      result.textContent = "correct";
      console.log("true: " + time);
    } else {
      result.textContent = "incorrect";
      console.log("false: " + time);
      time = time - 10;
  };
    if (qCount < 6) {
      askQuestion(qCount);
    } else {
      saveScore();
  };
};

startButton.addEventListener("click", startQuiz);
