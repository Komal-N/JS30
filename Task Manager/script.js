const button = document.querySelector('#add-btn');
const input = document.querySelector('#input');
const div = document.querySelector('#tasks');
let taskList = [];

function addTask() {
    taskList.push(input.value);
    displayList();
    input.value = "";
}

function finishedTask(inputEl) {
    const label = inputEl.nextElementSibling;
    label.classList.toggle('strike');
}

function displayList() {
    div.innerHTML = "";
    taskList.forEach((task, index) => {
        div.innerHTML += `
        <div class="task">
            <input type="checkbox" id="${index}" onchange="finishedTask(this)" />
            <label for="${index}">${task}</label>
        </div>
        `;
    });
}

button.addEventListener('click', addTask);