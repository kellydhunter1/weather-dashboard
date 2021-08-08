const apiKey="31c5c2a5281cccdbc583978a1e5bc66d";

const displayWeather = function(city, state) { 
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + ",us&APPID=" + apiKey;
    const date = new Date();
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log("Here are the results ", data.name, date.getMonth() + "/" + date.getDate() +"/" + date.getFullYear());
            })
        }
    })
    console.log(apiUrl);



};

const citySearch = function(city, state) {
    city = "Chicago";
    state = "il";
    displayWeather(city, state);
};
citySearch();


