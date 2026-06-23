import { createDiv } from "./domHelpers.js";

const container = document.querySelector(".display-container");

export function displayLoading() {
    container.innerHTML = "";
    createLoading();
}

function createLoading() {
    container.append(createDiv('spinner', ""), createDiv("spinner-text", "Fetching data..."));
}