let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
const passwordsList = document.querySelector('.passwords-list');
const fields = document.querySelector('.fields');
const editFields = document.querySelector('.edit-fields');
const cancel = document.querySelector('#addpw');


function add(password) {
    passwords.push(password);
    localStorage.setItem('passwords', JSON.stringify(passwords));
}

function handleSave() {
    const name = document.querySelector('#name');
    const link = document.querySelector('#link');
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');

    const passwordObj = {
        name: name.value,
        link: link.value,
        username: username.value,
        password: password.value
    };

    add(passwordObj);
    addPassword(cancel);
    showPasswords();

    name.value = '';
    link.value = '';
    username.value = '';
    password.value = '';
}


function showPasswords() {
    passwordsList.innerHTML = '';
    passwords.forEach((password, idx) => {
        passwordsList.innerHTML += `
        <div class="password" id="${idx}">
            <div onclick="editPassword(${idx})">
                <p>${password.name}</p>
                <small>${password.username}</small>
            </div>
            <div class="actions">
                <img src="trash.svg" onclick="deletePassword(${idx})" width="20"/>
            </div>
        </div>
        `
    });
}

function deletePassword(idx) {
    passwords = passwords.filter((ele, index) => idx !== index);
    localStorage.setItem('passwords', JSON.stringify(passwords));
    this.showPasswords();
    return;
}

function addPassword(e) {
    if (e.innerText === 'Cancel') {
        passwordsList.style.display = 'flex';
        fields.style.display = 'none';
        e.innerText = 'Add Password';
    } else if (e.innerText === 'Close') {
        passwordsList.style.display = 'flex';
        editFields.style.display = 'none';
        e.innerText = 'Add Password';
    } else {
        passwordsList.style.display = 'none';
        fields.style.display = 'flex';
        e.innerText = 'Cancel';
    }
}

function editPassword(id) {
    const password = passwords.find((ele, index) => index === id);

    passwordsList.style.display = 'none';
    editFields.style.display = 'flex';

    const name = document.querySelector('#e-name');
    const link = document.querySelector('#e-link');
    const username = document.querySelector('#e-username');
    const pass = document.querySelector('#e-password');
    const saveButton = document.querySelector('#e-save');

    name.value = password.name;
    link.value = password.link;
    username.value = password.username;
    pass.value = password.password;

    cancel.innerText = 'Close';
    saveButton.setAttribute('onclick', 'handleEditSave(' + id + ')');
}

function handleEditSave(id) {
    const name = document.querySelector('#e-name');
    const link = document.querySelector('#e-link');
    const username = document.querySelector('#e-username');
    const pass = document.querySelector('#e-password');

    const passwordObj = {
        name: name.value,
        link: link.value,
        username: username.value,
        password: pass.value
    };

    passwords[id] = passwordObj;
    localStorage.setItem('passwords', JSON.stringify(passwords));

    addPassword(cancel);
    showPasswords();
}