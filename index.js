const form = document.querySelector('.form');
const input = document.getElementById('city-input');
const apiKey = '9c35b0b6acecc3036c9032d3349a5136';
const statusDisplay = document.querySelector('.status');

form.addEventListener('submit', async e => {
    statusDisplay.innerHTML = ''
    e.preventDefault();

    const cityName = input.value;

    if (cityName) {
        try {
            const data = await getData(cityName);
            displayWeather(data);
        } catch (error) {
            console.error(error);
        }
    } else {
        statusDisplay.innerHTML = 'Please input a City';
    }
});

async function getData(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

    const apiResponse = await fetch(apiUrl);

    if (!apiResponse.ok) {
        throw new Error('Could not fetch weather data');
    }

    return await apiResponse.json();
}

function displayWeather(data) {
    const nameDisplay = document.querySelector('.name');
    const tempDisplay = document.querySelector('.temp');
    const humidityDisplay = document.querySelector('.humidity');
    const descriptionDisplay = document.querySelector('.description');
    const iconDisplay = document.querySelector('.icon');

    const {name: cityName, main: {temp, humidity}, weather: [{description, icon}]} = data;

    nameDisplay.innerHTML = cityName;
    tempDisplay.innerHTML = temp;
    humidityDisplay.innerHTML = humidity;
    descriptionDisplay.innerHTML = description;
    iconDisplay.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
}