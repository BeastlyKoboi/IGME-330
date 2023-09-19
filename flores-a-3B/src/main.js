const colors = "red,green,blue";

const outputDiv = document.querySelector("#output");

// loads the XML file for question 3
const loadXML = (e) => {
    console.log(`In onload - HTTP Status Code = ${e.target.status}`);

    const xml = e.target.responseXML;
    if (!xml) {
        document.querySelector("#output").innerHTML = "XML is null!";
    }

    outputDiv.innerHTML += `<h1>${xml.querySelector("title").textContent}</h1>`;
    outputDiv.innerHTML += `<ol>${xml.querySelector("greetings").textContent
        .split(",").map((x) => `<li>${x}</li>`).join("")}</ol>`;
};

// Loads the JSON file for question 4
const loadJSON = (e) => {
    console.log(`In onload - HTTP Status Code = ${e.target.status}`);

    console.log(e.target);
    const response = e.target.responseText;
    if (!response) {
        document.querySelector("#output").innerHTML = "JSON is null!";
    }

    let jsonObj;
    try {
        jsonObj = JSON.parse(response);

    } catch {
        document.querySelector("#output").innerHTML = "JSON.parse() Failedl!";
        return;
    }

    outputDiv.innerHTML += `<h1>${jsonObj["title"]}</h1>`;
    outputDiv.innerHTML += `<ol>${jsonObj["greetings"].map((x) => `<li>${x}</li>`).join("")}</ol>`;
}

// Generic XHR function
const loadTextXHR = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = callback;
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
};

const init = () => {
    let colorsArr = colors.split(",");

    // Question 1
    let firstList = "<h1>Question 1</h1>";
    firstList += "<ol>";
    for (let color of colorsArr) {
        firstList += "<li>" + color + "</li>";
    }
    firstList += "</ol>";
    outputDiv.innerHTML = firstList;

    // Question 2
    outputDiv.innerHTML += `<h1>Question 2</h1><ol>${colorsArr.map((x) => `<li>${x}</li>`).join("")}</ol>`;

    // Question 3
    loadTextXHR("data/app-data.xml", loadXML);

    // Question 4
    loadTextXHR("data/app-data.json", loadJSON);

    // Question 5
    // It represents the XMLHttpRequest which has all the info 
    // about the data if taken, and the state of the request.
};

init();