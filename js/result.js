// select element
const resultScoreEl = document.querySelector("[data-result-score]");


// get the score from local storage
const SCORE = localStorage.getItem('the_score');

// append the score to the element
resultScoreEl.innerText = `Yor Score is ${SCORE}`;
