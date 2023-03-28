const slider = document.querySelector('.slider');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
let productIndex = 0;

// Load products from JSON file
fetch('../data/data.json')
  .then(response => response.json())
  .then(data => {
    // Add each product to the slider
    data.products.forEach(product => {
      const sliderItem = document.createElement('div');
      sliderItem.classList.add('slider-item');
      sliderItem.innerHTML = `
        <img src="${product.img_path}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
      `;
      slider.appendChild(sliderItem);
    });
  });

// Move slider to the left
arrowLeft.addEventListener('click', () => {
  if (productIndex > 0) {
    productIndex--;
    slider.style.transform = `translateX(-${productIndex * 100}%)`;
  }
});

// Move slider to the right
arrowRight.addEventListener('click', () => {
  const numProducts = slider.children.length;
  if (productIndex < numProducts - 1) {
    productIndex++;
    slider.style.transform = `translateX(-${productIndex * 100}%)`;
  } else {
    // Reset index to zero if maximum index is exceeded
    productIndex = 0;
    slider.style.transform = `translateX(-${productIndex * 100}%)`;
  }
});
