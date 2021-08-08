const apiKey="31c5c2a5281cccdbc583978a1e5bc66d";

const displayWeather = function(cityName, state) { 
    const apiUrl = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + state +"&appid=" + apiKey);
console.log(apiUrl);
};

const citySearch = function(cityName, state) {
    cityName = "Richmond";
    state = "IN";
    displayWeather(cityName, state);
};
citySearch();


