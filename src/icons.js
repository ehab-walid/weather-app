// icons.js
import clearDay from '../images/weather-icons/clear-day.svg';
import clearNight from '../images/weather-icons/clear-night.svg';
import cloudy from '../images/weather-icons/cloudy.svg';
import fog from '../images/weather-icons/fog.svg';
import hail from '../images/weather-icons/hail.svg';
import partlyCloudyDay from '../images/weather-icons/partly-cloudy-day.svg';
import partlyCloudyNight from '../images/weather-icons/partly-cloudy-night.svg';
import rainSnowShowersDay from '../images/weather-icons/rain-snow-showers-day.svg';
import rainSnowShowersNight from '../images/weather-icons/rain-snow-showers-night.svg';
import rainSnow from '../images/weather-icons/rain-snow.svg';
import rain from '../images/weather-icons/rain.svg';
import showersDay from '../images/weather-icons/showers-day.svg';
import showersNight from '../images/weather-icons/showers-night.svg';
import sleet from '../images/weather-icons/sleet.svg';
import snowShowersDay from '../images/weather-icons/snow-showers-day.svg';
import snowShowersNight from '../images/weather-icons/snow-showers-night.svg';
import snow from '../images/weather-icons/snow.svg';
import thunderRain from '../images/weather-icons/thunder-rain.svg';
import thunderShowersDay from '../images/weather-icons/thunder-showers-day.svg';
import thunderShowersNight from '../images/weather-icons/thunder-showers-night.svg';
import thunder from '../images/weather-icons/thunder.svg';
import wind from '../images/weather-icons/wind.svg';

export const weatherIcons = {
  'clear-day': clearDay,
  'clear-night': clearNight,
  'cloudy': cloudy,
  'fog': fog,
  'hail': hail,
  'partly-cloudy-day': partlyCloudyDay,
  'partly-cloudy-night': partlyCloudyNight,
  'rain-snow-showers-day': rainSnowShowersDay,
  'rain-snow-showers-night': rainSnowShowersNight,
  'rain-snow': rainSnow,
  'rain': rain,
  'showers-day': showersDay,
  'showers-night': showersNight,
  'sleet': sleet,
  'snow-showers-day': snowShowersDay,
  'snow-showers-night': snowShowersNight,
  'snow': snow,
  'thunder-rain': thunderRain,
  'thunder-showers-day': thunderShowersDay,
  'thunder-showers-night': thunderShowersNight,
  'thunder': thunder,
  'wind': wind,
};

// // Fallback icon in case the API returns a code with no matching SVG
// export function getWeatherIcon(iconCode) {
//   return weatherIcons[iconCode] || weatherIcons['cloudy'];
// }