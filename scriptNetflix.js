let questions = [
    { question: "In the Netflix series \"Stranger Things\" what is the name of the alternate dimension where the monster comes from?", answers: ["The Other Side", "The Underworld", "The Upside Down", "The Dark World"], correctAnswer: 2 },
    { question: "What is the name of the Netflix series about a teenage girl who takes her own life and leaves behind tapes explaining why?", answers: ["Elite", "13 Reasons Why", "Riverdale", "Outer Banks"], correctAnswer: 1 },
    { question: "What is the name of the virtual assistant in the dating show Too Hot to Handle?", answers: ["Anna", "Lana", "Sarah", "Emma"], correctAnswer: 1 },
    { question: "The popular series Squid Game was produced in which country?", answers: ["Japan", "China", "South Korea", "India"], correctAnswer: 2 },
    { question: "Who was killed in the first season of \"Elite\"?", answers: ["Carla", "Polo", "Samuel", "Marina"], correctAnswer: 3 },
    { question: "Which Netflix series stars Lily Collins as a young American woman who moves to Paris to work for a marketing firm?", answers: ["Emily in Paris", "Never Have I Ever", "The Umbrella Academye", "You"], correctAnswer: 0 },
    { question: "Which Netflix series is a Japanese anime series that follows the story of a young boy who dreams of becoming the world's greatest detective?", answers: ["One Piece", "Death Note", "Naruto", "Detective Conan"], correctAnswer: 3 },
    { question: "In the Netflix series Money Heist, what is the name of the mastermind behind the heist?", answers: ["Rio", "Denver", "Professor", "Berlin"], correctAnswer: 2 },
    { question: "Which Netflix series is set in the fictional town of Winden, Germany, and involves time travel and multiple timelines?", answers: ["The Crown", "Dark", "Ozark", "Mindhunter"], correctAnswer: 1 },
    { question: "When was Netflix founded?", answers: ["1997", "2000", "2003", "2005"], correctAnswer: 0 },
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
  
    if (userAnswers.length == questions.length - 2) {
      let nextButton = document.querySelector(".next-button");
      nextButton.textContent = "Submit";
      nextButton.removeEventListener("click", nextQuestion);
      nextButton.addEventListener("click", displayScore);
    } else if (userAnswers.length == questions.length) {
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
 
