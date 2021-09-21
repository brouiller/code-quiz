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
  if (x < questionArray.length) {
    question.textContent = questionArray[x];
    for (var i = 0; answerClass.length > i; i++) {
      answerClass[i].style.border = "1px solid var(--honeyDew)";
    }
    answerOne.textContent = answerArray[x][0];
    answerOne.addEventListener("click", nextQuestion);
    answerTwo.textContent = answerArray[x][1];
    answerTwo.addEventListener("click", nextQuestion);
    answerThree.textContent = answerArray[x][2];
    answerThree.addEventListener("click", nextQuestion);
    answerFour.textContent = answerArray[x][3];
    answerFour.addEventListener("click", nextQuestion);
    qCount++;
  }
}

function nextQuestion() {
  if (qCount < questionArray.length) {
    var z = qCount;
    askQuestion(z);
  } else {
    saveScore();
  }
}

startButton.addEventListener("click", startQuiz);
