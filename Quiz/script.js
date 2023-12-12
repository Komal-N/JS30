const questionBank = [
    {
        id: 1,
        question: 'Which country drinks the most amount of coffee per person?',
        answer: 'Finland',
        options: ['Finland', 'Italy', 'Columbia', 'Spain']
    },
    {
        id: 2,
        question: 'What color is an airplane\’s famous black box?',
        answer: 'Orange',
        options: ['Yellow', 'Black', 'Red', 'Orange']
    },
    {
        id: 3,
        question: 'What is Bombay Duck\’s main ingredient? ',
        answer: 'Fish',
        options: ['Duck', 'Fish', 'Chicken', 'Potato']
    },
    {
        id: 4,
        question: 'In what language is the phrase \‘Hakuna Matata\’?',
        answer: 'Swahili',
        options: ['Español', 'Dutch', 'Swahili', 'Yoruba']
    },
    {
        id: 5,
        question: 'How many stars are on the United States flag?',
        answer: '50',
        options: ['52', '51', '50', '53']
    },
    {
        id: 6,
        question: 'Who is credited with inventing the World Wide Web?',
        answer: 'Tim Berners-Lee',
        options: ['Tim Berners-Lee', 'Steve Jobs', 'Bill Gates', 'Charles Babbage']
    },
    {
        id: 7,
        question: 'What is the largest social media network in the world?',
        answer: 'Facebook',
        options: ['Instagram', 'Snapchat', 'Facebook', 'Twitter']
    },
    {
        id: 8,
        question: 'A green owl is the mascot for which app?',
        answer: 'Duolingo',
        options: ['Spotify', 'Tinder', 'Duolingo', 'Kick']
    },
    {
        id: 9,
        question: 'Who is the author of \'Sherlock Holmes\'?',
        answer: 'Sir Arthur Conan Doyle',
        options: ['Sir Arthur Conan Doyle', 'Edward Conan Moyle', 'James Clear', 'Dr. Watson']
    },
    {
        id: 10,
        question: 'When did India win its first Men\'s Cricket World Cup?',
        answer: '1983',
        options: ['1999', '2011', '1983', '2023']
    },
    {
        "id": 11,
        "question": "Which planet is known as the Red Planet?",
        "answer": "Mars",
        "options": ["Venus", "Jupiter", "Mars", "Saturn"]
    },
    {
        "id": 12,
        "question": "What is the capital city of Japan?",
        "answer": "Tokyo",
        "options": ["Seoul", "Beijing", "Bangkok", "Tokyo"]
    },
    {
        "id": 13,
        "question": "Who painted the Mona Lisa?",
        "answer": "Leonardo da Vinci",
        "options": ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Leonardo da Vinci"]
    },
    {
        "id": 14,
        "question": "What is the largest mammal on Earth?",
        "answer": "Blue Whale",
        "options": ["Elephant", "Giraffe", "Blue Whale", "Dolphin"]
    },
    {
        "id": 15,
        "question": "Which famous scientist developed the theory of relativity?",
        "answer": "Albert Einstein",
        "options": ["Isaac Newton", "Galileo Galilei", "Marie Curie", "Albert Einstein"]
    },
    {
        "id": 16,
        "question": "Which ocean is the largest on Earth?",
        "answer": "Pacific Ocean",
        "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"]
    },
    {
        "id": 17,
        "question": "What is the capital of Australia?",
        "answer": "Canberra",
        "options": ["Sydney", "Melbourne", "Canberra", "Brisbane"]
    },
    {
        "id": 18,
        "question": "Who wrote 'Romeo and Juliet'?",
        "answer": "William Shakespeare",
        "options": ["Charles Dickens", "Jane Austen", "Emily Brontë", "William Shakespeare"]
    },
    {
        "id": 19,
        "question": "What is the currency of Brazil?",
        "answer": "Brazilian Real",
        "options": ["Peso", "Dollar", "Euro", "Brazilian Real"]
    },
    {
        "id": 20,
        "question": "Which element has the chemical symbol 'O'?",
        "answer": "Oxygen",
        "options": ["Gold", "Silver", "Oxygen", "Carbon"]
    }
]

let choosenOption = document.querySelector('.options');
let currentQuestion = document.querySelector('.quiz-box');
let score = 0;
let k = 0;


// Use from internet
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const randomOrder = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]).slice(10);
let answerClicked = false;

currentQuestion.innerHTML = generateQuestion(randomOrder[k++]);

function generateQuestion(qid) {
    const questionObj = questionBank[qid];
    const randomOptions = shuffle(questionObj.options);

    return `
    <div>Score: ${score}</div>
    <br />
    <div class="quiz-card">
        <p>Question ${k} / 10</p>
        <div id="question">${questionObj.question}</div>
            <div class="options" id="a" onclick="checkAnswer(this, ${qid}, '${randomOptions[0]}')">
                <input type="radio" id="option-a" name="answer">
                <label for="option-a">${randomOptions[0]}</label>
            </div>
            <div class="options" id="b" onclick="checkAnswer(this, ${qid}, '${randomOptions[1]}')">
                <input type="radio" id="option-b" name="answer">
                <label for="option-b">${randomOptions[1]}</label>
            </div>
            <div class="options" id="c" onclick="checkAnswer(this, ${qid}, '${randomOptions[2]}')">
                <input type="radio" id="option-c" name="answer">
                <label for="option-c">${randomOptions[2]}</label>
            </div>
            <div class="options" id="d" onclick="checkAnswer(this, ${qid}, '${randomOptions[3]}')">
                <input type="radio" id="option-d" name="answer">
                <label for="option-d">${randomOptions[3]}</label>
            </div>
            <div class="feedback"></div>
        </div>
    </div>`;
}

function checkAnswer(el, qid, chosenAnswer) {
    if (answerClicked) return;
    el.classList.toggle('selected');
    answerClicked = true;

    const result = questionBank[qid].answer === chosenAnswer;
    if (result === true) {
        score += 1;
        const feedbackEl = document.querySelector('.feedback');
        feedbackEl.innerHTML = '<p class="correct">You are correct!</p>';
    } else {
        displayCorrectAns(qid);
    }
    setTimeout(() => {
        answerClicked = false;
        if (k < 10) {
            currentQuestion.innerHTML = generateQuestion(randomOrder[k++]);
        } else {
            generateFinish();
        }
    }, 2000);
}

function displayCorrectAns(qid) {
    const feedbackEl = document.querySelector('.feedback');

    feedbackEl.innerHTML = `<p class="wrong">Correct Answer is ${questionBank[qid].answer}</p>`;
}

function generateFinish() {
    currentQuestion.innerHTML = `
    <div class="result">
        <p>Your Final Score is ${score} / 10</p>
        <button onclick="location.reload()">Re-take Quiz</button>
    </div>
    `;
    if (score >= 7) {
        const bodyEl = document.querySelector('body');
        party.confetti(bodyEl, {
            count: 100
        });
    }
}