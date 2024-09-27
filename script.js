const URL_1 = `https://api.openweathermap.org/data/2.5/weather?q=`;
const URL_2 = `&appid=64360edfac2acdf460ac831f40b18a69&units=metric`;

async function checkWeather(city) {
    const myURL = URL_1 + city + URL_2;
    try {
        const response = await fetch(myURL);

        if (!response.ok) {
            alert('Place not found.....');
        }

        const data = await response.json();

        document.querySelector('#temp-data').innerHTML = Math.floor(data.main.temp) + '°c';
        document.querySelector('#place-name').innerHTML = data.name;
        document.querySelector('#humidity-data').innerHTML = data.main.humidity + '%';
        document.querySelector('#wind-data').innerHTML = data.wind.speed + 'km/h';

        if (data.weather[0].main === 'Clouds') {
            document.querySelector('.weather img').src = './images/clouds.png';
        }
        else if (data.weather[0].main === 'Rain') {
            document.querySelector('.weather img').src = './images/rain.png';
        }
        else if (data.weather[0].main === 'Clear') {
            document.querySelector('.weather img').src = './images/clear.png';
        }
        else if (data.weather[0].main === 'Snow') {
            document.querySelector('.weather img').src = './images/snow.png';
        }
    } catch (error) {
        document.querySelector('#place-name').innerHTML = 'City not found';
        document.querySelector('#temp-data').innerHTML = '--';
        document.querySelector('#humidity-data').innerHTML = '--';
        document.querySelector('#wind-data').innerHTML = '--';
    }
}

const searchInput = document.querySelector('.searchbar input');
const searchBtn = document.querySelector('.searchbar button');

searchBtn.addEventListener('click', () => {
    document.querySelector('.weather').style.display = 'flex';
    checkWeather(searchInput.value);
    searchInput.value = '';
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.querySelector('.weather').style.display = 'flex';
        checkWeather(searchInput.value);
        searchInput.value = '';
    }
});
