let words1, words2, words3;

let output;

import { getRandomItem } from "./utils.js";

const getTechnobabble = (lines = 1) => {
    if (!output)
        output = document.querySelector("#output");

    output.innerHTML = ``;
    for (let i = 0; i < lines; i++) {
        output.innerHTML += `<p>${getRandomItem(words1)} ${getRandomItem(words2)} ${getRandomItem(words3)}</p>`;
    }
};

const babbleLoaded = (e) => {
    console.log(`In onload - HTTP Status Code = ${e.target.status}`);

    const response = e.target.responseText;
    if (!response) {
        document.querySelector("#output").innerHTML = "Response is null!";
    }

    let jsonObject = JSON.parse(response);

    ({ words1, words2, words3 } = jsonObject);

    const babbleBtn = document.querySelector("#babble-btn");
    const multiBabbleBtn = document.querySelector("#multi-babble-btn");

    babbleBtn.addEventListener("click", () => getTechnobabble(1));
    multiBabbleBtn.addEventListener("click", () => getTechnobabble(5));

    getTechnobabble(1);
};

const loadBabble = () => {
    const url = "data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = babbleLoaded;
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
};

loadBabble();