const apiKey = "33d95076dd08e160bc5ca845ef5bd733";
const city = "Cape Town"; // Change to your desired city

async function fetchWeather() {
  const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
  const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=5&appid=${apiKey}`);

  const currentData = await currentRes.json();
  const forecastData = await forecastRes.json();

  // Current weather
  const currentWeatherEl = document.getElementById("current-weather");
  currentWeatherEl.innerHTML = `
    <h2>Current Weather in ${city}</h2>
    <p>🌡️ Temperature: ${currentData.main.temp}°C</p>
    <p>☁️ Condition: ${currentData.weather[0].description}</p>
    <p>💧 Humidity: ${currentData.main.humidity}%</p>
    <p>💨 Wind: ${currentData.wind.speed} km/h</p>
  `;

  // Forecast (simplified using first 5 entries)
  const forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = "";
  forecastData.list.forEach((item, index) => {
    const day = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
    forecastContainer.innerHTML += `
      <div class="forecast-day">
        <h3>${day}</h3>
        <p>${item.weather[0].main}</p>
        <p>🌡️ ${item.main.temp}°C</p>
        <p>💧 ${item.main.humidity}%</p>
      </div>
    `;
  });
}

fetchWeather();
