// Lista de imágenes y sus nombres amigables
const imageNames = {
    'image1.jpg': 'Mafe',
    'image2.jpeg': 'Khaterine',
    'image3.jpeg': 'Carolina',
    'image4.jpeg': 'Diana',
    'image5.jpeg': 'Angie',
    'image6.jpeg': 'Carol',
    'image7.png': 'Dakota',
    'image8.jpeg': 'Kamila'
};

// Array de imágenes disponibles (solo las claves de imageNames)
const images = Object.keys(imageNames);

// Elementos del DOM
const imageLeft = document.getElementById('image-left');
const imageRight = document.getElementById('image-right');
const resultSection = document.getElementById('result');
const winnerText = document.getElementById('winner');

let votes = {
    'image1.jpg': 0,
    'image2.jpeg': 0,
    'image3.jpeg': 0,
    'image4.jpeg': 0,
    'image5.jpeg': 0,
    'image6.jpeg': 0,
    'image7.png': 0,
    'image8.jpeg': 0
};

let currentImages = [];  // Para llevar el control de las imágenes ya mostradas

// Función para obtener una imagen aleatoria que no esté en uso
function getRandomImage() {
    // Filtramos las imágenes que ya han sido mostradas
    const availableImages = images.filter(img => !currentImages.includes(img));
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    return availableImages[randomIndex];
}

// Función para actualizar la imagen tras votar
function updateImage(side) {
    const currentLeft = imageLeft.querySelector('img').src.split('/').pop();
    const currentRight = imageRight.querySelector('img').src.split('/').pop();

    // Incrementar el voto para la imagen seleccionada
    if (side === 'left') {
        votes[currentLeft]++;
    } else {
        votes[currentRight]++;
    }

    // Verificar si quedan imágenes por mostrar
    if (currentImages.length < images.length) {
        let newImage;

        // Seleccionamos una nueva imagen que no haya sido mostrada antes
        do {
            newImage = getRandomImage();
        } while (currentImages.includes(newImage));

        // Cambiar la imagen en el lado correspondiente
        if (side === 'left') {
            imageRight.querySelector('img').src = `uploads/${newImage}`;
        } else {
            imageLeft.querySelector('img').src = `uploads/${newImage}`;
        }

        // Añadir la nueva imagen al array de imágenes mostradas
        currentImages.push(newImage);
    } else {
        showResult(); // Si ya no hay imágenes, mostrar el resultado
    }
}

// Función para mostrar el resultado final
function showResult() {
    let winnerImage = '';
    let maxVotes = 0;

    // Determinar la imagen ganadora
    for (const [image, voteCount] of Object.entries(votes)) {
        if (voteCount > maxVotes) {
            maxVotes = voteCount;
            winnerImage = image;
        }
    }

    // Mostrar el nombre de la imagen ganadora
    winnerText.textContent = `La mas bonita para vos es ${imageNames[winnerImage]}`;
    resultSection.classList.remove('hidden');
}

// Función para cargar las imágenes iniciales
function loadInitialImages() {
    const firstImage = getRandomImage();
    const secondImage = getRandomImage();

    // Mostrar las imágenes en las posiciones izquierda y derecha
    imageLeft.innerHTML = `<img src="uploads/${firstImage}" alt="Imagen Izquierda">`;
    imageRight.innerHTML = `<img src="uploads/${secondImage}" alt="Imagen Derecha">`;

    // Añadir las imágenes al array de imágenes mostradas
    currentImages.push(firstImage, secondImage);
}

// Llamamos a la función para cargar las imágenes iniciales
loadInitialImages();

// Añadir eventos de clic a las imágenes
imageLeft.addEventListener('click', () => updateImage('left'));
imageRight.addEventListener('click', () => updateImage('right'));
