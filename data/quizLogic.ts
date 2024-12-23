import quizQuestions, { Question } from './quizQuestions';

function getRandomQuestions(questions: Question[], count: number): Question[] {
    // Kopiera arrayen för att inte påverka originalet
    const questionsCopy = [...questions];

    // Slumpa ordningen på frågorna
    for (let i = questionsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionsCopy[i], questionsCopy[j]] = [questionsCopy[j], questionsCopy[i]];
    }

    // Returnera de första `count` frågorna
    return questionsCopy.slice(0, count);
}

// Få 10 slumpmässiga frågor
const gameQuestions = getRandomQuestions(quizQuestions, 10);
console.log(gameQuestions);

export { getRandomQuestions };
