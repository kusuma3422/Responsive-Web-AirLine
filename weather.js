const apiKey = '743d6ed7b227423493695718251904 '; // Your WeatherAPI key

function getWeather() {
  const city = document.getElementById('cityInput').value;
  const weatherDiv = document.getElementById('weather');

  if (!city) {
    weatherDiv.innerHTML = 'Please enter a city.';
    return;
  }

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => {
      const { location, current } = data;
      weatherDiv.innerHTML = `
        <h2>${location.name}, ${location.country}</h2>
        <p>🌡️ Temperature: ${current.temp_c}°C</p>
        <p>🌥️ Condition: ${current.condition.text}</p>
        <img src="${current.condition.icon}" alt="weather icon" />
      `;
    })
    .catch(error => {
      weatherDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    });
}
