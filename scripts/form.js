const fruit1Select = document.getElementById('fruit1');
const fruit2Select = document.getElementById('fruit2');
const fruit3Select = document.getElementById('fruit3');
const productsUrl = './data/fruit.json';

let data; // Define data as a global variable

async function populateFruitOptions() {
  try {
    const response = await fetch(productsUrl);
    data = await response.json(); // Assign the response to the global variable
    data.forEach(fruit => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      const option3 = document.createElement('option');
      option1.text = option2.text = option3.text = fruit.name;
      option1.value = option2.value = option3.value = fruit.name;
      fruit1Select.appendChild(option1);
      fruit2Select.appendChild(option2);
      fruit3Select.appendChild(option3);
    });
  } catch (error) {
    console.error(error);
  }
}

populateFruitOptions();

/// THE RECEIPT INFO GOES DOWN HERE
const form = document.querySelector('form');
const receiptDiv = document.querySelector('.receipt');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission
  console.log("Event Listener Kicked In");
  const firstName = document.getElementById('first-name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  // Get the selected fruits and special instructions from the form
  const fruit1 = fruit1Select.value;
  const fruit2 = fruit2Select.value;
  const fruit3 = fruit3Select.value;
  const instructions = document.getElementById('instructions').value;

  // Look up the nutrition information for the selected fruits
  const fruits = [fruit1, fruit2, fruit3];
  console.log(fruits);
  
  const nutritionData = fruits.map((fruit) => {
    const fruitInfo = data.find((info) => info.name === fruit);
    return fruitInfo.nutritions;
  });
  
  // Calculate the total nutrition values
  const totalNutrition = nutritionData.reduce((acc, curr) => {
    for (const key in curr) {
      acc[key] = (acc[key] || 0) + curr[key];
    }
    return acc;
  }, {});
  

  // Build the receipt output
  let output = `<h2>Order Summary</h2>`;
  output += `<p><strong>Name:</strong> ${firstName}</p>`;
  output += `<p><strong>Email:</strong> ${email}</p>`;
  output += `<p><strong>Phone Number:</strong> ${phone}</p>`;
  const now = new Date();
const date = now.toLocaleDateString();
const time = now.toLocaleTimeString();

output += `<p><strong>Date:</strong> ${date}</p>`;
output += `<p><strong>Time:</strong> ${time}</p>`;
  output += `<p><strong>Fruit 1:</strong> ${fruit1}</p>`;
  output += `<p><strong>Fruit 2:</strong> ${fruit2}</p>`;
  output += `<p><strong>Fruit 3:</strong> ${fruit3}</p>`;
  output += `<p><strong>Special Instructions:</strong> ${instructions}</p>`;
  output += `<hr>`;
  output += `<h2>Nutritional Info</h2>`;
  output += `<p><strong>Total Carbohydrates:</strong> ${totalNutrition.carbohydrates.toFixed(1)}g</p>`;
  output += `<p><strong>Total Protein:</strong> ${totalNutrition.protein.toFixed(1)}g</p>`;
  output += `<p><strong>Total Fat:</strong> ${totalNutrition.fat.toFixed(1)}g</p>`;
  output += `<p><strong>Total Sugar:</strong> ${totalNutrition.sugar.toFixed(1)}g</p>`;
  output += `<p><strong>Total Calories:</strong> ${totalNutrition.calories.toFixed(1)} kcal</p>`;

  // Display the receipt in the receiptDiv
  receiptDiv.innerHTML = output;

// Get the current count of form submissions from local storage
let count = localStorage.getItem('formSubmissions') || 0;

// Increment the count and save it to local storage
count++;
localStorage.setItem('formSubmissions', count);

// Update the cart information in the navbar
const cart = document.querySelector('.cart-w');
let c = cart.querySelector('.order-counter'); // check if the element already exists
if (!c) { // if it doesn't exist, create it
  c = document.createElement("p");
  c.className = "order-counter";
  cart.appendChild(c);
}
c.innerHTML = count; // update the count


});
