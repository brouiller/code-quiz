var startButton = document.querySelector('#start-button');
var countDown = document.querySelector('#countdown');
var question = document.querySelector('#question');
var answerOne = document.querySelector('#one');
var answerTwo = document.querySelector('#two');
var answerThree = document.querySelector('#three');
var answerFour = document.querySelector('#four');
var scoreList = document.querySelector('#scores');
var answerClass = document.querySelectorAll('.answer');
var result = document.querySelector('#result');

var time;
var timer;
var score;
var gameWon = true;
var qCount = 0;
var check;
var highscores = [];

//an array of objects to use for questions/answers
var questionAnswers = [
  {
    question: '1. Which type of variable is "var x = 1;"?',
    answer1: 'array',
    answer2: 'string',
    answer3: 'object',
    answer4: 'number',
    correct: 'number'
  },
  {
    question: '2. Which html tag will you find below an external JavaScript link?',
    answer1: '</body>',
    answer2: '<div>',
    answer3: '<footer>',
    answer4: '</html>',
    correct: '</body>'
  },
  {
    question: '3. Which method is used to change the text inside an html element?',
    answer1: 'this',
    answer2: 'length',
    answer3: 'textContent',
    answer4: 'toLowerCase',
    correct: 'textContent'
  },
  {
    question: '4. How many times will this loop run? for(var i = 0; i <= 4, i++)',
    answer1: '2',
    answer2: '3',
    answer3: '5',
    answer4: '4',
    correct: '5'
  },
  {
    question: '5. Which of these is a popular JavaScript library?',
    answer1: 'Bootstrap',
    answer2: 'PHP',
    answer3: 'qJerry',
    answer4: 'jQuery',
    correct: 'jQuery'
  }
];

//gets the timer going, removes the start button, displays the questions
function startQuiz() {
  time = 100;
  startCountdown();
  var cut = document.getElementById('start-button');
  cut.remove();
  askQuestion(qCount);
};

//fills out the highscores section with data from local storage
function printHighscores() {
  var existingScore = JSON.parse(localStorage.getItem("allEntries"));
  if (existingScore) {
    for (var i = 0; i < existingScore.length; i++) {
      existingScore.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
      var li = document.createElement('li');
      li.innerHTML = ""+existingScore[i].initials+" - "+ existingScore[i].score;
      document.getElementById('scores').appendChild(li);
    };
  };
};

//creates a timer
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
      alert("You lost.");
      location.reload();
    }
  }, 1000);
};

//clears the screen, creates a form to submit initials, and saves scores
function saveScore(x) {
  score = x;
  console.log('score saved');
  for (i = 0; answerClass.length > i; i++){
    answerClass[i].setAttribute("class", "answer");
    answerClass[i].style.cursor = "unset";
  };
  question.textContent = 'All done!';
  answerOne.textContent = 'Your final score is ' + score + '.'
  answerTwo.innerHTML =
  'Enter initials: <input type="input" id="input" maxlength="3" size="3" /><button type="submit" id="submit">Submit</button>';
  answerThree.textContent = '';
  answerThree.style.border = '';
  answerFour.textContent = '';
  answerFour.style.border = '';
  result.textContent = '';
  clearInterval(timer);
  countDown.textContent = score;

//add listener to submit button and save scores to local storage
  var inputEl = document.getElementById("input")
  var submitEl = document.getElementById('submit');
  console.log(submitEl);
  submitEl.addEventListener("click", function (event) {
    event.preventDefault();
    var existingScores = JSON.parse(localStorage.getItem("allEntries"));
    if (existingScores == null) existingScores = [];
    var entry = {
      initials: inputEl.value,
      score: score,
    };
    localStorage.setItem("entry", JSON.stringify(entry));
    existingScores.push(entry);
    localStorage.setItem("allEntries", JSON.stringify(existingScores));
    location.reload();
  });
};

//displays questions and answers on the screen and builds click functionality
function askQuestion(x) {
  console.log('x: ' + x);
  console.log('askQ count: ' + qCount);
  answerOne.removeEventListener('click', nextQuestion);
  answerTwo.removeEventListener('click', nextQuestion);
  answerThree.removeEventListener('click', nextQuestion);
  answerFour.removeEventListener('click', nextQuestion);
  if (x < 5) {
    question.textContent = questionAnswers[x].question;
    //loop to style border of answer boxes
    for (var i = 0; answerClass.length > i; i++) {
      answerClass[i].style.border = '1px solid var(--honeyDew)';
      answerClass[i].setAttribute('class', 'answer hover');
    };
    answerOne.textContent = questionAnswers[x].answer1;
    answerOne.addEventListener('click', nextQuestion);
    if (questionAnswers[x].answer1 === questionAnswers[x].correct) {
      check = 'one';
    };
    answerTwo.textContent = questionAnswers[x].answer2;
    answerTwo.addEventListener('click', nextQuestion);
    if (questionAnswers[x].answer2 === questionAnswers[x].correct) {
      check = 'two';
    };
    answerThree.textContent = questionAnswers[x].answer3;
    answerThree.addEventListener('click', nextQuestion);
    if (questionAnswers[x].answer3 === questionAnswers[x].correct) {
      check = 'three';
    };
    answerFour.textContent = questionAnswers[x].answer4;
    answerFour.addEventListener('click', nextQuestion);
    if (questionAnswers[x].answer4 === questionAnswers[x].correct) {
      check = 'four';
    };
  } else {
    saveScore(time);
  };
};

//checks to see if the answer was correct, applies penalty for incorrect answers, and loops through to the next question
function nextQuestion(event) {
  console.log(event.target.id);
  qCount++;
    if (event.target.id === check) {
      result.textContent = 'correct';
      console.log('true: ' + time);
    } else {
      result.textContent = 'incorrect';
      console.log('false: ' + time);
      if(time > 10){
        time -= 10;
      } else {
      alert("You lost.");
      location.reload();
      };
  };
    if (qCount < 6) {
      askQuestion(qCount);
    };
};
//prints the highscores from local storage on load
printHighscores();

//starts the game when the start quiz button is pressed
startButton.addEventListener('click', startQuiz);
