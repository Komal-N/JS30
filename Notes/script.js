const notesList = document.querySelector('.note-list');
const newNote = document.getElementById('note');
const title = document.getElementById('title');
const newNoteContainer = document.querySelector('.note');
const deleteBtn = document.getElementById('delete');
let notes = [];

const SAVE = 0;
const EDIT = 1;

let mode = SAVE;
let editingNoteId = null;
deleteBtn.style.visibility = "hidden";

function newNoteFn() {
    mode = SAVE;
    title.value = '';
    newNote.value = '';
    deleteBtn.style.visibility = "hidden";
}

function showNote(noteId) {
    mode = EDIT;
    editingNoteId = noteId;
    // Filter notes variable by noteId
    const currNote = notes.find(note => note.id === noteId);
    // Set title to noteId's title
    title.value = currNote.title;
    // Set newNote text to noteId's text
    newNote.value = currNote.text;

    deleteBtn.style.visibility = "visible";
}

// Function - createNote(note) => Creates a new note, and adds it to notes[] array
function createNote(note) {
    notes.push(note);
}

// Function - editNote(note) => Edits an existing note, and replaces it in notes[] array
function editNote(note) {
    const index = notes.findIndex(_note => _note.id === note.id);
    notes[index] = note;
}

function saveNote() {
    const note = {
        id: new Date().getTime(),
        title: title.value,
        text: newNote.value
    };

    if (mode === SAVE) {
        createNote(note);
    } else {
        editNote({
            ...note,
            id: editingNoteId,
        });
    }

    displayList();
    title.value = "";
    newNote.value = "";
}

function displayList() {
    notesList.innerHTML = '';
    notes.forEach(note => {
        notesList.innerHTML += `<li class="list-group-item list-group-item-action" onclick="showNote(${note.id})">${note.title}</li>`;
    });
}

function deleteNote() {
    notes = notes.filter(note => note.id !== editingNoteId);
    title.value = "";
    newNote.value = "";
    displayList();
}
