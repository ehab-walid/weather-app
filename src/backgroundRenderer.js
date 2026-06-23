const body = document.querySelector('body');
export function displayBackground(img_url) {
    body.style.backgroundImage = "";
    body.style.backgroundImage = `url("${img_url}")`;
}