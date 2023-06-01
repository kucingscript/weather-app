const container = document.querySelector(".container");
const searchBtn = document.querySelector(".search__box button");
const inputCity = document.querySelector(".search__box input");
const weatherBox = document.querySelector(".weather__box");
const weatherDetails = document.querySelector(".weather__details");
const error404 = document.querySelector(".not__found");

const key = import.meta.env.VITE_KEY;

const getData = () => {
  const city = inputCity.value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        container.style.height = "430px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const img = document.querySelector(".weather__box img");
      const temperature = document.querySelector(".weather__box .temperature");
      const desc = document.querySelector(".weather__box .description");
      const humidity = document.querySelector(
        ".weather__details .humidity span"
      );
      const wind = document.querySelector(".weather__details .wind span");

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
        default:
          img.src = "";
      }

      temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
      desc.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "auto";
    });
};

searchBtn.addEventListener("click", getData);
inputCity.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    getData();
  }
});
