var searchBar = document.getElementById("city")
var mainDisp = document.getElementById("main")
var buttonSearch = document.getElementById("search")
var temp = document.getElementById("temp")
var wind = document.getElementById("wind")
var humid = document.getElementById("humid")

var getWeather = function (event) {

    event.preventDefault();

    var cityName = searchBar.value.trim();

    if (cityName) {
        getRepoMain(cityName);

        searchBar.textContent = "";
    } else {
        alert("Enter a valid city")
    }

}

var getRepoMain = function (cityName) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=b6266937053d15c59e91212045eef46e"

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json()

            } else {
                alert("Error: " + response.statusText);
                throw "Error"
            }
        })
        .then(function (data) {
            console.log(data);
            displayMain(data);
        })
        .catch(function (error) {
            alert("Unable to connect to climate")
        })
}

var displayMain = function (data) {
    console.log(data.name)
    console.log(data.uvi)

    mainDisp.textContent = data.name
    temp.textContent = "Temperature: " + data.main.temp + ' C°'
    wind.textContent = "Wind Speed: " + data.wind.speed + " kmh"
    humid.textContent = "Humidity: " + data.main.humidity + " %"

}

var getForecast = function (cityName) {
  
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=b6266937053d15c59e91212045eef46e"

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                return response.json()
            } else {
                alert("Error: " + response.statusText);
                throw "Error"
            }
        })
        .then(function (data) {
            console.log(data)
            displayForecast(data)
        })
    
}

buttonSearch.addEventListener('click', getWeather)

// create variables for main card and search bar

// create fetch request for main data

// create event listeners for fetch function with button

// create local storage for search history

