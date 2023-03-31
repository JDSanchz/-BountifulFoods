
const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const productsUrl = './data/data.json';

let currentIndex = 0;
let nextIndex = 1;

async function fetchProducts() {
  try {
    const response = await fetch(productsUrl);
    const data = await response.json();
    const products = data.products;
    // Create a carousel item for each product
    products.forEach(product => {
      const item = document.createElement('div');
      item.classList.add('carousel-item');
      item.innerHTML = `
        <img data-src="${product.img_path}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      `;
      carousel.appendChild(item);
    });
    // Load the first image
    const firstImage = carousel.querySelector('img');
    loadImage(firstImage);
  } catch (error) {
    console.error(error);
  }
}

fetchProducts();

// Move to the previous item in the carousel
prevButton.addEventListener('click', () => {
  if (currentIndex === 0) {
    currentIndex = carousel.children.length - 1;
    nextIndex = 0;
  } else {
    currentIndex--;
    nextIndex = currentIndex === 0 ? carousel.children.length - 1 : currentIndex - 1;
  }
  const currentImage = carousel.children[currentIndex].querySelector('img');
  const nextImage = carousel.children[nextIndex].querySelector('img');
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  loadImage(nextImage);
  loadImage(currentImage);
});

// Move to the next item in the carousel
nextButton.addEventListener('click', () => {
  if (currentIndex === carousel.children.length - 1) {
    currentIndex = 0;
    nextIndex = 1;
    // If this is the last product, load the image for the first product instead of the next product
    const currentImage = carousel.children[currentIndex].querySelector('img');
    const nextImage = carousel.children[nextIndex].querySelector('img');
    loadImage(currentImage);
  } else {
    currentIndex++;
    nextIndex = currentIndex === carousel.children.length - 1 ? 0 : currentIndex + 1;
    const currentImage = carousel.children[currentIndex].querySelector('img');
    const nextImage = carousel.children[nextIndex].querySelector('img');
    loadImage(nextImage);
    loadImage(currentImage);
  }
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
});

// Load an image
function loadImage(image) {
  if (image && !image.src && image.dataset.src) {
    const img = new Image();
    img.src = image.dataset.src;
    img.onload = () => {
      image.src = img.src;
      image.removeAttribute('data-src');
    };
  }
}
