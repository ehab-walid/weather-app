import "./style.css";
import { toggleUnit } from "./unitConverter.js";
import { fetchWeather } from "./weatherApi.js";
import {
  renderCurrentWeather,
  renderForecastWeather,
} from "./weatherRenderer.js";
import { displayNotFound } from "./errorMessage.js";
import { displayLoading } from "./loadingAnimation.js";
import { fetchPhoto } from "./pexelApi.js";
import { displayBackground } from "./backgroundRenderer.js";

let weather_data = null;

async function initSearchForm() {
  const form = document.getElementById("search-location-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const keyword = formData.get("location");
    fetchAndDisplayWeather(keyword);
    // fetchAndDisplayBackground(keyword);
  });
}

function renderAll() {
  if (!weather_data) return;
  const container = document.querySelector(".display-container");
  renderCurrentWeather(weather_data, container);
  renderForecastWeather(weather_data, container);
  fetchAndDisplayBackground(weather_data.resolvedAddress);
}

async function fetchAndDisplayBackground(keyword) {
  const img_url = await fetchPhoto(keyword);
  if(!img_url) return;
  displayBackground(img_url);
}

async function fetchAndDisplayWeather(keyword) {
  displayLoading();
  weather_data = await fetchWeather(keyword);
  if (!weather_data) {
    displayNotFound();
  } else {
    renderAll();
  }
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
