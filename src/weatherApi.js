const API_KEY = "BJW9SMXTBJGJ4MEKWNGAR328X";

export async function fetchWeather(location) {
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`,
    );
    const data = await response.json();
    return getStats(data);
  }

function getStats(data) {
    let { address, description, currentConditions, days } = data;
    return { address, description, currentConditions, days };
  }