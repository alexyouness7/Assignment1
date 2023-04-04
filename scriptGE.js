let questions = [
    { question: "What is the largest animal on Earth?", answers: ["African elephant", "Polar bear", "Blue whale", "Giraffe"], correctAnswer: 2 },
    { question: "What is the largest country in the world by area?", answers: ["Russia", "Canada", "China", "USA"], correctAnswer: 0 },
    { question: "The language spoken by the people by Pakistan is ? ", answers: ["Hindi", "Sindhi", "Palauan", "Nauruan"], correctAnswer: 1 },
    { question: "Which planet is closer to sun?", answers: ["Mercury", "Saturn", "Venus", "Uranus"], correctAnswer: 0 },
    { question: "In what year did World War II end?", answers: ["1935", "1945", "1955", "1965"], correctAnswer: 1 },
    { question: "Which country is the largest producer of coffee in the world?", answers: ["Vietnam", "Ethiopia", " Brazil", "Colombia"], correctAnswer: 2 },
    { question: "Who is the current CEO of Apple Inc.?", answers: ["Jeff Bezos", "Elon Musk", "Mark Zuckerberg", "Tim Cook"], correctAnswer: 3 },
    { question: "Who discovered the theory of relativity?", answers: ["Isaac Newton", "Albert Einstein", "Galileo Galileir", "Charles Darwin"], correctAnswer: 1 },
    { question: "Which animal is known for its ability to change color to match its surroundings?", answers: ["Butterfly", "Peacock", "Chameleon", "Octopus"], correctAnswer: 2 },
    { question: "Who is the best doctor?", answers: ["Antoine Aoun", "Salem Khalife", "Maroun Abi Assaf", "Ziad Eid"], correctAnswer: 3 },
  ];
  
 let userAnswers = [];
 let score = 0;
  
  displayQuestion(0);
  
  function displayQuestion(questionIndex) {
    let question = questions[questionIndex].question;
    let answers = questions[questionIndex].answers;
  
    document.querySelector(".question").textContent = questionIndex + 1 + "- " + question;
  
    let selectedAnswer = document.querySelector(".selected-answer");
    if (selectedAnswer) {
      selectedAnswer.classList.remove("selected-answer");
    }
  
    let answerElements = document.querySelectorAll(".answer");
    for (let i = 0; i < answerElements.length; i++) {
      answerElements[i].textContent = answers[i];
      answerElements[i].setAttribute("data-index", i);
    }
  }
  
  function recordAnswer(answerElement) {
    let answerElements = document.querySelectorAll(".answer");
    for (let i = 0; i < answerElements.length; i++) {
      answerElements[i].classList.remove("selected-answer");
    }
  
    answerElement.classList.add("selected-answer");
  }
  
  function nextQuestion() {
    let selectedAnswer = document.querySelector(".selected-answer");
    if (!selectedAnswer) {
      alert("Please select an answer before proceeding to the next question.");
      return;
    }
  
    let selectedAnswerIndex = Number(selectedAnswer.getAttribute("data-index"));
    userAnswers.push(selectedAnswerIndex);
  
    if (userAnswers.length == questions.length) {
      score = calculateScore();
      displayScore();
      document.querySelector(".next-button").setAttribute("disabled", true);
      return;
    }
    displayQuestion(userAnswers.length);
  }
  

function calculateScore() {
var totalScore = 0;
for (let i = 0; i < questions.length; i++) {
if (userAnswers[i] == questions[i].correctAnswer) {
totalScore++;
}
}
return totalScore;
}


function displayScore() {
    let container = document.querySelector(".container");
    let txt;
    if (score ===10)
       txt="EXCELLENT !";
   else if (score >=8 && score <10)
       txt ="Very Good !";
    else if (score>=6 &&score<8)
       txt ="Good";
    else if (score === 5)
       txt="Average";
    else txt ="Insufficient";  

    container.innerHTML = "<h1>" + txt + " " + sessionStorage.getItem('username') + "</h1><p>" + score + " / " + questions.length + "</p>";

    for (let i = 0; i < questions.length; i++) {
        let questionResultElement = document.createElement("div");
        let question = questions[i].question;
        let userAnswer = userAnswers[i];
        let correctAnswer = questions[i].correctAnswer;
        
        if (userAnswer == correctAnswer) {
            questionResultElement.innerHTML = "<p>" + question + ": <span style='color:green;'>Correct!</span></p>";
        } else {
            let correctAnswerText = questions[i].answers[correctAnswer];
            questionResultElement.innerHTML = "<p>" + question + ": <span style='color:red;'>Incorrect!</span> The correct answer is " + correctAnswerText + ".</p>";
        }

        container.appendChild(questionResultElement);
    }
}
