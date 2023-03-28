// Get the HTML elements for the slider and arrows
const slider = document.querySelector('.slider');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

// Initialize the product index
let productIndex = 0;

// Load products from JSON file
fetch('../data/data.json')
  .then(response => response.json())
  .then(data => {
    // Add each product to the slider
    data.products.forEach(product => {
      // Create a new element for the product
      const sliderItem = document.createElement('div');
      // Add a class to the new element
      sliderItem.classList.add('slider-item');
      // Set the HTML content of the new element
      sliderItem.innerHTML = `
        <img src="${product.img_path}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
      `;
      // Add the new element to the slider
      slider.appendChild(sliderItem);
    });
  });

// Move slider to the left when left arrow is clicked
arrowLeft.addEventListener('click', () => {
  // Only move the slider if the current index is greater than zero
  if (productIndex > 0) {
    // Decrement the index
    productIndex--;
    // Move the slider to the left by translating it horizontally
    slider.style.transform = `translateX(-${productIndex * 100}%)`;
  }
});

// Move slider to the right when right arrow is clicked
arrowRight.addEventListener('click', () => {
  // Get the number of products in the slider
  const numProducts = slider.children.length;
  // Only move the slider if the current index is less than the maximum index
  if (productIndex < numProducts - 1) {
    // Increment the index
    productIndex++;
    // Move the slider to the right by translating it horizontally
    slider.style.transform = `translateX(-${productIndex * 100}%)`;
  } else {
    // Reset the index to zero if the maximum index is exceeded
    productIndex = 0;
    slider.style.transform = `translateX(-${productIndex * 100}%)`;
  }
});
