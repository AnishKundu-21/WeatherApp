const API_KEY = 'eb9bcd4043cafbb8275b10c54db358f2'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('location-input');
const searchButton = document.getElementById('search-button');
const weatherDisplay = document.getElementById('weather-display');

searchButton.addEventListener('click', fetchWeather);
locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeather();
});

function fetchWeather() {
    const location = locationInput.value.trim();
    if (!location) return;

    const url = `${BASE_URL}?q=${location}&units=metric&appid=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            weatherDisplay.classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again.');
        });
}

function displayWeather(data) {
    document.getElementById('location-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('date-time').textContent = new Date().toLocaleString();
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('feels-like').textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-condition').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
}