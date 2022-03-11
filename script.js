var searchBar = document.getElementById("city")
var mainDisp = document.getElementById("main")
var buttonSearch = document.getElementById("search")
var temp = document.getElementById("temp")
var wind = document.getElementById("wind")
var humid = document.getElementById("humid")
var uvindex = document.getElementById("uvindex")
var tiles = document.getElementById("tiles")
var recents = document.getElementById("history")
var theCity
const history = JSON.parse(localStorage.getItem("history")) || []

var showHistory = function() {
    history.forEach(city => {
        var button = document.createElement("button")
        button.className = "button is-rounded is-medium"
        button.innerText = city

        button.onclick=()=>{
            theCity = city
            getRepoMain(city)
        }
        recents.appendChild(button)


    })
}

showHistory();


var getWeather = function (event) {

    event.preventDefault();

    var cityName = searchBar.value.trim();

    if (cityName) {
        getRepoMain(cityName);
        theCity = cityName



    } else {
        alert("Enter a valid city")
    }

}

var getRepoMain = function (cityName) {

    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=b6266937053d15c59e91212045eef46e"

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                if (!history.includes(theCity)) history.unshift(theCity)
                localStorage.setItem("history", JSON.stringify(history.slice(0, 4)))
                return response.json()

            } else {
                alert("Error: " + response.statusText);
                throw "Error"
            }
        })
        .then(function (data) {
            console.log(data);
            var lat = data[0].lat
            var lon = data[0].lon

            var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=metric&appid=b6266937053d15c59e91212045eef46e"
            return fetch(apiUrl)
        })
        .then(function (response) {
            if (response.ok) {
                return response.json()
            } else {
                alert("Error: " + response.statusText);
                throw "Error"
            }
        })
        .then(function (data) {
            console.log(data)
            showData(data);
        })
        .catch(function (error) {
            alert("Unable to connect to climate")
        })
}

var showData = function (data) {

    mainDisp.innerHTML = `${theCity} <img src='http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png'/>` + new Date(data.current.dt * 1000).toLocaleDateString()
    temp.textContent = "Temperature: " + data.current.temp + ' °C'
    wind.textContent = "Wind Speed: " + data.current.wind_speed + " kmh"
    humid.textContent = "Humidity: " + data.current.humidity + "%"
    uvindex.textContent = "UV Index: " + data.current.uvi

    tiles.innerHTML = ""

    for (let index = 1; index <= 5; index++) {
        console.log('DIA', index, data.daily[index]);
        var div = document.createElement("div")
        var article = document.createElement("article")
        var title = document.createElement("p")
        var text = document.createElement("p")
        var textTwo = document.createElement("p")
        var textThree = document.createElement("p")
        var img = document.createElement("img")
        data.daily[index]

        div.className = "tile is-parent"
        article.className = "tile is-child box"
        title.className = "title"
        text.className = "subtitle"
        textTwo.className = "subtitle"
        textThree.className = "subtitle"


        title.textContent = new Date(data.daily[index].dt * 1000).toLocaleDateString()
        img.src = `http://openweathermap.org/img/wn/${data.daily[index].weather[0].icon}@2x.png`

        text.textContent = data.daily[index].temp.day + " °C"
        textTwo.textContent = "Wind: " + data.daily[index].wind_speed + " kmh"
        textThree.textContent = "Humidity: " + data.daily[index].humidity + "%"


        tiles.appendChild(div)
        div.appendChild(article)
        article.appendChild(title)
        article.appendChild(img)
        article.appendChild(text)
        article.appendChild(textTwo)
        article.appendChild(textThree)
    };
}


// var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?q=" + cityName + "&exclude=hourly,minutely,current,alerts&units=metric&appid=b6266937053d15c59e91212045eef46e"

// fetch(apiUrl)
// .then(function (response) {
// if (response.ok) {
// return response.json()
// } else {
// alert("Error: " + response.statusText);
// throw "Error"
// }
// })
// .then(function (data) {
// console.log(data)
// })

// };


buttonSearch.addEventListener('click', getWeather)

// create variables for main card and search bar

// create fetch request for main data

// create event listeners for fetch function with button

// create local storage for search history

