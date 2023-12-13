const image = document.querySelector('.image');
const dialogue = document.querySelector('.dialogues');

function generateMeme() {
    let randomNumber = Math.round(Math.random() * 10);

    image.src = `${randomNumber}.jpeg`;
}