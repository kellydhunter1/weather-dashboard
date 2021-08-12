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
// const uvValueSpan = document.querySelector("#uv-value");
const recentCitiesEl = document.querySelector("#recent-cities");
const cityInput = document.querySelector("#city");
const stateInput = document.querySelector("#state");
const citySearchBtn = document.querySelector("#city-search");
const forecastEl = document.querySelector("#five-day-forecast");
const date = new Date();
let savedCitiesArr = [];
let apiUrl = "";


const findWeatherInfo = function(apiUrl) { 
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log("Here are the results for ", data.name, date.getMonth() + "/" + date.getDate() +"/" + date.getFullYear());
                saveCity(data);
                recentCityList(data);
            displayWeather(data);
            });
        } else {
            alert('Error: City Not Found');
        }
    })
    console.log(apiUrl);
};

const currentUvIndex = function(data) {
    const cityLat = data.coord.lat;
    const cityLon = data.coord.lon;
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + apiKey)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    const uvValueSpan = document.createElement("span");
                    const uvIndex = data.current.uvi;
                    if (uvIndex <= 2 ) {
                        uvValueSpan.classList = "p-1 mb-2 bg-success text-white";
                        console.log("GREEN- UV index is low!");
                  } if (2 < uvIndex && uvIndex <= 5) {
                        uvValueSpan.classList = "p-1 mb-2 bg-warning";
                        console.log("YELLOW- UV is in moderate Range!");
                  } if (5 < uvIndex && uvIndex <= 7) {
                      uvValueSpan.classList = "p-1 mb-2 bg-orange";
                      console.log("ORANGE- UV is High!");
                  } if(7 < uvIndex && uvIndex <= 10) {
                      uvValueSpan.classList = "p-1 mb-2 bg-danger text-white";
                      console.log("RED- UV is wayyyy too high!");
                  } if(uvIndex > 10) {
                      uvValueSpan.classList = "p-1 mb-2 bg-purple text-white";
                      console.log("PURPLE- Stay inside!")
                }
                    uvValueSpan.innerHTML = uvIndex;
                    currentUvIndexEl.appendChild(uvValueSpan);
                    forecastEl.textContent="";
                    fiveDayForcast(data);
                    console.log(uvIndex);
                })
            }
        });
};

const displayWeather = function(data) {
    cityDisplayEl.textContent = data.name;
    currentDateEl.textContent = date.getMonth() + "/" + date.getDate() +"/" + date.getFullYear();
    currentTempEl.textContent = data.main.temp + "°F";
    currentWindEl.textContent = "Wind: " + data.wind.speed + " MPH";
    currentHumidityEl.textContent = "Humidity: " + data.main.humidity + "%";
    currentUvIndexEl.innerHTML = "UV Index: ";
    iconImg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
    iconEl.appendChild(iconImg);
    console.log("City: " + data.name, "Temp: " + data.main.temp + "°F","Humidity: " + data.main.humidity + "%", "Wind: " + data.wind.speed + " MPH");
    currentUvIndex(data);
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
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&units=imperial&appid=" + apiKey;
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){
            forecastEl.textContent="";
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
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + ",us&units=imperial&APPID=" + apiKey;
    findWeatherInfo(apiUrl);
};

// 5-day forecast
const fiveDayForcast = function(data) {
    // loop through array to set i to number in array
    
    const forecastCard = data.daily.slice(1,6);
    for (let i = 0; i < forecastCard.length; i++) {
        const forecastDate = new Date();
        forecastDate.setDate(forecastDate.getDate() + (i+1));
        const month = forecastDate.getMonth() + 1;
        const day = forecastDate.getDate();
        const year = forecastDate.getFullYear();
        const cardEl = document.createElement("div");
        const dayCard = document.createElement("div");
        const dayCardDate = document.createElement("p");
        const dayCardTemp = document.createElement("p");
        const dayCardIcon = document.createElement("img");
        const dayCardUl = document.createElement("ul");
        const dayCardWind = document.createElement("li");
        const dayCardHumidity = document.createElement("li");
        cardEl.className = "col";
        dayCard.classList = "card bg-primary";
        dayCardDate.className = "text-white";
        dayCardTemp.classList = "card-title text-white"
        dayCardUl.classList = "list-group";
        dayCardWind.classList = "list-group-item";
        dayCardHumidity.classList = "list-group-item";
        
        dayCardDate.textContent = forecastDate.getMonth() + "/" + forecastDate.getDate() +"/" + forecastDate.getFullYear();
        dayCardTemp.textContent = forecastCard[i].temp.day + "°F";
        dayCardIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastCard[i].weather[0].icon + ".png");
        dayCardWind.textContent= "Wind: " +  forecastCard[i].wind_speed + "MPH";
        dayCardHumidity.textContent= "Humidity: " +  forecastCard[i].humidity + "%";
        dayCard.appendChild(dayCardDate);
        dayCard.appendChild(dayCardTemp);
        dayCard.appendChild(dayCardIcon);
        dayCard.appendChild(dayCardUl);
        dayCardUl.appendChild(dayCardWind);
        dayCardUl.appendChild(dayCardHumidity);
        cardEl.appendChild(dayCard);
        forecastEl.appendChild(cardEl);

        console.log("Forecast day "+ i +"ready!" + forecastCard[i].dt);
    }
}

recentCitiesEl.addEventListener("click", cityRecallHandler);
citySearchBtn.addEventListener("click", citySearch)

loadCities();
