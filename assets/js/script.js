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
const recentCitiesEl = document.querySelector("#recent-cities");
const cityInput = document.querySelector("#city");
const stateInput = document.querySelector("#state");
const citySearchBtn = document.querySelector("#city-search");
const date = new Date();
let savedCitiesArr = [];
let apiUrl = "";


const findWeatherInfo = function(apiUrl) { 
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log("Here are the results for ", data.name, date.getMonth() + "/" + date.getDate() +"/" + date.getFullYear());
                displayWeather(data);
                saveCity(data);
                recentCityList(data);
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
    console.log("City: " + data.name, "Temp: " + data.main.temp + "°F","Humidity: " + data.main.humidity + "%", "Wind: " + data.wind.speed + " MPH");
    
};

const recentCityList = function(data) {
    const recentCityBtn = document.createElement("button");
    recentCityBtn.setAttribute("id", data.id);
    recentCityBtn.setAttribute("type", "button");
    recentCityBtn.classList= "btn btn-info recent-city";
    recentCityBtn.textContent = data.name;
    recentCitiesEl.appendChild(recentCityBtn);
};

const cityRecallHandler = function(event) {
    if(event.target.matches(".recent-city")) {
    event.preventDefault();
    let cityId = event.target.getAttribute("id");
    cityRecall(cityId);
    }
};

const cityRecall = function(cityId) {
    let apiUrl = "http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&units=imperial&appid=" + apiKey;
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){
            displayWeather(data);
        })
    })
};
const saveCity = function(data) {
    const savedCity = {
        name: data.name,
        id: data.id
    };  
    savedCitiesArr.push(savedCity);    

    localStorage.setItem("saved cities", JSON.stringify(savedCitiesArr));
    console.log(data.name + " saved to local storage!");
};

const loadCities = function() {
    let savedCities = JSON.parse(localStorage.getItem("saved cities"));
        if(!savedCities) {
            return false
        } else {
            console.log("Saved Cities Found!");
            for (let i = 0; i < savedCities.length; i++) {
                recentCityList(savedCities[i]);
                savedCitiesArr = savedCities;          
            }

        }
};

const citySearch = function() {
    city = cityInput.value;
    state = stateInput.value;
    let apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + ",us&units=imperial&APPID=" + apiKey;
    findWeatherInfo(apiUrl);
};
recentCitiesEl.addEventListener("click", cityRecallHandler);
citySearchBtn.addEventListener("click", citySearch)

loadCities();
