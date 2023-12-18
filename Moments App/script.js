const memories = JSON.parse(localStorage.getItem('memories')) || [];
const photosContainer = document.getElementById('photos-container');

function displayPictures() {
    photosContainer.innerHTML = "";
    memories.forEach(memory => {
        photosContainer.innerHTML += `
        <div class="photo" onclick="toggleFlip(this)">
            <img src="${memory.picture}" alt="Image">
            <p class="location">${memory.location}</p>
            <p class="date">${memory.date}</p>
            <div class="m-notes">${memory.notes}</div>
        </div>
        `
    });
}

function toggleFlip(el) {
    el.classList.toggle('flip');
}

function savePicture() {
    const location = document.getElementById('location');
    const date = document.getElementById('date');
    const notes = document.getElementById('notes');

    const photo = {
        id: new Date().getTime(),
        picture: document.getElementsByTagName('canvas')[0].toDataURL(),
        location: location.value,
        date: date.value,
        notes: notes.value,
    }

    memories.push(photo);
    localStorage.setItem('memories', JSON.stringify(memories));
    displayPictures();

    picture.value = '';
    location.value = '';
    date.value = '';
    notes.value = '';

    document.getElementById('close-btn').click();
}

const MAX_WIDTH = 264;
const MAX_HEIGHT = 300;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.8;

const input = document.querySelector('input[type=file]');
input.onchange = function (ev) {
    const file = ev.target.files[0]; // get the file
    const blobURL = URL.createObjectURL(file);
    const img = new Image();
    img.src = blobURL;
    img.onerror = function () {
        URL.revokeObjectURL(this.src);
        // Handle the failure properly
        console.log("Cannot load image");
    };
    img.onload = function () {
        URL.revokeObjectURL(this.src);
        const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        const data = canvas.toBlob(
            (blob) => { },
            MIME_TYPE,
            QUALITY
        );
        document.getElementsByTagName('canvas')[0]?.remove();
        document.getElementById("main-body").append(canvas);
    };
};

function calculateSize(img, maxWidth, maxHeight) {
    let width = img.width;
    let height = img.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
        if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
        }
    }
    return [width, height];
}