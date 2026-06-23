import { createDiv, createStat } from "./domHelpers.js";
import { displayTemp } from "./unitConverter.js";
import { weatherIcons } from "./icons.js";

export function renderCurrentWeather(data, container) {
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
    createStat(
      "feels-like temp",
      "Feels like",
      displayTemp(data.currentConditions.feelslike),
    ),
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

export function renderForecastWeather(data, container) {
  const forecastHeader = createDiv(
    "forecast-header",
    "forecast for the next 7 days",
  );
  const forecastSection = createDiv("forecast-section", "");
  for (let i = 0; i < 7; i++) {
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
