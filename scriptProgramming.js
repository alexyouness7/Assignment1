let questions = [
    { question: "Which of the following is not a valid way to declare a variable in JavaScript?", answers: ["var x = 5;", "const y = 10;", "let z;", "string a = \"hello\";"], correctAnswer: 3 },
    { question: "What does SQL stand for?", answers: ["Structured Query Language", "Server Query Language", "Standard Query Language", "System Query Language"], correctAnswer: 0 },
    { question: "What is the purpose of encryption in information system security?", answers: ["To improve system performance", "To enhance user experience", "To increase network speed and efficiency", "To protect sensitive data from unauthorized access"], correctAnswer: 3 },
    { question: "Which of the following is a popular programming language for building iOS apps?", answers: ["Kotlin", "Swift", "PHP", "Ruby"], correctAnswer: 1 },
    { question: "A loop that never ends is referred to as a(n)_________.", answers: ["Infinite loop","While loop", "Recursive loop", "for loop"], correctAnswer: 0 },
    { question: "What is the purpose of the \"break\" keyword in a loop?", answers: ["To skip the current iteration of the loop", "To exit the loop entirely", "To continue to the next iteration of the loop", "None of the above"], correctAnswer: 1 },
    { question: "What is a compiler?", answers: ["A program that generates random code", "A program that helps programmers find and fix errors in their code", "A program that executes code line by line", "A program that translates source code into machine code"], correctAnswer: 3 },
    { question: "Which of the following programming languages is not a statically-typed language?", answers: ["Java", "C#", "Python", "C++"], correctAnswer: 2 },
    { question: "Which sorting algorithm has the worst time complexity?", answers: ["Quicksort", "Mergesort", "Bubblesort", "Selection sort"], correctAnswer: 2 },
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
 
