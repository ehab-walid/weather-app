import "./style.css";
import { toggleUnit } from "./unitConverter.js";
import { fetchWeather } from "./weatherApi.js";
import { renderCurrentWeather, renderForecastWeather } from "./weatherRenderer.js";

let weather_data = null;

function initSearchForm() {
  const form = document.getElementById("search-location-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const keyword = formData.get("location");
    fetchAndDisplayWeather(keyword);
  });
}

function renderAll() {
  if (!weather_data) return;
  const container = document.querySelector(".display-container");
  renderCurrentWeather(weather_data, container);
  renderForecastWeather(weather_data, container);
}

async function fetchAndDisplayWeather(keyword) {
  weather_data = await fetchWeather(keyword);
  renderAll();
}

function initToggleUnit() {
  const toggleBtn = document.getElementById("toggle-unit-btn");
  toggleBtn.addEventListener("click", () => {
    toggleUnit();
    renderAll();
  });
}

initSearchForm();
initToggleUnit();
