//The function begins with a try block to handle potential errors during asynchronous operations.
async function fetchWeatherAndCrypto() {
    try {
        const position = await new Promise((resolve, reject) => {
            //It uses the navigator.geolocation.getCurrentPosition() method to obtain the user's current position asynchronously. 
            //This is wrapped in a Promise to ensure the asynchronous result is handled properly.
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        //After obtaining the user's position, the function sends a request to the OpenWeatherMap API (https://apis.scrimba.com/openweathermap/data/2.5/weather) to fetch weather data based on the latitude and longitude coordinates.
        const weatherRes = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`);
        
        //If the weather data retrieval is successful (i.e., weatherRes.ok is true), it parses the JSON response and extracts relevant information such as temperature, city name, and weather icon URL.
        //Then, it updates the DOM elements related to weather with the fetched data.
        if (!weatherRes.ok) {
            throw Error("Weather data not available");
        }
        
        const weatherData = await weatherRes.json();
        const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        
        document.getElementById("weather").innerHTML = `
            <img src=${weatherIconUrl} />
            <p class="weather-temp">${Math.round(weatherData.main.temp)}º</p>
            <p class="weather-city">${weatherData.name}</p>
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        // Handle error
    }
    //Next, the function sends a request to the CoinGecko API (https://api.coingecko.com/api/v3/coins/dogecoin) to fetch cryptocurrency data for Dogecoin.
    try {
        const cryptoRes = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin");
        //If the cryptocurrency data retrieval is successful, it parses the JSON response and
        // updates the DOM elements related to cryptocurrency with the fetched data, including the cryptocurrency's name, logo, current price, highest price in the last 24 hours, and lowest price in the last 24 hours.
        if (!cryptoRes.ok) {
            throw Error("Something went wrong");
        }
        
        const cryptoData = await cryptoRes.json();
        
        document.getElementById("crypto-top").innerHTML = `
            <img src=${cryptoData.image.small} />
            <span>${cryptoData.name}</span>
        `;
        
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${cryptoData.market_data.current_price.usd}</p>
            <p>👆: $${cryptoData.market_data.high_24h.usd}</p>
            <p>👇: $${cryptoData.market_data.low_24h.usd}</p>
        `;
    //Any errors that occur during the process are caught in the catch block, and appropriate error handling can be implemented.
    } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
        // Handle error
    }
}

async function fetchBackgroundImage() {
    try {
        const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
        const data = await res.json();
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        document.getElementById("author").textContent = "Created By: Kitayi Sandile";
    } catch (error) {
        console.error("Error fetching image data:", error);
        // Handle error
    }
}

function changeBackgroundAutomatically() {
    fetchBackgroundImage(); // Change background immediately
    setInterval(fetchBackgroundImage, 10000); // Change background every 10 seconds
}

changeBackgroundAutomatically(); // Start changing background automatically
fetchWeatherAndCrypto(); // Fetch weather and cryptocurrency data
setInterval(getCurrentTime, 3000); // Update current time every second

function getCurrentTime() {
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"});
}