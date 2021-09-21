var startButton = document.querySelector("#start-button");
var countDown = document.querySelector("#countdown");
var question = document.querySelector("#question");
var answerOne = document.querySelector("#one");
var answerTwo = document.querySelector("#two");
var answerThree = document.querySelector("#three");
var answerFour = document.querySelector("#four");
var scoreList = document.querySelector("#scores");

var time;
var timer;
var score;
var gameWon = true;
var qCount = 1;

var questionArray = ["question 1", "question 2", "question 3", "question 4"];
var answerArray = [
  ["answer 1-1", "answer 1-2", "answer 1-3", "answer 1-4"],
  ["answer 2-1", "answer 2-2", "answer 2-3", "answer 2-4"],
  ["answer 3-1", "answer 3-2", "answer 3-3", "answer 3-4"],
  ["answer 4-1", "answer 4-2", "answer 4-3", "answer 4-4"]
];

function startQuiz() {
    time = 10;
    startCountdown();
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

}

function gameLost() {

}

function askQuestion(x) {
    var cut = document.getElementById("start-button");
    cut.remove();
    question.textContent = questionArray[x];
    answerOne.textContent = answerArray[x][0];
    answerTwo.textContent = answerArray[x][1];
    answerThree.textContent = answerArray[x][2];
    answerFour.textContent = answerArray[x][3];
    qCount++;
}

startButton.addEventListener("click", startQuiz);