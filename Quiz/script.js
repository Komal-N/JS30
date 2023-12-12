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
    }
];
let choosenOption = document.querySelector('.options');
let currentQuestion = document.querySelector('.quiz-box');
let score = 0;

currentQuestion.innerHTML = generateQuestion(0);

function generateQuestion(qid) {
    return `
    <div>Score: ${score}</div>
    <br />
    <div class="quiz-card">
        <p>Question ${qid + 1} / 10</p>
        <div id="question">${questionBank[qid].question}</div>
            <div class="options" id="a">
                <input type="radio" id="option-a" name="answer" onchange="checkAnswer(${qid}, '${questionBank[qid].options[0]}')">
                <label for="option-a">${questionBank[qid].options[0]}</label>
            </div>
            <div class="options" id="b">
                <input type="radio" id="option-b" name="answer" onchange="checkAnswer(${qid}, '${questionBank[qid].options[1]}')">
                <label for="option-b">${questionBank[qid].options[1]}</label>
            </div>
            <div class="options" id="c">
                <input type="radio" id="option-c" name="answer" onchange="checkAnswer(${qid}, '${questionBank[qid].options[2]}')">
                <label for="option-c">${questionBank[qid].options[2]}</label>
            </div>
            <div class="options" id="d">
                <input type="radio" id="option-d" name="answer" onchange="checkAnswer(${qid}, '${questionBank[qid].options[3]}')">
                <label for="option-d">${questionBank[qid].options[3]}</label>
            </div>
            <div class="feedback"></div>
        </div>
    </div>`;
}

function checkAnswer(qid, chosenAnswer) {
    const result = questionBank[qid].answer === chosenAnswer;
    if (result === true) {
        score += 1;
        const feedbackEl = document.querySelector('.feedback');
        feedbackEl.innerHTML = '<p class="correct">You are correct!</p>';
    } else {
        displayCorrectAns(qid);
    }
    setTimeout(() => {
        if (qid < questionBank.length - 1) {
            currentQuestion.innerHTML = generateQuestion(qid + 1);
        } else {
            generateFinish();
        }
    }, 1000);
}

function displayCorrectAns(qid) {
    const feedbackEl = document.querySelector('.feedback');

    feedbackEl.innerHTML = `<p class="wrong">Correct Answer is ${questionBank[qid].answer}</p>`;
}

function generateFinish() {
    currentQuestion.innerHTML = `
    <div class="result">Your Final Score is ${score} / 10</div>
    `;
    if (score >= 7) {
        const bodyEl = document.querySelector('body');
        party.confetti(bodyEl, {
            count: 100
        });
    }
}