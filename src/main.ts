import './normalize.scss'
import './style.scss'

interface Question {
    question: string
    options: string[]
    correctAnswer: string
}

const quizQuestions: Question[] = [
    {
        question:
            "Vilken svensk regissör är känd för filmer som 'Fanny och Alexander' och 'Det sjunde inseglet'?",
        options: [
            'A) Ingmar Bergman',
            'B) Roy Andersson',
            'C) Lasse Hallström',
        ],
        correctAnswer: 'A) Ingmar Bergman',
    },
    {
        question:
            'Vilken animerad film innehåller en talande åsna som görs av Eddie Murphy?',
        options: ['A) Shrek', 'B) Kung Fu Panda', 'C) Madagaskar'],
        correctAnswer: 'A) Shrek',
    },
]



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
