const searchBtn = document.querySelector('.search-button');
const locationBtn = document.querySelector('.location-button');
const API_KEY = "YOUR-API-KEY-HERE"; //API key for weatherAPI.com, forecasting API

const getWeatherByCity = () =>{
    let currentWeather = {};
    let currentLocation = {};
    let forecastWeather = [];
    let cityName = document.querySelector('.city-name').value;

    //WeatherApi.com current weather and forecasting weather for 3 days(Free PLan), can choose to upgrade and change the days to 4 with commented code
    let weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=3&aqi=no`;
    
   let req = new XMLHttpRequest();
    req.open('GET', weatherUrl, true)
    req.send();
     req.onload = () => {
         let weatherData = JSON.parse(req.responseText);
         displayCurrentWeather(weatherData);
         displayForecastWeather(weatherData);           
    }


    const displayCurrentWeather = (weatherData) => {
        //Extracting current weather information from weather
        currentWeather['description'] = weatherData.current.condition.text;
        currentWeather['weather-icon'] = weatherData.current.condition.icon;
        currentWeather['temperature'] = weatherData.current.temp_f;
        currentWeather['wind'] = weatherData.current.wind_mph;
        currentWeather['wind-direction'] = weatherData.current.wind_dir;
        currentWeather['humidity'] = weatherData.current.humidity;
        currentWeather['uv'] = weatherData.current.uv;
        currentWeather['feels-like'] = weatherData.current.feelslike_f;
        currentWeather['visibility'] = weatherData.current.vis_miles;
        currentWeather['pressure'] = weatherData.current.pressure_in;
        currentWeather['precipitation'] = weatherData.current.precip_in;

        currentLocation['city'] = weatherData.location.name;
        currentLocation['country'] = weatherData.location.country;
        currentLocation['region'] = weatherData.location.region
        currentLocation['longitude'] = weatherData.location.lon;
        currentLocation['lattitude'] = weatherData.location.lat;

        let title = document.getElementById('current-title');
        let wind = document.getElementById('current-wind');
        let humidity = document.getElementById('current-humidity');
        let uv = document.getElementById('current-uv');
        let realFeel = document.getElementById('current-realfeel');
        let visibility = document.getElementById('current-visibility');
        let pressure = document.getElementById('current-pressure');
        let precip = document.getElementById('current-precipitation');
        let temp = document.getElementById('current-temp');
        let image = document.getElementById('icon1');
        let description = document.getElementById('icon1-desc');
        
        //Displaying current weather data

        title.innerHTML = currentLocation.city + ' (' + currentLocation.region + ', ' + currentLocation.country + ')'
        temp.innerHTML = 'Temperature: ' + currentWeather.temperature + '°F';
        wind.innerHTML = 'Wind: ' + currentWeather.wind + ' mph ' +  currentWeather['wind-direction'];
        humidity.innerHTML = 'Humidity: ' + currentWeather.humidity + '%';
        uv.innerHTML = 'UV: ' + currentWeather.uv;
        realFeel.innerHTML = 'Feels Like: ' + currentWeather['feels-like'] + '°F';
        visibility.innerHTML = 'Visibility: ' + currentWeather.visibility + ' mi';
        pressure.innerHTML = 'Pressure: ' + currentWeather.pressure + ' inHg';
        precip.innerHTML = 'Precipitation: ' + currentWeather.precipitation + ' in';
        image.src = currentWeather['weather-icon'];
        description.innerHTML =  currentWeather.description;

    }
    const displayForecastWeather = (weatherData) => {
        //Extracting and collecting forecast weather information from API
        forecastWeather[0] = {
            date: weatherData.forecast.forecastday['0'].date,
            icon: weatherData.forecast.forecastday['0'].day.condition.icon,
            mintemp: weatherData.forecast.forecastday['0'].day.mintemp_f,
            maxtemp: weatherData.forecast.forecastday['0'].day.maxtemp_f
        }
        forecastWeather[1] = {
            date: weatherData.forecast.forecastday['1'].date,
            icon: weatherData.forecast.forecastday['1'].day.condition.icon,
            mintemp: weatherData.forecast.forecastday['1'].day.mintemp_f,
            maxtemp: weatherData.forecast.forecastday['1'].day.maxtemp_f
        }
        forecastWeather[2] = {
            date: weatherData.forecast.forecastday['2'].date,
            icon: weatherData.forecast.forecastday['2'].day.condition.icon,
            mintemp: weatherData.forecast.forecastday['2'].day.mintemp_f,
            maxtemp: weatherData.forecast.forecastday['2'].day.maxtemp_f
        }
        /*forecastWeather[3] = {
            date: weatherData.forecast.forecastday['3'].date,
            icon: weatherData.forecast.forecastday['3'].day.condition.icon,
            mintemp: weatherData.forecast.forecastday['3'].day.mintemp_f,
            maxtemp: weatherData.forecast.forecastday['3'].day.maxtemp_f
        }*/
        //Code for adding 4th forecast day

        let title1 = document.getElementById('day1-title');
        let info1 = document.getElementById('day1-info');
        let icon1 = document.getElementById('day1-icon');
        let title2 = document.getElementById('day2-title');
        let info2 = document.getElementById('day2-info');
        let icon2 = document.getElementById('day2-icon')
        let title3 = document.getElementById('day3-title');
        let info3 = document.getElementById('day3-info');
        let icon3 = document.getElementById('day3-icon')
       /* let title4 = document.getElementById('day4-title');
        let info4 = document.getElementById('day4-info');
        let icon4 = document.getElementById('day4-icon')*/
        //Code for adding 4th forecast day

        title1.innerHTML = forecastWeather[0].date;
        icon1.src = forecastWeather[0].icon;
        info1.innerHTML = 'min: ' + forecastWeather[0].mintemp + '°F' + "<br />" + 'max: ' +  forecastWeather[0].maxtemp + '°F';
        title2.innerHTML = forecastWeather[1].date;
        icon2.src = forecastWeather[1].icon;
        info2.innerHTML = 'min: ' + forecastWeather[1].mintemp + '°F' + "<br />" + 'max: ' +  forecastWeather[1].maxtemp + '°F';
        title3.innerHTML = forecastWeather[2].date;
        icon3.src = forecastWeather[2].icon;
        info3.innerHTML = 'min: ' + forecastWeather[2].mintemp + '°F' + "<br />" + 'max: ' +  forecastWeather[2].maxtemp + '°F';
       /* title4.innerHTML = forecastWeather[3].date;
        icon4.src = forecastWeather[3].icon;
        info4.innerHTML = 'min: ' + forecastWeather[3].mintemp + '°F' + "<br />" + 'max: ' +  forecastWeather[3].maxtemp + '°F';*/
        //Code for adding 4th forecast day
    }
}
const getWeatherByLocation = () => {

    if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
    else{
        alert('Sorry, your browser does not support HTML5 geolocation')
    }
    
}
const successCallback = (position) =>{
    
    let longitude = position.coords.longitude;
    let lattitude = position.coords.latitude;
    let currentWeather = {};
    let currentLocation = {};
    let forecastWeather = [];
    
    let weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lattitude},${longitude}&days=3&aqi=no`
    
    const req = new XMLHttpRequest();
    req.open('GET', weatherUrl, true);
    req.send();
    req.onload = () =>{
        let weatherData = JSON.parse(req.responseText);
        displayCurrentWeather(weatherData);
        displayForecastWeather(weatherData);
    }
    const displayCurrentWeather = (weatherData) => {
        //Extracting current weather information from weather
        currentWeather['description'] = weatherData.current.condition.text;
        currentWeather['weather-icon'] = weatherData.current.condition.icon;
        currentWeather['temperature'] = weatherData.current.temp_f;
        currentWeather['wind'] = weatherData.current.wind_mph;
        currentWeather['wind-direction'] = weatherData.current.wind_dir;
        currentWeather['humidity'] = weatherData.current.humidity;
        currentWeather['uv'] = weatherData.current.uv;
        currentWeather['feels-like'] = weatherData.current.feelslike_f;
        currentWeather['visibility'] = weatherData.current.vis_miles;
        currentWeather['pressure'] = weatherData.current.pressure_in;
        currentWeather['precipitation'] = weatherData.current.precip_in;

        currentLocation['city'] = weatherData.location.name;
        currentLocation['country'] = weatherData.location.country;
        currentLocation['region'] = weatherData.location.region
        currentLocation['longitude'] = weatherData.location.lon;
        currentLocation['lattitude'] = weatherData.location.lat;

        let title = document.getElementById('current-title');
        let wind = document.getElementById('current-wind');
        let humidity = document.getElementById('current-humidity');
        let uv = document.getElementById('current-uv');
        let realFeel = document.getElementById('current-realfeel');
        let visibility = document.getElementById('current-visibility');
        let pressure = document.getElementById('current-pressure');
        let precip = document.getElementById('current-precipitation');
        let temp = document.getElementById('current-temp');
        let image = document.getElementById('icon1');
        let description = document.getElementById('icon1-desc')

        title.innerHTML = currentLocation.city + ' (' + currentLocation.region + ', ' + currentLocation.country + ')'
        temp.innerHTML = 'Temperature: ' + currentWeather.temperature + '°F';
        wind.innerHTML = 'Wind: ' + currentWeather.wind + ' mph ' +  currentWeather['wind-direction'];
        humidity.innerHTML = 'Humidity: ' + currentWeather.humidity + '%';
        uv.innerHTML = 'UV: ' + currentWeather.uv;
        realFeel.innerHTML = 'Feels Like: ' + currentWeather['feels-like'] + '°F';
        visibility.innerHTML = 'Visibility: ' + currentWeather.visibility + ' mi';
        pressure.innerHTML = 'Pressure: ' + currentWeather.pressure + ' inHg';
        precip.innerHTML = 'Precipitation: ' + currentWeather.precipitation + ' in';
        image.src = currentWeather['weather-icon'];
        description.innerHTML =  currentWeather.description;

    }
    const displayForecastWeather = (weatherData) => {
        //Extracting and collecting forecast weather information from API
        forecastWeather[0] = {
            date: weatherData.forecast.forecastday['0'].date,
            icon: weatherData.forecast.forecastday['0'].day.condition.icon,
            mintemp: weatherData.forecast.forecastday['0'].day.mintemp_f,
            maxtemp: weatherData.forecast.forecastday['0'].day.maxtemp_f
        }
        forecastWeather[1] = {
            date: weatherData.forecast.forecastday['1'].date,
            icon: weatherData.forecast.forecastday['1'].day.condition.icon,
            mintemp: weatherData.forecast.forecastday['1'].day.mintemp_f,
            maxtemp: weatherData.forecast.forecastday['1'].day.maxtemp_f
        }
        forecastWeather[2] = {
            date: weatherData.forecast.forecastday['2'].date,
            icon: weatherData.forecast.forecastday['2'].day.condition.icon,
            mintemp: weatherData.forecast.forecastday['2'].day.mintemp_f,
            maxtemp: weatherData.forecast.forecastday['2'].day.maxtemp_f
        }
        /*forecastWeather[3] = {
            date: weatherData.forecast.forecastday['3'].date,
            icon: weatherData.forecast.forecastday['3'].day.condition.icon,
            mintemp: weatherData.forecast.forecastday['3'].day.mintemp_f,
            maxtemp: weatherData.forecast.forecastday['3'].day.maxtemp_f
        }*/
        //Code for adding 4th forecast day

        let title1 = document.getElementById('day1-title');
        let info1 = document.getElementById('day1-info');
        let icon1 = document.getElementById('day1-icon');
        let title2 = document.getElementById('day2-title');
        let info2 = document.getElementById('day2-info');
        let icon2 = document.getElementById('day2-icon')
        let title3 = document.getElementById('day3-title');
        let info3 = document.getElementById('day3-info');
        let icon3 = document.getElementById('day3-icon')
       /* let title4 = document.getElementById('day4-title');
        let info4 = document.getElementById('day4-info');
        let icon4 = document.getElementById('day4-icon')*/
        //Code for adding 4th forecast day

        title1.innerHTML = forecastWeather[0].date;
        icon1.src = forecastWeather[0].icon;
        info1.innerHTML = 'min: ' + forecastWeather[0].mintemp + '°F' + "<br />" + 'max: ' +  forecastWeather[0].maxtemp + '°F';
        title2.innerHTML = forecastWeather[1].date;
        icon2.src = forecastWeather[1].icon;
        info2.innerHTML = 'min: ' + forecastWeather[1].mintemp + '°F' + "<br />" + 'max: ' +  forecastWeather[1].maxtemp + '°F';
        title3.innerHTML = forecastWeather[2].date;
        icon3.src = forecastWeather[2].icon;
        info3.innerHTML = 'min: ' + forecastWeather[2].mintemp + '°F' + "<br />" + 'max: ' +  forecastWeather[2].maxtemp + '°F';
        /*title4.innerHTML = forecastWeather[3].date;
        icon4.src = forecastWeather[3].icon;
        info4.innerHTML = 'min: ' + forecastWeather[3].mintemp + '°F' + "<br />" + 'max: ' +  forecastWeather[3].maxtemp + '°F';*/
        //Code for adding 4th forecast day

    }
}
const errorCallback = (error) =>{

    if(error.code ==1){
        alert("You've decided not to share your geographical position. We will not ask again.");
    }
    else if(error.code == 2){
        alert("Network is down or the geolocation service cannot be reached");
    }
    else if(error.code == 3){
        alert("The session timed out before location position could be obtained");
    }
    else{
        alert("Geolcation failed do to unknown error")
    }
}


searchBtn.addEventListener('click', getWeatherByCity);
locationBtn.addEventListener('click', getWeatherByLocation);
