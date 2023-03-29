// Set your API key and locationName
const apiKey = '582b55efa5e27910234adbbf3225cdad';
const locationName = 'Carlsbad, US'; // Change this to your desired locationName

// Get references to the DOM elements
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const humidityElement = document.querySelector('.humidity');
const dayElements = document.querySelectorAll('.day');
const tempElements = document.querySelectorAll('.temp');
const weatherCard = document.querySelector(".weather-card-main");

// Fetch the weather data from the OpenWeather API
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=imperial&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Update the DOM elements with the fetched data
    temperatureElement.textContent = `${data.main.temp}°F`;
    descriptionElement.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
  });

// Fetch the 3-day weather forecast from the OpenWeather API
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&units=imperial&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Update the DOM elements with the fetched data
    for (let i = 0; i < 3; i++) {
      const dayData = data.list[i*8]; // Get the data for the corresponding day (every 8th element)
      dayElements[i].textContent = new Date(dayData.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
      tempElements[i].textContent = `${dayData.main.temp}°F`;

      // Set the weather image
      const iconUrl = `https://openweathermap.org/img/w/${dayData.weather[0].icon}.png`;
      const weatherImage = document.createElement('img');
      weatherImage.src = iconUrl;
      weatherImage.alt = dayData.weather[0].description;
      const forecastDiv = dayElements[i].parentNode;
      forecastDiv.insertBefore(weatherImage,forecastDiv.children[1]);
    }
  });

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=imperial&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Update the DOM elements with the fetched data
    temperatureElement.textContent = `${data.main.temp}°F`;
    descriptionElement.textContent = data.weather[0].description;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;

    // Set the weather image
    const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const weatherImage = document.createElement('img');
    weatherImage.src = iconUrl;
    weatherImage.alt = data.weather[0].description;
    weatherCard.insertBefore(weatherImage,weatherCard.children[1]);
  });
