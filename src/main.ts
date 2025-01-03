import './style.scss';
import quizQuestions from "../data/quizQuestions";

// Hitta elementet där frågorna ska visas
const questionDiv = document.querySelector('#question') as HTMLElement;
const resultDiv = document.querySelector('#result') as HTMLElement; // För resultatvisning
let currentQuestionIndex: number;
let score = 0; // För att hålla koll på poäng
let run = 1;  //spelomgång
let QuestionIndexSelector: number; //För att skriva ut 10 frågor i taget

// Funktion för att slumpa frågorna
function shuffleQuestions() {
  currentQuestionIndex = 0; //nollställer variablerna när man slumpar frågorna
  QuestionIndexSelector  = 10;
  for (let i = quizQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizQuestions[i], quizQuestions[j]] = [quizQuestions[j], quizQuestions[i]];
  }
}

// Funktion för att visa en fråga
function showQuestion() {
  if (!questionDiv) {
    console.error('questionDiv hittades inte!');
    return;
  }

  // Kontrollera att indexet är giltigt
  if (currentQuestionIndex >= quizQuestions.length) {
    console.error("Försöker visa en fråga utanför quizQuestions-arrayens gränser.");
    return;
  }
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionDiv.innerHTML = `
    <div class="question">
      <p><strong>Fråga ${currentQuestionIndex + 1} av 10</strong></p> <!-- Frågenummer -->
      <p>${currentQuestion.question}</p>
      <div class="answer">
        <form id="quiz-form" class="quiz_form">
          <ul>
            ${currentQuestion.options.map(option =>
              `<li>
                <input type="radio" id="option-${option}" name="answer" value="${option}">
                <label for="option-${option}">${option}</label>
              </li>`).join('')}
          </ul>
          <div id="user-correct-answer" class="user-correct-answer"></div>
          <div id="user-wrong-answer" class="user-wrong-answer"></div>
          <button class="next_question" type="button" id="next-button">Nästa fråga</button>
        </form>
      </div>        
    </div>
  `;

  const nextButton = document.getElementById('next-button');
  if (nextButton) {
    nextButton.addEventListener('click', checkAnswer);
  }
}

// Funktion för att kontrollera användarens svar
function checkAnswer() {
  const userCorrectAnswerDiv = document.querySelector('#user-correct-answer') as HTMLElement; // Hämta det dynamiska elementet
  const userWrongAnswerDiv = document.querySelector('#user-wrong-answer') as HTMLElement; // Hämta det dynamiska elementet


  const selectedOption = document.querySelector('input[name="answer"]:checked') as HTMLInputElement;

  if (!selectedOption) {
    alert("Vänligen välj ett svar innan du går vidare!");
    return;
  }

  // Kontrollera att indexet är giltigt
  if (currentQuestionIndex >= quizQuestions.length) {
    console.error("currentQuestionIndex är utanför gränsen för quizQuestions-arrayen.");
    return;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Kolla om svaret är rätt
  if (selectedOption.value === currentQuestion.correctAnswer) {
    score++;
    userCorrectAnswerDiv.style.display = 'block'; // Visa feedback
    userCorrectAnswerDiv.innerHTML = `<p>Du svarade ${currentQuestion.correctAnswer} </br>Det är rätt svar!</p>`;
    console.log('rätt', currentQuestion.correctAnswer);
  }
  else {
    userWrongAnswerDiv.style.display = 'block'; // Visa feedback
    userWrongAnswerDiv.innerHTML = `<p>Du svarade fel. </br>Rätt svar är ${currentQuestion.correctAnswer}</p>`;
  }

  // Gå vidare till nästa fråga efter att användaren fått se feedback i 5 sekunder
  setTimeout(() => {
  currentQuestionIndex++;
  if (currentQuestionIndex < QuestionIndexSelector) { 
    showQuestion();
  } else {
    clearInterval(startcount);
    showResultSlide(); // Visa resultatet
  }
}, 2000);
}

// Funktion för att visa resultatet på en ny slide
function showResultSlide() {
  if (!resultDiv || !questionDiv) {
    console.error('resultDiv eller questionDiv hittades inte!');
    return;
  }
  
  questionDiv.style.display = 'none'; // Dölj frågorna
  resultDiv.style.display = 'block'; // Visa resultatet

  resultDiv.innerHTML = `
    <div class="result-slide">
      <h2>Quiz Resultat</h2>
      <p>Du fick ${score} av 10 rätt!</p>
      <p>Det tog ${minute} minuter och ${second} sekunder.</p>
      <button id="restart-button">Gör om quizet</button>
    </div>
  `;

  const restartButton = document.getElementById('restart-button') as HTMLButtonElement;
  if (restartButton) {
    restartButton.addEventListener('click', restartQuiz);
  }
}

// Funktion för att göra om quizet
function restartQuiz() {
  if (run == quizQuestions.length/10){ //om man har spelat genom frågorna återställs allt för en ny spelomgång
    currentQuestionIndex = 0;
    shuffleQuestions();
    run = 1;
  }
  else if (run < quizQuestions.length/10){ 
    run ++;
    QuestionIndexSelector += 10;
  }
  score = 0;
  timerStart();
  questionDiv.style.display = 'block'; // Visa frågorna igen
  resultDiv.style.display = 'none'; // Dölj resultatet
  showQuestion();
}

// Slumpa frågorna och visa den första
shuffleQuestions();
showQuestion();

//------------------------------------
//------------------------------------
//-----------------TIMER--------------
//------------------------------------
//------------------------------------

const timerdiv = document.querySelector("#timer") as HTMLElement;
let startcount: any;
let second: number;
let counter: number;
let minute: number;

function timerStart(){ //sätter tiderna till 0 varje gång man callar på funktionen för att återställa siffrorna
    counter = 0;
    second = 0;
    minute = 0;
    startcount = setInterval(timer, 1000);//Använd clearInterval(startcount) när du vill stanna timern, man callar funktionen som vanligt

} 

function timer(){
  counter++;
  second = Math.floor(counter % 60); //ändrar om räkningvariablen till sekunder och minuter
  minute = Math.floor(counter / 60);
  const minutes = String(minute).padStart(2, '0'); //lägger till 0'a i slutet av timern
  const seconds = String(Math.floor(counter % 60)).padStart(2, '0');
  timerdiv.innerHTML = `${minutes}:${seconds}`; //utskrift
}

// Starta quiz knapp 

const startScreen = document.querySelector('#start-screen') as HTMLElement;
const quizSection = document.querySelector('#quiz-section') as HTMLElement;
const startButton = document.querySelector('#start-button') as HTMLButtonElement;

// Starta quiz när användaren klickar på "Starta Quiz"
startButton.addEventListener('click', () => {
  startScreen.style.display = 'none'; 
  quizSection.style.display = 'block'; 
  timerStart(); 
  showQuestion(); 
});

