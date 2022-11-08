// var list
// var startBtn = document.querySelector("#start");
// var quizCard = $('.card')
// var buttonHide = $('.card-footer')
// var nextBtn = document.querySelector("#next")
// var questionContent = document.querySelector("#question")
// var answerElement = $('#answers')


// // // start button
// startBtn.addEventListener("click", generateQuiz)
// nextBtn.addEventListener("click", setNextQuestion)

// // // start quiz

// function quizStart() {
//     console.log('quiz started')
//     buttonHide.hide()
//     quizCard.show()
//     currentQuestionIndex=0
//     setNextQuestion()
// }

// // // next question

// function setNextQuestion() {
//     console.log('setNextQuestion')
//     resetState()
//     showQuestion()
//   }

// //   display questions

// function showQuestion(questionsIndex) {
//     console.log('showQuestion')
//     questionContent.Text = questionsIndex.question
//     questionsIndex.answers.forEach(answers => {
//       const button = document.createElement('button')
//       button.innerText = answers.text
//       button.classList.add('btn')
//       if (answers.correct) {
//         button.dataset.correct = answer.correct
//       }
//       button.addEventListener('click', selectAnswer)
//       answerElement.appendChild(button)
//     })
// }

//  function resetState() {
//     console.log('resetState')
//     clearStatusClass(document.body)
//     buttonHide.hide()
//     while (answerElement.firstChild) {
//       answerElement.removeChild(answerElement.firstChild)
//     }
//   }
  
// function selectAnswer(e) {
//     console.log("select answer")
//     const selectedButton = e.target
//     const correct = selectedButton.dataset.correct
//     setStatusClass(document.body, correct)
//     Array.from(answerElement.children).forEach(button => {
//       setStatusClass(button, button.dataset.correct)
//     })
//     if (questionsIndex.length > currentQuestionIndex + 1) {
//       buttonHide.show()
//     } else {
//       startBtn.innerText = 'Restart'
//       startBtn.show()
//     }
//   }

 

//   function clearStatusClass(element) {
//     element.classList.remove('correct')
//     element.classList.remove('wrong')
//   }

//   function setStatusClass(element, correct) {
//     clearStatusClass(element)
//     if (correct) {
//       element.classList.add('correct')
//     } else {
//       element.classList.add('wrong')
//     }
//   }
// // questions index
// const questionsIndex = [
//     {
//         question: 'What is me do for this??',
//         answers: [
//             {text: "all of them" , correct: false },
//             {text: "do them good" , correct: false },
//             {text: "food burn" , correct: true },
//             {text: "hot koolaid" , correct: false },
//         ]
//     }
// ]

// // timer

// var count = 60, timer = setInterval(function() {
//     $("#time").text(count--);
//     if(count == 1){ clearInterval(timer); 
//     alert("Time's Up!!!");}
// }, 1000);


var startBtn = document.querySelector("#start");

startBtn.addEventListener("click", generateQuiz)

function generateQuiz(){
  startBtn.style.display = 'none'
  nextButton.style.display = 'inline-block';
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

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
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

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

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
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

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();

var count = 60, timer = setInterval(function() {
    $("#time").text(count--);
    if(count == 1){ clearInterval(timer); 
    alert("Time's Up!!!");}
}, 1000);