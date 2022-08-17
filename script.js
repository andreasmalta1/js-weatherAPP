let weather = {
    'apiKey': '6c47d795d5d441e9beec727b59bb6d58',
    fetchWeather: function (city){
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + this.apiKey)
        .then(response => response.json())
        .then(data => this.displayWeather(data))
    },
    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity}  = data.main;
        const {speed} = data.wind
        console.log(name, icon, temp, humidity, speed)
        document.querySelector('.city').innerText = "Weather in " + name
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png"
        console.log(document.querySelector('.icon').src)
        document.querySelector('.description').innerText = description
        document.querySelector('.temp').innerText = (temp - 273.15).toFixed(2) + "°C"
        document.querySelector('.humidity').innerText = "Humidity: " + humidity + "%"
        document.querySelector('.wind-speed').innerText = "Wind Speed: " + speed + " km/h"
        document.querySelector('.weather').classList.remove('loading')
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
        
    },
    search: function () {
        this.fetchWeather(document.querySelector('.search-bar').value)
    }
}

document
    .querySelector('.search button')
    .addEventListener('click', () => weather.search())

document
.querySelector('.search-bar')
.addEventListener('keyup', (event) => {
    if (event.key == "Enter"){
        weather.search()
    }
})

weather.fetchWeather("Valletta")