import './style.scss';
import quizQuestions from "../data/quizQuestions";

// Hitta elementet där frågorna ska visas
const questionDiv = document.querySelector('#question') as HTMLElement;
const resultDiv = document.querySelector('#result') as HTMLElement; // För resultatvisning
let currentQuestionIndex: number;
let score = 0; // För att hålla koll på poäng
let run = 1;  // Spelomgång
let QuestionIndexSelector: number; // För att skriva ut 10 frågor i taget

// Funktion för att slumpa frågorna
function shuffleQuestions() {
  currentQuestionIndex = (run - 1) * 10; // Startindex för den aktuella omgången
  QuestionIndexSelector = run * 10; // Slutindex för den aktuella omgången
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
  if (currentQuestionIndex >= QuestionIndexSelector || currentQuestionIndex >= quizQuestions.length) {
    showResultSlide(); // Visa resultatet om vi når slutet av omgången
    return;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  resultDiv.style.display = 'none';
  questionDiv.innerHTML = `
    <div class="question">
      <p><strong>Fråga ${(currentQuestionIndex % 10) + 1} av 10</strong></p> <!-- Frågenummer -->
      <p>${currentQuestion.question}</p>
      <div class="answer">
        <form id="quiz-form" class="quiz-form">
          <ul>
            ${currentQuestion.options.map(option =>
              `<li>
                <input type="radio" id="option-${option}" name="answer" value="${option}">
                <label for="option-${option}">${option}</label>
              </li>`).join('')}
          </ul>
          <div id="user-correct-answer" class="user-correct-answer"></div>
          <div id="user-wrong-answer" class="user-wrong-answer"></div>
          <button class="next-question" type="button" id="next-button">Nästa fråga</button>
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
  const userCorrectAnswerDiv = document.querySelector('#user-correct-answer') as HTMLElement;
  const userWrongAnswerDiv = document.querySelector('#user-wrong-answer') as HTMLElement;
  const selectedOption = document.querySelector('input[name="answer"]:checked') as HTMLInputElement;
  const nextButton = document.getElementById('next-button') as HTMLButtonElement;

  if (!selectedOption) {
    alert("Vänligen välj ett svar innan du går vidare!");
    return;
  }

  // Göm knappen när den tryckts på
  if (nextButton) {
    nextButton.style.display = 'none';
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (selectedOption.value === currentQuestion.correctAnswer) {
    score++;
    userCorrectAnswerDiv.style.display = 'block';
    userCorrectAnswerDiv.innerHTML = `<p>Du svarade ${currentQuestion.correctAnswer} </br>Det är rätt svar!</p>`;
  } else {
    userWrongAnswerDiv.style.display = 'block';
    userWrongAnswerDiv.innerHTML = `<p>Du svarade fel. </br>Rätt svar är ${currentQuestion.correctAnswer}</p>`;
  }

  
  setTimeout(() => {
    if (nextButton) {
      nextButton.style.display = 'block';
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < QuestionIndexSelector) {
      showQuestion();
    } else {
      clearInterval(startcount);
      showResultSlide();
    }
  }, 2000);
}

// Funktion för att visa resultatet på en ny slide
function showResultSlide() {
  if (!resultDiv || !questionDiv) {
    console.error('resultDiv eller questionDiv hittades inte!');
    return;
  }

  questionDiv.style.display = 'none';
  resultDiv.style.display = 'block';

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
  if (run >= quizQuestions.length / 10) {
    run = 1;
  } 
  else {
    run++;
  }

  currentQuestionIndex = (run - 1) * 10;
  QuestionIndexSelector = run * 10;
  score = 0;
  timerStart();
  questionDiv.style.display = 'block';
  resultDiv.style.display = 'none';
  showQuestion();
}

// Slumpa frågorna och visa den första
shuffleQuestions();
showQuestion();

// TIMER
const timerdiv = document.querySelector("#timer") as HTMLElement;
let startcount: any;
let second: number;
let counter: number;
let minute: number;

function timerStart() {
  counter = 0;
  second = 0;
  minute = 0;
  startcount = setInterval(timer, 1000);
}

function timer() {
  counter++;
  second = Math.floor(counter % 60);
  minute = Math.floor(counter / 60);
  const minutes = String(minute).padStart(2, '0');
  const seconds = String(second).padStart(2, '0');
  timerdiv.innerHTML = `${minutes}:${seconds}`;
}

// Starta quiz knapp 
const startScreen = document.querySelector('#start-screen') as HTMLElement;
const quizSection = document.querySelector('#quiz-section') as HTMLElement;
const startButton = document.querySelector('#start-button') as HTMLButtonElement;

startButton.addEventListener('click', () => {
  startScreen.style.display = 'none';
  quizSection.style.display = 'block';
  timerStart();
  showQuestion();
});
