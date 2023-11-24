const emojis = ["1f60a", "1f601", "1f60b", "1f62c", "1f9d0", "1f602", "1f600", "1f603"];
const itemMap = {};
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

emojis.forEach(emoji => {
    const id1 = Math.floor(Math.random() * arr.length);
    const a = arr[id1];

    arr.splice(id1, 1);

    const id2 = Math.floor(Math.random() * arr.length);
    const b = arr[id2];

    arr.splice(id2, 1);

    itemMap[emoji] = [a, b];

    const b1 = document.querySelector(`#box${a}`);
    const b2 = document.querySelector(`#box${b}`);

    b1.innerHTML = `<span>${String.fromCodePoint(parseInt(emoji, 16))}</span>`;
    b2.innerHTML = `<span>${String.fromCodePoint(parseInt(emoji, 16))}</span>`;

    b1.addEventListener('click', showCard);
    b2.addEventListener('click', showCard);
});

function showCard() {
    if (this.classList.value.includes('open') || this.classList.value.includes('matched')) return;
    this.classList.toggle('open');
    const openBoxes = document.querySelectorAll('.open');

    if (openBoxes.length === 1) return;

    if (openBoxes[0].innerText === openBoxes[1].innerText) {
        openBoxes[0].classList.toggle('matched');
        openBoxes[0].classList.toggle('open');

        openBoxes[1].classList.toggle('matched');
        openBoxes[1].classList.toggle('open');

        checkWinner();
    } else {
        setTimeout(() => {
            openBoxes[0].classList.toggle('open');
            openBoxes[1].classList.toggle('open');
        }, 500);
    }
}

function checkWinner() {
    const matchedBoxes = document.querySelectorAll('.matched');

    if (matchedBoxes.length === 16) {
        window.alert('You won!');
    }
}