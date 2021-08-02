// Date display
function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
  hours = "0" + hours;
} 
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
} 
let days = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return day +" " + hours + ":" + minutes;

}


function formatDay (timestamp) {
let date = new Date (timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
return days[day];
}

function displayForecast (response) {
  let forecast = response.data.daily;
forecastElement = document.querySelector("#weather-forecast");
let forecastHTML = `<div class="row">`;

forecast.forEach(function (forecastDay, index) {
  if (index < 4 ) { 
forecastHTML = forecastHTML + `
  <div class="col-3">
  <div class="weather-forecast-date" id="#first-day">
                            ${formatDay(forecastDay.dt)}
                        </div>
                     
                        <div id="for-icon">
                            <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" width="42px">
                        </div>
                        <div class="forecast-temperatures">
                        <span class="forecast-temperature-max" id="max-temperature">
                            ${Math.round(forecastDay.temp.max)}°
                        </span>
                        <span class="forecast-temperature-min" id="min-temperature"> ${Math.round(forecastDay.temp.min)}° </span>
                        </div>
                    </div> `;
                    }
              
});
 forecastHTML =  forecastHTML + `</div>  `
                forecastElement.innerHTML = forecastHTML;
      
}


function displayWeatherCondition(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = `${temperature}`;
let descriptionElement = document.querySelector("#sky");
let maxTemp = document.querySelector("#max-temp");
let minTemp = document.querySelector("#min-temp");
let feelsLike = document.querySelector("#feels");
let humidityElement = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind");
let dateElement =document.querySelector("#date");
let iconElement = document.querySelector("#icon");

descriptionElement.innerHTML = response.data.weather[0].description;
maxTemp.innerHTML = Math.round(response.data.main.temp_max);
minTemp.innerHTML = Math.round(response.data.main.temp_min);
feelsLike.innerHTML = `${Math.round( response.data.main.feels_like )} °C`;;
humidityElement.innerHTML = response.data.main.humidity + " %" ;
windSpeed.innerHTML = Math.round(response.data.wind.speed) + " Km/h";
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);  
}

function searchLocation(position) {
  let apiKey = "1d1742d71e2e4296840a997a3c66e304";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}


function getForecast(coordinates) {
console.log(coordinates);
let apiKey = "f5ee6fe9739269adb6179e45323cceb3";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
document
  .getElementById("current-location-button")
  .addEventListener("click", getCurrentLocation);


function dispalyTemperature(response) {
console.log(response.data)
let temperatureElement = document.querySelector("#degrees");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#sky");
let maxTemp = document.querySelector("#max-temp");
let minTemp = document.querySelector("#min-temp");
let feelsLike = document.querySelector("#feels");
let humidityElement = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind");
let dateElement =document.querySelector("#date");
let iconElement = document.querySelector("#icon");

celsTemperature = response.data.main.temp;

temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
maxTemp.innerHTML = Math.round(response.data.main.temp_max);
minTemp.innerHTML = Math.round(response.data.main.temp_min);
feelsLike.innerHTML = `${Math.round( response.data.main.feels_like )} °C`;;
humidityElement.innerHTML = response.data.main.humidity + " %" ;
windSpeed.innerHTML = Math.round(response.data.wind.speed) + " Km/h";
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  
let apiKey = "f5ee6fe9739269adb6179e45323cceb3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(dispalyTemperature);
}

function handleSubmit(event){
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
console.log(cityInputElement);
search(cityInputElement.value);
}

function showFarTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
let farhreneiTemp = (celsTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(farhreneiTemp);
}

function showCelTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(celsTemperature);
}



let celsTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let faranLink = document.querySelector("#far-link");
faranLink.addEventListener("click", showFarTemperature);

let celsLink = document.querySelector("#cels-link");
celsLink.addEventListener("click", showCelTemperature);

search("Sheffield");