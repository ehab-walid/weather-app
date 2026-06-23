import { createDiv } from "./domHelpers.js";

export function displayNotFound() {
  const container = document.querySelector(".display-container");
  container.innerHTML = "";

    const messageContainer = createDiv('message-container', [createDiv('error-message', "Location not found. Please provide a valid location/city.")]);
    container.append(messageContainer);
}
