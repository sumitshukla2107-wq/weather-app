const apiKey = "0265faf4b42494e9c2dd0af6209fb9b2";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const feelsLike = document.getElementById("feelsLike");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");
const message = document.getElementById("message");


async function getWeather(city) {

    if (city === "") {
        message.textContent = "Please enter a city name.";
        return;
    }

    message.textContent = "Loading...";

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        console.log(data);

        // City
        cityName.textContent =
            `${data.name}, ${data.sys.country}`;

        // Temperature
        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        // Description
        description.textContent =
            data.weather[0].description;

        // Humidity
        humidity.textContent =
            `${data.main.humidity}%`;

        // Feels like
        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;

        // Wind speed
        windSpeed.textContent =
            `${data.wind.speed} m/s`;

        // Weather icon
        const iconCode = data.weather[0].icon;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        message.textContent = "";

    } catch (error) {

        console.error(error);

        message.textContent =
            "❌ City not found. Please try again.";

    }
}


searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    getWeather(city);

});


cityInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const city = cityInput.value.trim();

        getWeather(city);

    }

});
const locationBtn = document.getElementById("locationBtn");

locationBtn.addEventListener("click", function () {

    if (!navigator.geolocation) {
        message.textContent =
            "Geolocation is not supported by your browser.";
        return;
    }

    message.textContent = "Getting your location...";

    navigator.geolocation.getCurrentPosition(
        function (position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            getWeatherByLocation(latitude, longitude);
        },

        function (error) {

            if (error.code === 1) {
                message.textContent =
                    "Location permission was denied.";
            } else {
                message.textContent =
                    "Unable to get your location.";
            }
        }
    );
});
async function getWeatherByLocation(latitude, longitude) {

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather data not found");
        }

        const data = await response.json();

        console.log(data);

        cityName.textContent =
            `${data.name}, ${data.sys.country}`;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        description.textContent =
            data.weather[0].description;

        humidity.textContent =
            `${data.main.humidity}%`;

        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;

        windSpeed.textContent =
            `${data.wind.speed} m/s`;

        const iconCode =
            data.weather[0].icon;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        message.textContent = "";

    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to get weather information.";

    }
}