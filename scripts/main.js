// const carousel = document.querySelector('.carousel');
// const prevButton = document.querySelector('.carousel-prev');
// const nextButton = document.querySelector('.carousel-next');
// const productsUrl = './data/data.json';

// let currentIndex = 0;

// async function fetchProducts() {
//   try {
//     const response = await fetch(productsUrl);
//     const data = await response.json();
//     const products = data.products;
//     // Create a carousel item for each product
//     products.forEach(product => {
//       const item = document.createElement('div');
//       item.classList.add('carousel-item');
//       item.innerHTML = `
//         <img src="${product.img_path}" alt="${product.name}">
//         <h3>${product.name}</h3>
//         <p>${product.description}</p>
//       `;
//       carousel.appendChild(item);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetchProducts();

// // Move to the previous item in the carousel
// prevButton.addEventListener('click', () => {
//   if (currentIndex === 0) {
//     currentIndex = carousel.children.length - 1;
//   } else {
//     currentIndex--;
//   }
//   carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
// });

// // Move to the next item in the carousel
// nextButton.addEventListener('click', () => {
//   if (currentIndex === carousel.children.length - 1) {
//     currentIndex = 0;
//   } else {
//     currentIndex++;
//   }
//   carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
// });


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



// GENERAL LAZY LOADING 
const images = document.querySelectorAll('img[loading="lazy"]');

const options = {
  rootMargin: '0px',
  threshold: 0.3
};

const imgObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const src = img.getAttribute('data-src');
      img.setAttribute('src', src);
      imgObserver.unobserve(img);
    }
  });
}, options);

images.forEach(img => {
  imgObserver.observe(img);
});




const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}


const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}
