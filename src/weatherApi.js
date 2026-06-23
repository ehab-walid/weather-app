const API_KEY = "BJW9SMXTBJGJ4MEKWNGAR328X";

export async function fetchWeather(location) {
  try {
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }
    
    const data = await response.json();
    return getStats(data);
  } catch (error) {
    console.error("Fetch pipeline operation failed:", error.message);
  }
}

function getStats(data) {
  let { address, description, currentConditions, days } = data;
  return { address, description, currentConditions, days };
}
