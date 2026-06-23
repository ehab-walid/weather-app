let isCelcius = false;
const celcius = document.querySelector(".celcius");
const farenheit = document.querySelector(".farenheit");

export const getIsCelcius = () => isCelcius;

export const toggleUnit = () => {
    isCelcius = !isCelcius;
    
    if(isCelcius) {
        celcius.className = "celcius active";
        farenheit.className = "farenheit";
    } else {
        celcius.className = "celcius";
        farenheit.className = "farenheit active";
    }
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