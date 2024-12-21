import './normalize.scss'
import './style.scss'
import { quizQuestions } from './quizQuestions'; 

function startQuiz() {
  quizQuestions.forEach((q) => {
    console.log(`Q: ${q.question}`);
    console.log(`A: ${q.answer}`);
  });
}

startQuiz();


const questionDiv = document.querySelector('#question') as HTMLElement;

function showQuestion() { 
    if (!questionDiv) {
        console.error('questionDiv hittades inte!');
        return;
    }

    const questionList = quizQuestions[0];

    questionDiv.innerHTML += `
        <div id="question" class="question">
            <p>${questionList.question}</p>
            <div class="answer">
                <form id="quiz-form">
                    <ul>
                        ${questionList.options.map((option) =>
                            `
                            <li>
                            <input type="radio" id="option-${option}" name="answer" value="${option}">
                            <label for="option-${option}">${option}</label>
                            </li>`
                        ).join('')}
                    </ul>
                    <button class="next_question" type="submit">Rätta mitt svar</button>
                </form>
            </div>        
        </div>
    `;}
    
showQuestion();
console.log(showQuestion);
