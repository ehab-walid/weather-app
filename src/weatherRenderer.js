import { createDiv, createStat } from "./domHelpers.js";
import { displayTemp } from "./unitConverter.js";
import { weatherIcons } from "./icons.js";
import { format, fromUnixTime } from "date-fns";

export function renderCurrentWeather(data, container) {
  // Clear any existing content
  container.innerHTML = "";
  const curr_weather_section = document.createElement("div");
  curr_weather_section.className = "current-weather-section glass-panel";

  // --- Build .current-left ---
  const currentLeft = document.createElement("div");
  currentLeft.className = "current-left";

  const locTime = createDiv("current-loc-time", [
    createDiv("curr-loc", data.address),
    createDiv("curr-date", format(data.days[0].datetime, "PPP") || ""),
  ]);

  const tempIcon = createDiv(
    ["temp-icon", `${data.currentConditions.icon}`],
    "",
  );
  tempIcon.innerHTML =
    weatherIcons[data.currentConditions.icon] || weatherIcons["cloudy"];

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
    createStat(
      "sunrise",
      "Sunrise",
      formatTime(data.currentConditions.sunriseEpoch),
    ),
    createStat(
      "sunset",
      "Sunset",
      formatTime(data.currentConditions.sunsetEpoch),
    ),
  ]);

  currentRight.append(statsTop, statsBottom);

  curr_weather_section.append(currentLeft, currentRight);

  // --- Assemble and inject ---
  container.append(curr_weather_section);
}

function formatTime(epoch) {
  if (epoch == null) return "—";
  try {
    return format(fromUnixTime(epoch), "p");
  } catch {
    return "—";
  }
}

export function renderForecastWeather(data, container) {
  const forecastIcon = createDiv("forecast-header-icon", "");
  forecastIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>newspaper</title><path d="M20,11H4V8H20M20,15H13V13H20M20,19H13V17H20M11,19H4V13H11M20.33,4.67L18.67,3L17,4.67L15.33,3L13.67,4.67L12,3L10.33,4.67L8.67,3L7,4.67L5.33,3L3.67,4.67L2,3V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V3L20.33,4.67Z" /></svg>`;
  const forecastHeader = createDiv("forecast-header", [
    forecastIcon,
    createDiv("forecast-header-text", "forecast for the next 7 days"),
  ]);
  const forecastSection = createDiv("forecast-section", "");
  for (let i = 1; i < 8; i++) {
    forecastSection.appendChild(createForecastCard(data.days[i]));
  }
  container.append(forecastHeader, forecastSection);
}

function createForecastCard(data) {
  const forecastIcon = createDiv("forecast-icon", "");
  forecastIcon.innerHTML = weatherIcons[data.icon];
  const forecastCard = createDiv("forecast-card glass-panel", [
    createDiv("forecast-day", format(data.datetime, "ccc")),
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
