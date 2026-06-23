let isCelcius = false;

export const getIsCelcius = () => isCelcius;

export const toggleUnit = () => {
    isCelcius = !isCelcius;
    return isCelcius;
}

export const displayTemp = (temp) => {
  return isCelcius ? `${convertToCelcius(temp)}°C`: `${temp}°F`;
}

function convertToCelcius(farenheit) {
  let celcius = (farenheit - 32) / 1.8;
  celcius = Math.round(celcius * 10) / 10;
  return celcius;
}