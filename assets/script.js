// Variables
const startButton = $("#start");
const nextButton = $("#next");
const previousButton = $("#previous");
const submitButton = $("#submit");
const quizContainer = $("#quiz");
const resultsContainer = $("#results");
const timeDisplay = $("#time");
let currentSlide = 0;
let timer;
let count;

const myQuestions = [
  {
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich"
    },
    correctAnswer: "c"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    correctAnswer: "c"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint"
    },
    correctAnswer: "d"
  }
];

// Event listeners
submitButton.click(showResults);
previousButton.click(showPreviousSlide);
nextButton.click(showNextSlide);
startButton.click(start);

// Functions
function start() {
  startButton.hide();
  quizContainer.show();
  nextButton.show();

  // Kick things off
  buildQuiz();

  // Show the first slide
  showSlide(currentSlide);

  // Setup timer
  if(timer)
    clearInterval(timer);

  count = 30;
  timer = setInterval(function() {
    timeDisplay.text(count--);
    if(count <= 0){
      // clearInterval(timer);
      alert("Time's Up, Game Over!!!");
      clearInterval(timer);
      timeDisplay.text("");
      submitButton.hide();
      quizContainer.hide();
      nextButton.hide();
      currentSlide = 0;
      startButton.show();

    }
  }, 1000);
};

function buildQuiz(){
  // variable to store the HTML output
  const output = [];
  // for each question...
  myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(let letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
              `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
            `<div id="slide${questionNumber}" class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("\r\n")} </div>
          </div>`
        );
      }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.html(output.join("\r\n"));
}

function showResults(){
  clearInterval(timer);
  timeDisplay.text("")

  // gather answer containers from our quiz
  const answerContainers = quizContainer.find('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;
    }
  });

  let highScores;
  if(localStorage.highScores) {
    highScores = JSON.parse(localStorage.highScores)
  }

  if (highScores?.first?.score == null || numCorrect > highScores.first.score)
  {
    let myName = prompt("You got the high score! What are your initials?", "None");

    localStorage.highScores = JSON.stringify({
      first: {initials: myName, score: numCorrect},
      second: {initials: highScores?.first?.initials ?? "", score: highScores?.first?.score},
      third: {initials:highScores?.second?.initials ?? "", score: highScores?.second?.score} });
  }
  else if (highScores.second?.score == null || numCorrect > highScores.second.score)
  {
    let myName = prompt("You got the high score! What are your initials?", "None");

    localStorage.highScores = JSON.stringify({
      first: {initials: highScores.first.initials, score:  highScores.first.score},
      second: {initials: myName, score: numCorrect},
      third: {initials:highScores.second?.initials ?? "", score: highScores.second?.score} });
  }
  else if (highScores.third?.score == null || numCorrect > highScores.third.score)
  {
    let myName = prompt("You got the high score! What are your initials?", "None");

    localStorage.highScores = JSON.stringify({
      first: {initials: highScores.first.initials, score:  highScores.first.score},
      second: {initials: highScores.second.initials, score: highScores.second.score},
      third: {initials:myName, score: numCorrect} });
  }

  highScores = JSON.parse(localStorage.highScores);

  // show number of correct answers out of total
  resultsContainer.html(`
  <div>${numCorrect} out of ${myQuestions.length}.</div>
  </br>
  <table id="highScore">
    <tr><th>initials</th><th>score</th></tr>
    <tr><td>${highScores.first.initials}</td><td>${highScores.first.score ?? ""}</td></tr>
    <tr><td>${highScores.second.initials}</td><td>${highScores.second.score ?? ""}</td></tr>
    <tr><td>${highScores.third.initials}</td><td>${highScores.third.score ?? ""}</td></tr>
   </table>`);
}

function showSlide(n) {
  $(`#slide${currentSlide}`).hide();
  $(`#slide${n}`).show();
  currentSlide = n;
  if(currentSlide === 0){
    previousButton.hide();
  }
  else{
    previousButton.show();
  }
  if(currentSlide === myQuestions.length-1){
    nextButton.hide();
    submitButton.show();
  }
  else{
    nextButton.show();
    submitButton.hide();
  }
}

function showNextSlide() {
  // gather answer containers from our quiz
  const answerContainers = quizContainer.find('.answers');

  // find selected answer
  const answerContainer = answerContainers[currentSlide];
  const selector = `input[name=question${currentSlide}]:checked`;
  const userAnswer = (answerContainer.querySelector(selector) || {}).value;

  if (userAnswer !== myQuestions[currentSlide].correctAnswer) {
    count -= 5;
  }

  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}
