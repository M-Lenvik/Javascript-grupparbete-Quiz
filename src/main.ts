import './_normalize.scss';
import './style.scss';
import quizQuestions from "../data/quizQuestions";

// Hitta elementet där frågorna ska visas
const questionDiv = document.querySelector('#question') as HTMLElement;
const resultDiv = document.querySelector('#result') as HTMLElement; // För resultatvisning
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

  // Kontrollera att indexet är giltigt
  if (currentQuestionIndex >= quizQuestions.length) {
    console.error("Försöker visa en fråga utanför quizQuestions-arrayens gränser.");
    return;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

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
              </li>`).join('')}
          </ul>
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
  }

  // Gå vidare till nästa fråga
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResultSlide(); // Visa resultatet
  }
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
      <p>Du fick ${score} av ${quizQuestions.length} rätt!</p>
      <p>Det tog ${time.minute} minuter och ${time.seconds} sekunder.</p>
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
  currentQuestionIndex = 0;
  score = 0;
  newtimer();
  shuffleQuestions();
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
class timerVar {
  constructor(
    public seconds: number,
    public counter: number,
    public minute: number
  ) {
    this.seconds = seconds;
    this.counter = counter;
    this.minute = minute;
  }
}

let time = new timerVar(0, 0, 0);

function newtimer() { // Återställ timer
  time.counter = 0;
  time.seconds = 0;
  time.minute = 0;

  const startcount = setInterval(() => {
    time.counter++;
    time.minute = Math.floor(time.counter / 60);
    time.seconds = Math.floor(time.counter % 60);

    if (time.minute < 10 && time.seconds < 10) {
      timerdiv.innerHTML = `0${time.minute}:0${time.seconds}`;
    } else if (time.minute < 10 && time.seconds >= 10) {
      timerdiv.innerHTML = `0${time.minute}:${time.seconds}`;
    } else if (time.seconds < 10) {
      timerdiv.innerHTML = `${time.minute}:0${time.seconds}`;
    } else {
      timerdiv.innerHTML = `${time.minute}:${time.seconds}`;
    }

    if (currentQuestionIndex >= quizQuestions.length) {
      clearInterval(startcount);
    }
  }, 1000);
}

newtimer();
