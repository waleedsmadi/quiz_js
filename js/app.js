// select all elements
const questionText = document.querySelector("[data-ques-text]"),
      progress = document.querySelector("[data-progress]"),
      score = document.querySelector("[data-score]"),
      theQuestion = document.querySelector("[data-question]"),
      choises = Array.from(document.querySelectorAll("[data-choise]"));


// the questions 
const questions = [
    {
        question: "What is 1 + 1?",
        choise1: 1,
        choise2: 4,
        choise3: 2,
        choise4: 10,
        answer: 3
    },

    {
        question: "What is 2 + 2?",
        choise1: 10,
        choise2: 4,
        choise3: 5,
        choise4: 10,
        answer: 2
    },

    {
        question: "What is the capital of Jordan?",
        choise1: "Amman",
        choise2: "Makah",
        choise3: "Damascus",
        choise4: "Baghdad",
        answer: 1
    },

    {
        question: "What is 4 - 1?",
        choise1: 22,
        choise2: 4,
        choise3: 24,
        choise4: 3,
        answer: 4
    },

];


// setting
let currentQuestion = {};
let SCORE = 0;
const MAX_QUESTIONS = questions.length;
let counter = 0;
let acceptingAnswers = true;
let availableQuestions = [];



// functions

function startGame(){
    // Reset setting and get the question
    counter = 0;
    SCORE = 0;
    currentQuestion = {};
    acceptingAnswers = true;
    availableQuestions = [...questions];
    getNextQuestion();
}





function getNextQuestion(){
    
    // go to result.html if finish all questions
    if(availableQuestions.length === 0 || counter > MAX_QUESTIONS){
        localStorage.setItem("the_score", SCORE);
        return window.location.assign("/result.html");
    }

    counter ++;

    // set the count of questions 
    // and set the width progress in 100%
    questionText.innerText = `Question ${counter} of ${MAX_QUESTIONS}`;
    progress.style.width = `${(counter / MAX_QUESTIONS) * 100}%`;

    // random index and bring a random quesion
    // from availableQuestions array
    const randomIndex = parseInt(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomIndex];
    theQuestion.innerText = currentQuestion.question;

    // put the choises
    choises.forEach(choise => {
        const number = choise.dataset["number"];
        choise.innerText = currentQuestion["choise"+number]
    });

    // delete the question
    availableQuestions.splice(randomIndex, 1);

    // make sure true
    acceptingAnswers = true;
    
}

choises.forEach(choise =>{

    /**
     * check if the selected choise
     * equals to the answer in current question
     * add correct class to choise and increment the score 100
     * add icorrect class to choise if it does not correct
     */
    choise.addEventListener("click", function(e){
        if(!acceptingAnswers) return
        acceptingAnswers = false;

        const selectedChoise = e.target;
        const selectedAnswer = selectedChoise.dataset['number'];

        const correct = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        selectedChoise.closest(".choise").classList.add(correct);

        if(correct === "correct"){
            SCORE += 100;
            score.innerText = SCORE;
        }

        setTimeout(function(){
            selectedChoise.closest(".choise").classList.remove(correct);
            getNextQuestion();
        }, 1000);
    });
});

// starting the game
startGame();