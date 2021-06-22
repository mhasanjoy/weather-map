const defaultCityWeather = (data) => {
    document.getElementById("weather-container").innerHTML = `
        <img id="icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        <h1 id="display-city">${data.name}</h1>
        <h3><span id="temperature">${data.main.temp}</span>&deg;C</h3>
        <h3 id="weather">${data.weather[0].main}</h3>
    `;
};


fetch("https://api.openweathermap.org/data/2.5/weather?q=Dhaka&units=metric&appid=762eb5addbc08a2586ffa4cc252a63ee")
    .then(response => response.json())
    .then(data => defaultCityWeather(data));


function showWeather(data) {
    const iconCode = data.weather[0].icon;
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("display-city").innerText = data.name;
    document.getElementById("temperature").innerText = data.main.temp;
    document.getElementById("weather").innerText = data.weather[0].main;

    toggleSpinner();
}


document.getElementById("input-city").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        document.getElementById("search").click();
        event.preventDefault();
    }
});


document.getElementById("search").addEventListener("click", function (event) {
    const inputCity = document.getElementById("input-city").value;

    toggleSpinner();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=762eb5addbc08a2586ffa4cc252a63ee`)
        .then(response => response.json())
        .then(data => showWeather(data))
        .catch(error => {
            alert(`${inputCity} not found. Please try again.`);
            toggleSpinner();
        });

    event.preventDefault();
});


const toggleSpinner = () => {
    const spinner = document.getElementById("loading-spinner");
    spinner.classList.toggle("d-none");

    const weatherMap = document.getElementById("weather-container");
    weatherMap.classList.toggle("d-none");
};