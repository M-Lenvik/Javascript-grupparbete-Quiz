import './_normalize.scss';
import './style.scss';
import quizQuestions from "../data/quizQuestions";

// Hitta elementet där frågorna ska visas
const questionDiv = document.querySelector('#question') as HTMLElement;
let currentQuestionIndex = 0;
let score = 0; // För att hålla koll på poäng

// Funktion för att slumpa frågorna
function shuffleQuestions() {
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

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Skapa HTML för frågan och alternativen
  questionDiv.innerHTML = `
    <div class="question">
      <p>${currentQuestion.question}</p>
      <div class="answer">
        <form id="quiz-form">
          <ul>
            ${currentQuestion.options.map(option =>
              `<li>
                <input type="radio" id="option-${option}" name="answer" value="${option}">
                <label for="option-${option}">${option}</label>
              </li>`
            ).join('')}
          </ul>
          <button class="next_question" type="button" id="next-button">Nästa fråga</button>
        </form>
      </div>        
    </div>
  `;

  // Lägg till event för att gå till nästa fråga
  const nextButton = document.getElementById('next-button');
  if (nextButton) {
    nextButton.addEventListener('click', checkAnswer);
  }
}

// Funktion för att kontrollera användarens svar
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="answer"]:checked') as HTMLInputElement;
  
  if (!selectedOption) {
    alert("Vänligen välj ett svar innan du går vidare!");
    return;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Kolla om svaret är rätt
  if (selectedOption.value === currentQuestion.correctAnswer) {
    score++;
    alert("Rätt svar!");
  } else {
    alert(`Fel svar! Rätt svar är: ${currentQuestion.correctAnswer}`);
  }

  // Gå vidare till nästa fråga
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    alert(`Quizet är klart! Du fick ${score} av ${quizQuestions.length} rätt.`);
    showRestartButton(); // Visa "Gör om quizet"-knappen när quizet är klart
  }
}

// Visa knappen för att starta om quizet
function showRestartButton() {
  const restartButtonContainer = document.getElementById('restart-container');
  if (restartButtonContainer) {
    restartButtonContainer.innerHTML = `
      <button id="restart-button">Gör om quizet</button>
    `;
    const restartButton = document.getElementById('restart-button') as HTMLButtonElement;
    restartButton.addEventListener('click', restartQuiz);
  }
}

// Funktion för att göra om quizet
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  shuffleQuestions(); 
  showQuestion();
  const restartButtonContainer = document.getElementById('restart-container');
  if (restartButtonContainer) {
    restartButtonContainer.innerHTML = ''; 
  }
}

shuffleQuestions();
showQuestion();