interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

const quizQuestions: Question[] = [
    {
        question: "Vilken svensk regissör är känd för filmer som 'Fanny och Alexander' och 'Det sjunde inseglet'?",
        options: ["A) Ingmar Bergman", "B) Roy Andersson", "C) Lasse Hallström"],
        correctAnswer: "A) Ingmar Bergman"
    },
    {
        question: "Vilken skådespelare spelar huvudrollen i filmen 'En man som heter Ove'?",
        options: ["A) Rolf Lassgård", "B) Mikael Persbrandt", "C) Peter Stormare"],
        correctAnswer: "A) Rolf Lassgård"
    },
    {
        question: "Vad heter trilogin regisserad av Peter Jackson som baseras på J.R.R. Tolkiens böcker?",
        options: ["A) Sagan om ringen", "B) Narnia", "C) Hobbit"],
        correctAnswer: "A) Sagan om ringen"
    },
    {
        question: "Vilken svensk skådespelare spelade Lisbeth Salander i den första filmatiseringen av Stieg Larssons Millennium-serie?",
        options: ["A) Noomi Rapace", "B) Alicia Vikander", "C) Sofia Helin"],
        correctAnswer: "A) Noomi Rapace"
    },
    {
        question: "Vilken regissör ligger bakom filmerna 'Pulp Fiction' och 'Kill Bill'?",
        options: ["A) Quentin Tarantino", "B) Martin Scorsese", "C) Christopher Nolan"],
        correctAnswer: "A) Quentin Tarantino"
    },
    {
        question: "Vilken svensk film från 1998 handlar om två tonårsflickor i en småstad och har blivit en modern klassiker?",
        options: ["A) Fucking Åmål", "B) Tillsammans", "C) Jalla! Jalla!"],
        correctAnswer: "A) Fucking Åmål"
    },
    {
        question: "I vilken film säger Arnold Schwarzenegger den berömda repliken 'I'll be back'?",
        options: ["A) Terminator", "B) Predator", "C) Total Recall"],
        correctAnswer: "A) Terminator"
    },
    {
        question: "I vilken filmserie förekommer Hogwarts skola för häxkonster och trolldom?",
        options: ["A) Harry Potter", "B) Twilight", "C) Game of Thrones"],
        correctAnswer: "A) Harry Potter"
    },
    {
        question: "I vilken film hörs den berömda repliken 'May the Force be with you'?",
        options: ["A) Star Wars", "B) Star Trek", "C) Guardians of the Galaxy"],
        correctAnswer: "A) Star Wars"
    },
    {
        question: "Vilken animerad film innehåller en talande åsna som görs av Eddie Murphy?",
        options: ["A) Shrek", "B) Kung Fu Panda", "C) Madagaskar"],
        correctAnswer: "A) Shrek"
    }
];

export default quizQuestions;