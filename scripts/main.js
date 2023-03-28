const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const productsUrl = 'data/data.json';

let currentIndex = 0;

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
        <img src="${product.img_path}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      `;
      carousel.appendChild(item);
    });
  } catch (error) {
    console.error(error);
  }
}

fetchProducts();

// Move to the previous item in the carousel
prevButton.addEventListener('click', () => {
  if (currentIndex === 0) {
    currentIndex = carousel.children.length - 1;
  } else {
    currentIndex--;
  }
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
});

// Move to the next item in the carousel
nextButton.addEventListener('click', () => {
  if (currentIndex === carousel.children.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
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
