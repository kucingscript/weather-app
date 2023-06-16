const container = document.querySelector(".container");
const searchBtn = document.querySelector(".search__box button");
const inputCity = document.querySelector(".search__box input");
const weatherBox = document.querySelector(".weather__box");
const weatherDetails = document.querySelector(".weather__details");
const error404 = document.querySelector(".not__found");

const key = import.meta.env.VITE_KEY;

const detectLocation = () => {
  const success = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    )
      .then((response) => response.json())
      .then((data) => {
        reversedGeoLocation(lat, lon, key);
        renderImages(data);
        renderDesc(data);
      });
  };

  const error = () => {
    alert("Unable to fetch your location");
  };

  navigator.geolocation.getCurrentPosition(success, error);
};

const getData = () => {
  const city = inputCity.value;
  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        renderError();
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const lat = data.coord.lat;
      const lon = data.coord.lon;
      reversedGeoLocation(lat, lon, key);

      renderImages(data);
      renderDesc(data);
    });
};

const renderError = () => {
  container.style.height = "430px";
  weatherBox.style.display = "none";
  weatherDetails.style.display = "none";
  error404.style.display = "block";
  error404.classList.add("fadeIn");
};

const renderImages = (data) => {
  const img = document.querySelector(".weather__box img");

  switch (data.weather[0].main) {
    case "Clear":
      img.src = "/clear.png";
      break;
    case "Rain":
      img.src = "/rain.png";
      break;
    case "Snow":
      img.src = "/snow.png";
      break;
    case "Clouds":
      img.src = "/cloud.png";
      break;
    case "Haze":
      img.src = "/mist.png";
      break;
    case "Thunderstorm":
      img.src = "/snow.png";
      break;
    default:
      img.src = "";
  }
};

const renderDesc = (data) => {
  const temperature = document.querySelector(".weather__box .temperature");
  const desc = document.querySelector(".weather__box .description");
  const humidity = document.querySelector(".weather__details .humidity span");
  const wind = document.querySelector(".weather__details .wind span");

  temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
  desc.innerHTML = `${data.weather[0].description}`;
  humidity.innerHTML = `${data.main.humidity}%`;
  wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

  weatherBox.style.display = "";
  weatherDetails.style.display = "";
  weatherBox.classList.add("fadeIn");
  weatherDetails.classList.add("fadeIn");

  const mediaQuery = window.matchMedia(`(max-width: 576px)`);
  if (mediaQuery.matches) {
    container.style.height = "580px";
  } else {
    container.style.height = "610px";
  }
};

const reversedGeoLocation = (lat, lon, key) => {
  fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&&appid=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      inputCity.value = `${data[0].name}, ${data[0].state} - ${data[0].country}`;
    });
};

searchBtn.addEventListener("click", getData);
inputCity.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    getData();
  }
});

detectLocation();
