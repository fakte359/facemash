const imageLeft = document.getElementById('image-left');
const imageRight = document.getElementById('image-right');

// Función para obtener una imagen aleatoria que no esté en uso
function getRandomImage(currentImages) {
    const availableImages = images.filter(img => !currentImages.includes(img));
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    return availableImages[randomIndex];
}

// Función para actualizar la imagen opuesta al clic
function updateImage(side) {
    // Determinar cuál imagen actualizar
    const currentLeft = imageLeft.querySelector('img').src.split('/').pop();
    const currentRight = imageRight.querySelector('img').src.split('/').pop();

    // Excluir las imágenes actuales
    const currentImages = [currentLeft, currentRight];
    const newImage = getRandomImage(currentImages);

    if (side === 'left') {
        imageRight.querySelector('img').src = `uploads/${newImage}`;
    } else {
        imageLeft.querySelector('img').src = `uploads/${newImage}`;
    }
}

// Añadir eventos de clic a las imágenes
imageLeft.addEventListener('click', () => updateImage('left'));
imageRight.addEventListener('click', () => updateImage('right'));