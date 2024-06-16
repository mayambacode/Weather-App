// WEATHER APP

const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "a1d0551adb2823e55b85af9bad4a32f4";

weatherForm.addEventListener('submit',event =>{

    //stops form from refreshing
    event.preventDefault();

    // access whatever text we put into city input field    
    const city = cityInput.value;

    // if there is a city name do something with
    if(city){

    }
    else {
        displayError("Please enter a city name");
    }

});

//get data based on city
async function getWeatherData(city) {

}

//show weather information in json format
function displayWeatherInfo(data) {

}

// get weather emoji based on weather id
function getWeatherEmoji(weatherId) {

}

// Show error message if weather data is not available
function displayError(message){

    // create a new paragraph element
    const errorDisplay = document.createElement('p')
    
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
}
