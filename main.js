// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric
// key: 1f5516af1699a3ac88ff6e968de9ee5b

// get references to HTML elements
let form = document.querySelector('.container form');
let input = document.querySelector('.container form input');
let msg = document.querySelector('.container form .msg');
let list = document.querySelector('.container .cities');

// store API key for OpenWeatherMap
let apiKey = '1f5516af1699a3ac88ff6e968de9ee5b';

// add event listener to form submit event
form.addEventListener('submit', event => {
    // prevent form submission to server
    event.preventDefault();

    // get the user input city name
    let city = input.value;

    // construct API URL for OpenWeatherMap
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // fetch weather data from OpenWeatherMap API
    fetch(url)
        .then(response => response.json()) // parse response as JSON
        .then(data => getWeather(data)) // call function to process weather data
        .catch(() => msg.innerText = "Search for a valid city"); // display error message on failure

    // clear input field
    input.value = "";
})

// process weather data and update HTML with the results
function getWeather(city) {
    console.log(city); // for debugging purposes

    // extract relevant data from the API response
    let {main, name, sys, weather} = city;

    // create new HTML element for displaying the weather data
    let li = document.createElement('li');
    li.classList.add('city');

    // set the content of the HTML element with the weather data
    let liContent = `
        <h2 class='city-name'>
            <span>${name}</span>
            <sup>${sys.country}</sup>
        </h2>
        <div class='city-temp'>${Math.round(main.temp)}\u00B0C</div>
        <i>
            <img class='city-icon' src='https://openweathermap.org/img/wn/${weather[0].icon}@2x.png' />
            <p>${weather[0].description}</p>
        </i>
    `;
    li.innerHTML = liContent;

    // add the new HTML element to the list of cities displayed
    list.appendChild(li);

    // clear any previous error messages
    msg.innerText = "";
}
