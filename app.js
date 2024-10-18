const apiKey = "e5661dd977bf1ad3ed4acc740347ff4b";
let previousWeatherData = [];

async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('City not found');
        let data = await response.json();
        console.log(data);

        // Display current weather
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".place").innerHTML = data.name;
        document.querySelector(".weather-type").innerHTML = data.weather[0].main;
        document.querySelector(".hmudity-tem").innerHTML = data.main.humidity + '%';
        document.querySelector(".airpresure-temp").innerHTML = data.main.pressure;
        document.querySelector(".visibility-temp").innerHTML = data.visibility / 1000 + 'km';
        document.querySelector(".fill-parcent").innerHTML = Math.round(data.main.feels_like) + '°C';
        document.querySelector(".max-temp").innerHTML = Math.round(data.main.temp_max) + '°C';
        document.querySelector(".min-temp").innerHTML = Math.round(data.main.temp_min) + '°C';

        const sunriseTimestamp = data.sys.sunrise;
        const sunriseDate = new Date(sunriseTimestamp * 1000);
        displaySunriseTime(sunriseDate);

        const sunsetUnix = data.sys.sunset;
        const sunsetDate = new Date(sunsetUnix * 1000);
        displaySunsetTime(sunsetDate);

        const weatherImage = data.weather[0].main;
        weatherType(weatherImage);

        // Update previous days' weather data
        updatePreviousWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Could not fetch weather data for the specified city.');
    }
}

function displaySunriseTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const am = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    document.querySelector('.rise-hour').textContent = hours + ':';
    document.querySelector('.rise-min').textContent = minutesStr;
    document.querySelector('.am').textContent = am;
}

function displaySunsetTime(sunsetDate) {
    let setHour = sunsetDate.getHours();
    let setMin = sunsetDate.getMinutes();
    const period = setHour >= 12 ? "PM" : "AM";

    setHour = setHour % 12;
    setHour = setHour ? setHour : 12;
    const setMinutesStr = setMin < 10 ? '0' + setMin : setMin;

    document.querySelector('.set-hour').textContent = setHour + ':';
    document.querySelector('.set-min').textContent = setMinutesStr;
    document.querySelector('.pm').textContent = period;
}

function weatherType(weType) {
    let weatherLogo = document.querySelector(".image");
    if (weType === "Sunny") {
        weatherLogo.src = "01d.png";

    } else if (weType === "Clear") {
        weatherLogo.src = "sunny2-removebg-preview.png";
    } else if (weType === "Clouds") {
        weatherLogo.src = "02d.png";
    } else if (weType === "Haze") {
        weatherLogo.src = "04d.png";
    } else if (weType === "Rain") {
        weatherLogo.src = "10d.png";
    } else if (weType === "Storm") {
        weatherLogo.src = "11d.png";
    } else if (weType === "Snow") {
        weatherLogo.src = "13d.png";
    } else if (weType === "Mist") {
        weatherLogo.src = "50d.png";
    }
}

function updatePreviousWeatherData(newData) {
    // Add the new data at the start of the array
    previousWeatherData.unshift(newData);

    // Ensure the array length does not exceed 7
    if (previousWeatherData.length > 7) {
        previousWeatherData.pop();
    }

    // Update the DOM for previous days' weather
    for (let i = 0; i < previousWeatherData.length; i++) {
        const dayData = previousWeatherData[i];
        document.getElementById(`max-temp-${i + 1}`).textContent = Math.round(dayData.main.temp_max) + "°C";
        document.getElementById(`min-temp-${i + 1}`).textContent = Math.round(dayData.main.temp_min) + "°C";
    }
}

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('search-text').value;
    fetchWeather(city);
});

function updateCurrentTime() {
    const now = new Date();
    let hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour ? hour : 12;

    const formattedHour = hour < 10 ? '0' + hour : hour;
    const formattedMinute = minute < 10 ? '0' + minute : minute;
    const formattedSecond = second < 10 ? '0' + second : second;

    document.querySelector('.hour').textContent = formattedHour;
    document.querySelector('.min').textContent = formattedMinute;
    document.querySelector('.sec').textContent = formattedSecond;
    document.querySelector('.am-pm').textContent = period;
}

updateCurrentTime();
setInterval(updateCurrentTime, 1000);

const monthTime = () => {
    const now = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekName = daysOfWeek[now.getDay()];

    document.querySelector(".year").innerHTML = now.getFullYear();
    document.querySelector(".day").innerHTML = now.getDate() + '/';
    document.querySelector(".month").innerHTML = (now.getMonth() + 1) + '/';
    document.querySelector(".week").innerHTML = dayOfWeekName;
}

monthTime();

fetchWeather('Kolkata');
