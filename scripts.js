// Lista de imágenes y sus nombres amigables
const imageNames = {
    'image1.jpeg': 'MAFE',
    'image2.jpeg': 'KATHE',
    'image3.jpeg': 'CAROLINA',
    'image4.jpeg': 'DIANA',
    'image5.jpeg': 'ANGIE',
    'image6.jpeg': 'CAROL',
    'image7.jpeg': 'Dakota',
    'image8.jpeg': 'Kamila',
    
};

// Array de imágenes disponibles (solo las claves de imageNames)
const images = Object.keys(imageNames);

// Elementos del DOM
const imageLeft = document.getElementById('image-left');
const imageRight = document.getElementById('image-right');
const resultSection = document.getElementById('result');
const winnerText = document.getElementById('winner');

// Votos iniciales
let votes = {};
images.forEach(image => votes[image] = 0);

let currentImages = [];  // Para llevar el control de las imágenes ya mostradas
let votingEnded = false; // Para evitar más clics después de finalizar

// Función para obtener una imagen aleatoria que no esté en uso
function getRandomImage() {
    const availableImages = images.filter(img => !currentImages.includes(img));
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    return availableImages[randomIndex];
}

// Función para actualizar la imagen tras votar
function updateImage(side) {
    if (votingEnded) return; // No permitir clics si ya se terminó la votación

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
    votingEnded = true; // Establecer el flag para detener los clics

    // Ordenar las imágenes por votos de mayor a menor
    const sortedImages = Object.entries(votes).sort((a, b) => b[1] - a[1]);

    // Mostrar el ganador
    const [winnerImage, maxVotes] = sortedImages[0];
    winnerText.textContent = `el que mejor cae bien es ${imageNames[winnerImage]} con ${maxVotes} votos.`;

    // Crear las categorías
    const categories = [
        { title: 'Esta buena', range: [0, 1] },       // Primeras 5 imágenes
        { title: 'Parchable', range: [2, 4] },    // Siguientes 5 imágenes
        { title: 'Suave', range: [6, 7] },// Siguientes 5 imágenes
        { title: 'Fea', range: [8] } // Últimas 5 imágenes
    ];

    // Mostrar las imágenes con categorías
    categories.forEach(category => {
        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category.title;
        resultSection.appendChild(categoryTitle);

        const categoryList = document.createElement('ul');
        categoryList.style.listStyle = 'none'; // Estilo opcional
        categoryList.style.padding = '0';

        // Añadir imágenes dentro del rango de esta categoría
        sortedImages.slice(category.range[0], category.range[1] + 1).forEach(([image, voteCount]) => {
            const listItem = document.createElement('li');
            listItem.style.marginBottom = '10px';

            const imgElement = document.createElement('img');
            imgElement.src = `uploads/${image}`;
            imgElement.alt = imageNames[image];
            imgElement.style.maxWidth = '100px';
            imgElement.style.borderRadius = '10px';
            imgElement.style.marginRight = '10px';

            const text = document.createTextNode(
                `${imageNames[image]} - ${voteCount} votos`
            );

            listItem.appendChild(imgElement);
            listItem.appendChild(text);
            categoryList.appendChild(listItem);
        });

        resultSection.appendChild(categoryList);
    });
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
