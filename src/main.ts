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
    
    alert(`Quizet är klart! Du fick ${score} av ${quizQuestions.length} rätt. Det tog ${time.minute} Minuter och ${time.seconds} sekunder!`);
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
  newtimer();
  shuffleQuestions(); 
  showQuestion();
  const restartButtonContainer = document.getElementById('restart-container');
  if (restartButtonContainer) {
    restartButtonContainer.innerHTML = ''; 
  }
}

shuffleQuestions();
showQuestion();


//------------------------------------
//------------------------------------
//-----------------TIMER--------------
//------------------------------------
//------------------------------------


const timerdiv = document.querySelector("#timer") as HTMLElement;
class timerVar{ 
    constructor(
        
        public seconds: number,
        public counter: number,
        public minute: number
    ){
        this.seconds = seconds;
        this.counter = counter;
        this.minute = minute;
        
        
    }

}
let time = new timerVar(0,0,0);
function newtimer(){ //sätter tiderna till 0 varje gång man callar på funktionen för att återställa siffrorna
    time.counter = 0;
    time.seconds = 0;
    time.minute = 0;
    
    const startcount = setInterval(() => { 
        time.counter++;
        time.minute = Math.floor(time.counter / 60);
        time.seconds = Math.floor(time.counter % 60);

        if(time.minute < 10 && time.seconds < 10){//Utskrift med 0 om sekunder/minuter är mindre än 10
            timerdiv.innerHTML = `0${time.minute}:0${time.seconds}`;
        }
        else if (time.minute < 10 && time.seconds >= 10){
          timerdiv.innerHTML = `0${time.minute}:${time.seconds}`;
        }
        else if (time.seconds < 10){
            timerdiv.innerHTML = `${time.minute}0${time.seconds}`;
        }
        else{
            timerdiv.innerHTML = `${time.minute}:${time.seconds}`; 
        }
        console.log(time.minute, time.seconds);
        if (currentQuestionIndex >= quizQuestions.length){
          clearInterval(startcount);
        }
        
        
        
        
    }, 1000);//Använd clearInterval(startcount) när du vill stanna timern, man callar funktionen som vanligt

    
} 
newtimer();
