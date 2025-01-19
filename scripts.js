const imageLeft = document.getElementById('image-left');
const imageRight = document.getElementById('image-right');
const resultSection = document.getElementById('result');
const winnerText = document.getElementById('winner');


let votes = {
   'image1.jpg' : 0,
    'image2.jpeg' : 0,
    'image3.jpeg' : 0,
    'image4.jpeg' : 0,
    'image5.jpeg' : 0,
    'image6.jpeg' : 0,
    'image7.png' : 0,
    'image8.jpeg': 0
};

let currentImages = [];
// Función para obtener una imagen aleatoria que no esté en uso
function getRandomImage() {
    const availableImages = images.filter(img => !currentImages.includes(img));
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    return availableImages[randomIndex];
}

// Función para actualizar la imagen opuesta al clic
function updateImage(side) {
    const currentLeft = imageLeft.querySelector('img').src.split('/').pop();
    const currentRight = imageRight.querySelector('img').src.split('/').pop();

    // Excluir las imágenes actuales
    currentImages = [currentLeft, currentRight];
    const newImage = getRandomImage();

    if (side === 'left') {
        imageRight.querySelector('img').src = `uploads/${newImage}`;
        votes[currentLeft]++;
    } else {
        imageLeft.querySelector('img').src = `uploads/${newImage}`;
        votes[currentRight]++;
    }

    currentImages.push(newImage);

    // Verificar si se han votado todas las imágenes
    if (currentImages.length === images.length) {
        showResult();
    }
}

// Función para mostrar el resultado
function showResult() {
    let winnerImage = '';
    let maxVotes = 0;

    for (const [image, voteCount] of Object.entries(votes)) {
        if (voteCount > maxVotes) {
            maxVotes = voteCount;
            winnerImage = image;
        }
    }

    winnerText.textContent = `La imagen con más votos es: ${winnerImage} con ${maxVotes} votos.`;
    resultSection.classList.remove('hidden');
}

// Añadir eventos de clic a las imágenes
imageLeft.addEventListener('click', () => updateImage('left'));
imageRight.addEventListener('click', () => updateImage('right'));