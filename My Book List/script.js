let myBooks = [];
const STAR_FILLED = "★";
const STAR_EMPTY = "☆";

const button = document.querySelector('#search-btn');
const input = document.querySelector('#search-input');
const results = document.querySelector('.results');
const bookList = document.querySelector('#book-list');
let searchResults = [];

function getBooks() {
    const query = input.value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    this.disabled = true;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const imgData = data.items.filter(book => book.volumeInfo.imageLinks)
            const bookData = imgData.map(book => {
                const description = book.volumeInfo.description;
                const authors = book.volumeInfo.authors;

                return {
                    id: book.id,
                    name: book.volumeInfo.title,
                    author: authors ? authors[0] : 'No Author',
                    description: description ? description.slice(0, 250) + "..." : "No Description Found",
                    img: book.volumeInfo.imageLinks.thumbnail
                }
            })
            this.disabled = false;
            searchResults = bookData;
            refreshSearch();
        });
}

function renderBook(book) {
    return `
    <div class="result" id="${book.id}">
        <div class="result-img">
            <img src="${book.img}" alt="No image found">
        </div>
        <div class="result-info">
            <button class="star" onclick="toggleList(this, '${book.id}')">
            ${myBooks.find(b => b.id === book.id) !== undefined ? STAR_FILLED : STAR_EMPTY}
            </button>
            <p><b>${book.name}</b></p>
            <p><i>${book.author}</i></p>
            <p>${book.description}</p>
        </div>
    </div>`;
}

function renderList(book) {
    return `
    <div class="result">
        <div class="result-img">
            <img src="${book.img}" alt="No image found">
        </div>
        <div class="result-info">
            <button class="star" onclick="toggleList(this, '${book.id}')">${STAR_FILLED}</button>
            <p><b>${book.name}</b></p>
            <p><i>${book.author}</i></p>
        </div>
    </div>`;
}

function toggleList(el, id) {
    if (el.innerText === STAR_FILLED) {
        removeBookFromList(el, id);
    } else {
        addBookToList(el, id);
    }
    refreshList();
    refreshSearch();
}

function addBookToList(el, id) {
    el.innerText = STAR_FILLED;
    const s = searchResults.filter(book => book.id === id);
    myBooks.push(s[0]);
}

function removeBookFromList(el, id) {
    el.innerText = STAR_EMPTY;
    const s = myBooks.filter(book => book.id !== id);
    myBooks = s;
}

function refreshList(list = myBooks) {
    bookList.innerHTML = "";
    list.map(book => {
        const html = renderList(book);
        bookList.innerHTML += html;
    });
}

function refreshSearch() {
    results.innerHTML = "";
    searchResults.forEach(book => {
        const html = renderBook(book);
        results.innerHTML += html;
    });
}

function filterList(el) {
    const query = el.value;
    const tempList = myBooks.filter(book => book.name.toLowerCase().includes(query));

    refreshList(tempList);
}

button.addEventListener('click', getBooks);