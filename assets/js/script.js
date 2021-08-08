const apiKey="31c5c2a5281cccdbc583978a1e5bc66d";
const cityDisplayEl = document.querySelector("#city-display");
const weatherDataEl = document.querySelector("#weather-data");
const currentDateEl = document.querySelector("#date");
const currentTempEl = document.querySelector("#temp");
const iconEl = document.querySelector("#icon");
const iconImg = document.createElement("img");
const currentWindEl = document.querySelector("#wind");
const currentHumidityEl = document.querySelector("#humidity");
const currentUvIndexEl = document.querySelector("#uv-index");
const date = new Date();


const findWeatherInfo = function(city, state) { 
    const apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + ",us&units=imperial&APPID=" + apiKey;
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log("Here are the results for ", data.name, date.getMonth() + "/" + date.getDate() +"/" + date.getFullYear());
                displayWeather(data);
            });
        } else {
            alert('Error: City Not Found');
        }
    })
    console.log(apiUrl);
};

const displayWeather = function(data) {
    cityDisplayEl.textContent = data.name;
    currentDateEl.textContent = date.getMonth() + "/" + date.getDate() +"/" + date.getFullYear();
    currentTempEl.textContent = data.main.temp + "°F";
    currentWindEl.textContent = "Wind: " + data.wind.speed + " MPH";
    currentHumidityEl.textContent = "Humidity: " + data.main.humidity + "%";
    iconImg.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
    iconEl.appendChild(iconImg);
    currentUvIndexEl.textContent="UV Index: ";
    console.log("City: " + data.name, "Temp: " + data.main.temp + "°F","Humidity: " + data.main.humidity + "%", "Wind: " + data.wind.speed + " MPH")

}

const citySearch = function(city, state) {
    city = "Chicago";
    state = "il";
    findWeatherInfo(city, state);
};
citySearch();


