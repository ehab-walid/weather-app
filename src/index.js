import "./style.css";
import { weatherIcons} from "./icons.js";


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
  let {address, description, currentConditions, days} = data;
  return {address, description, currentConditions, days};
}

// const stats = await fetchWeather("dhaka");

function searchFormHandler() {
  const form = document.getElementById("search-location-form");
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const keyword = formData.get("location");
    console.log(keyword);
    fetchAndDisplayWeather(keyword);
  })
}

async function fetchAndDisplayWeather(keyword) {
  const data = await fetchWeather(keyword);
  const container = document.querySelector(".display-container");
  renderCurrentWeather(data, container);
}


function renderCurrentWeather(data, container) {
  // Clear any existing content
  container.innerHTML = '';
  const curr_weather_section = document.createElement('div');
  curr_weather_section.classList.add('current-weather-section');

  // --- Build .current-left ---
  const currentLeft = document.createElement('div');
  currentLeft.className = 'current-left';

  const locTime = createDiv('current-loc-time', [
    createDiv('curr-loc', data.address),
    createDiv('curr-date', data.days[0].datetime)
  ]);

  

  const tempIcon = createDiv(['temp-icon', `${data.currentConditions.icon}`], "");
  tempIcon.innerHTML = weatherIcons[data.currentConditions.icon] || weatherIcons['cloudy'];
  console.log(weatherIcons[data.currentConditions.icon]);


  const tempSection = createDiv('temp-section', [
    tempIcon,
    createDiv('temp-desc-section', [
      createDiv('temp', data.currentConditions.temp),
      createDiv('weather-condition', data.currentConditions.conditions)
    ])
  ]);

  // document.querySelector('.temp-icon').style.backgroundImage = `url('./images/${data.currentConditions.icon}')`

  const weatherDesc = createDiv('weather-desc', data.description);

  currentLeft.append(locTime, tempSection, weatherDesc);

  // --- Build .current-right ---
  const currentRight = document.createElement('div');
  currentRight.className = 'current-right';

  const statsTop = createDiv('curr-stats-top', [
    createStat('feels-like', "Feels like", data.currentConditions.feelslike),
    createStat('weather-condition', "Conditions", data.currentConditions.conditions)
  ]);

  const statsBottom = createDiv('curr-stats-bottom', [
    createStat('humidity', 'Humidity', data.currentConditions.humidity),
    createStat('wind', 'Wind', data.currentConditions.windspeed),
    createStat('uv', 'UV', data.currentConditions.uvindex),
    createStat('sunrise', 'Sunrise', data.currentConditions.sunrise),
    createStat('sunset', 'Sunset', data.currentConditions.sunset)
  ]);

  currentRight.append(statsTop, statsBottom);

  curr_weather_section.append(currentLeft, currentRight);

  // --- Assemble and inject ---
  container.append(curr_weather_section);
}

// Helper: creates a div with a class and either text content or child elements
function createDiv(className, content) {
  const div = document.createElement('div');

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
    createDiv('stat-name', name),
    createDiv('stat-value', value)
  ]);
}

searchFormHandler();

