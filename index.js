// WEATHER APP
// require('dotenv').config();


const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "process.env.SECRET_KEY";

weatherForm.addEventListener("submit", async event =>{

    //stops form from refreshing
    event.preventDefault();

    // access whatever text we put into city input field    
    const city = cityInput.value;

    // if there is a city name do something with
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){ 
            console.error(error);
            displayError(error);
        }
        
    }
    else {
        displayError("Please enter a city name");
        console.log("Enter city name is working");
    }

});

//get data based on city
async function getWeatherData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiURL);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    else {
        return await response.json();
    }
}

//show weather information in json format
function displayWeatherInfo(data) {
    
    const {
        name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]}= data;

    card.textContent = "";
    card.style.display = "flex";
 
    // The html tag you want to use for the content of the card
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDiaplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // The content inside of the card that we are adding
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDiaplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    //adding the style class to the card display
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDiaplay.classList.add("humidityDiaplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDiaplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    
}

// get weather emoji based on weather id
function getWeatherEmoji(weatherId) {
    
    switch(true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫"
        case (weatherId === 800):
            return "☀️";
        case (weatherId == 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}

// Show error message if weather data is not available
function displayError(message){

    // create a new paragraph element
    const errorDisplay = document.createElement("p");

    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

    console.log("error display is working");
}
