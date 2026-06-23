import "./style.css";
import { weatherIcons } from "./icons.js";

async function fetchWeather(location) {
  let response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=BJW9SMXTBJGJ4MEKWNGAR328X`,
  );
  let data = await response.json();
  console.log(data);
  // console.log(data.currentConditions.temp);
  let stats = getStats(data);
  console.log(stats);
  return stats;
}

function getStats(data) {
  let { address, description, currentConditions, days } = data;
  return { address, description, currentConditions, days };
}

// const stats = await fetchWeather("dhaka");
let weather_data = 0;
function searchFormHandler() {
  const form = document.getElementById("search-location-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const keyword = formData.get("location");
    console.log(keyword);
    fetchAndDisplayWeather(keyword);
  });
}

async function fetchAndDisplayWeather(keyword) {
  weather_data = await fetchWeather(keyword);
  const container = document.querySelector(".display-container");
  renderCurrentWeather(weather_data, container);
  renderForecastWeather(weather_data, container);
}

function renderCurrentWeather(data, container) {
  // Clear any existing content
  container.innerHTML = "";
  const curr_weather_section = document.createElement("div");
  curr_weather_section.classList.add("current-weather-section");

  // --- Build .current-left ---
  const currentLeft = document.createElement("div");
  currentLeft.className = "current-left";

  const locTime = createDiv("current-loc-time", [
    createDiv("curr-loc", data.address),
    createDiv("curr-date", data.days[0].datetime),
  ]);

  const tempIcon = createDiv(
    ["temp-icon", `${data.currentConditions.icon}`],
    "",
  );
  tempIcon.innerHTML =
    weatherIcons[data.currentConditions.icon] || weatherIcons["cloudy"];
  console.log(weatherIcons[data.currentConditions.icon]);

  const tempSection = createDiv("temp-section", [
    tempIcon,
    createDiv("temp-desc-section", [
      createDiv("temp", displayTemp(data.currentConditions.temp)),
      createDiv("weather-condition", data.currentConditions.conditions),
    ]),
  ]);

  // document.querySelector('.temp-icon').style.backgroundImage = `url('./images/${data.currentConditions.icon}')`

  const weatherDesc = createDiv("weather-desc", data.description);

  currentLeft.append(locTime, tempSection, weatherDesc);

  // --- Build .current-right ---
  const currentRight = document.createElement("div");
  currentRight.className = "current-right";

  const statsTop = createDiv("curr-stats-top", [
    createStat("feels-like temp", "Feels like", displayTemp(data.currentConditions.feelslike)),
    createStat(
      "weather-condition",
      "Conditions",
      data.currentConditions.conditions,
    ),
  ]);

  const statsBottom = createDiv("curr-stats-bottom", [
    createStat("humidity", "Humidity", data.currentConditions.humidity),
    createStat("wind", "Wind", data.currentConditions.windspeed),
    createStat("uv", "UV", data.currentConditions.uvindex),
    createStat("sunrise", "Sunrise", data.currentConditions.sunrise),
    createStat("sunset", "Sunset", data.currentConditions.sunset),
  ]);

  currentRight.append(statsTop, statsBottom);

  curr_weather_section.append(currentLeft, currentRight);

  // --- Assemble and inject ---
  container.append(curr_weather_section);
}

// Helper: creates a div with a class and either text content or child elements
function createDiv(className, content) {
  const div = document.createElement("div");

  if (Array.isArray(className)) {
    div.classList.add(...className);
  } else {
    div.className = className;
  }

  if (Array.isArray(content)) {
    div.append(...content);
  } else {
    div.textContent = content;
  }

  return div;
}

// Helper: creates a .curr-stats block (stat-name + stat-value)
function createStat(extraClass, name, value) {
  return createDiv(`curr-stats ${extraClass}`, [
    createDiv("stat-name", name),
    createDiv("stat-value", value),
  ]);
}

function renderForecastWeather(data, container) {
  const forecastHeader = createDiv(
    "forecast-header",
    "forecast for the next 7 days",
  );
  const forecastSection = createDiv("forecast-section", "");
  for(let i = 0; i < 7; i++) {
    forecastSection.appendChild(createForecastCard(data.days[i]));
  }
  container.append(forecastHeader, forecastSection);
}

function createForecastCard(data) {
  const forecastIcon = createDiv("forecast-icon", "");
  forecastIcon.innerHTML = weatherIcons[data.icon];
  const forecastCard = createDiv("forecast-card", [
    createDiv("forecast-day", "day"),
    createDiv("forecast-date", data.datetime),
    forecastIcon,
    createDiv("forecast-sky", data.conditions),
    createDiv("forecast-high-low", [
      createDiv("forecast-high temp", displayTemp(data.tempmax)),
      createDiv("forecast-low temp", displayTemp(data.tempmin)),
    ]),
  ]);
  return forecastCard;
}

let isCelcius = false;

const displayTemp = (temp) => {
  const text = isCelcius ? `${convertToCelcius(temp)}°C`: `${temp}°F`;
  return text;
}

function convertToCelcius(farenheit) {
  let celcius = (farenheit - 32) / 1.8;
  celcius = Math.round(celcius * 10) / 10;
  return celcius;
}

// const tempElements = document.querySelectorAll(".temp");

function toggleUnitHandler() {
  const toggleBtn = document.getElementById('toggle-unit-btn');
  toggleBtn.addEventListener('click', () => {
    isCelcius = !isCelcius;
    console.log(isCelcius);
    const container = document.querySelector(".display-container");
    renderCurrentWeather(weather_data, container);
    renderForecastWeather(weather_data, container);
  })
}

searchFormHandler();
toggleUnitHandler();
