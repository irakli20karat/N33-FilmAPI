const KEY = "be797c56ef68dc3752e5b7759848ae19";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");

const fetchWeather = async (city) => {
    try {
        const response = await fetch(`${API_URL}${city}&appid=${KEY}&units=metric`);
        if (!response.ok) {
            throw new Error("Error!");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p class="error-result">${error.message}</p>`;
    }
}

const displayWeather = (data) => {
    const { name, main, wind, weather } = data;
    weatherResult.innerHTML = `
        <p class="city-name">${name}</p>
        <span><p class="weather-label">Current Weather: </p><p class="weather-value">${weather[0].description}</p></span>
        <span><p class="weather-label">Temperature: </p><p class="weather-value">${main.temp} °C</p></span>
        <span><p class="weather-label">Feels Like: </p><p class="weather-value">${main.feels_like} °C</p></span>
        <span><p class="weather-label">Wind Speed: </p><p class="weather-value">${wind.speed} m/s</p></span>
        <span><p class="weather-label">Humidity: </p><p class="weather-value">${main.humidity}%</p></span>
    `;
}

getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        weatherResult.innerHTML = `
        <p class="default-result">
            Loading weather information for <strong>${city}</strong>...
        </p>`;
        fetchWeather(city);
    } else {
        weatherResult.innerHTML = `
        <p class="default-result">
            Please enter a city name and click "Get Weather" to see the current weather information.
        </p>`;
    }
});