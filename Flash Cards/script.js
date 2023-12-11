let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

function saveCard() {
    let question = document.querySelector('#question');
    let answer = document.querySelector('#answer');

    if (question.value === '' || answer.value === '') return;

    let item = {
        question: question.value,
        answer: answer.value
    }

    flashcards.push(item);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));

    question.value = '';
    answer.value = '';

    renderFlashcards();
}

function renderFlashcards() {
    let flashcardsEl = document.querySelector('#flashcards');

    flashcardsEl.innerHTML = '';
    flashcards.forEach((flashcard, idx) => {
        flashcardsEl.innerHTML += `
        <div class="flashcard" onclick="toggleAnswer(this)">
            <span class="close" onclick="deleteCard(${idx})">ⓧ</span>
            <p class="question">${flashcard.question}</p>
            <p class="answer">${flashcard.answer}</p>
        </div>
        `;
    });
}

function toggleAnswer(e) {
    e.children[2].classList.toggle('show');
}

function deleteCard(idx) {
    flashcards = flashcards.filter((flashcard, i) => idx !== i);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    renderFlashcards();
}