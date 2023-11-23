let symbol = 'X';

const boxEls = document.querySelectorAll('.box');

function click() {
    if (this.innerText === "") {
        this.innerText = symbol;
        this.classList.toggle(symbol);
    }
    checkWin(this);
    symbol = symbol === 'X' ? 'O' : 'X';
}

function checkWin(box) {
    const state = [];
    boxEls.forEach(box => state.push(box.innerText));

    //Row Conditions
    const r1 = state.slice(0, 3);
    const r2 = state.slice(3, 6);
    const r3 = state.slice(6, 9);

    //Column Conditions
    const c1 = [state[0], state[3], state[6]];
    const c2 = [state[1], state[4], state[7]];
    const c3 = [state[2], state[5], state[8]];

    //Diagonal Conditions
    const d1 = [state[0], state[4], state[8]];
    const d2 = [state[2], state[4], state[6]];

    if (check(r1) || check(r2) || check(r3) || check(c1) || check(c2) || check(c3) || check(d1) || check(d2)) {
        alert("Winner is " + symbol);
        boxEls.forEach(box => box.removeEventListener('click', click));

    }
}

function check(arr) {
    if (arr[0] === arr[1] && arr[1] === arr[2]) {
        if (arr[0] === '') return false;
        return true;
    } else {
        return false;
    }
}
boxEls.forEach(box => box.addEventListener('click', click));