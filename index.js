const form = document.querySelector('.form');
const input = document.getElementById('city-input');
const display = document.querySelector('.display');
const apiKey = '9c35b0b6acecc3036c9032d3349a5136';

form.addEventListener('submit', async e => { // search button function
    e.preventDefault(); // preventing from refreshing the page

    input.classList.remove('is-invalid');
    form.classList.add('was-validated');

    if (!form.checkValidity()) {
        return; // return if input is empty don't execute
    }

    const cityName = input.value;

    try {
        const data = await getData(cityName);
        displayWeather(data);
        display.classList.remove('d-none');
    } catch (error) {
        console.error(error);
    }
});

async function getData(cityName) { // sends a http request to the API
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

    const apiResponse = await fetch(apiUrl);

    if (!apiResponse.ok) { // check if api response ok is false
        form.classList.remove('was-validated');
        input.classList.add('is-invalid');
        throw new Error('Could not fetch weather data');
    }

    return await apiResponse.json();
}

function displayWeather(data) { // displays the weather data 
    const nameDisplay = document.querySelector('.name');
    const tempDisplay = document.querySelector('.temp');
    const humidityDisplay = document.querySelector('.humidity');
    const descriptionDisplay = document.querySelector('.description');
    const iconDisplay = document.querySelector('.icon');

    const {name: cityName, main: {temp, humidity}, weather: [{description, icon}]} = data; // 

    nameDisplay.innerHTML = cityName;
    tempDisplay.innerHTML = `Temperature: ${(temp - 273.15).toFixed(2)}°C`;
    humidityDisplay.innerHTML = `Humidity: ${humidity}%`;
    descriptionDisplay.innerHTML = `Description: ${description}`;
    iconDisplay.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
}