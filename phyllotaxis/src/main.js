const canvasWidth = 600, canvasHeight = 600;
const fps = 60;
let ctx;
let numDots = 0;
let dotsLabel;
let divergence = 137.5;
let padding = 4;
let paddingLabel;
let dotRad = 2;
let dotRadLabel;

import { dtr } from "./utils.js";

function init() {
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    dotsLabel = document.querySelector("#label-dots");
    paddingLabel = document.querySelector("#label-padding");
    dotRadLabel = document.querySelector("#label-dot-radius");

    // Enable Reset Button
    document.querySelector("#btn-restart").onclick = resetCanvas;

    // Enable Divergence Options
    let optionDivergence = document.querySelector("#ctrl-divergence");
    divergence = optionDivergence.value;
    optionDivergence.onchange = function () { divergence = this.value; };

    // Enable Padding Slider
    let paddingSlider = document.querySelector("#range-padding");
    padding = paddingSlider.value;
    paddingSlider.oninput = function () {
        padding = this.value;
        paddingLabel.innerHTML = `Padding: ${padding}`;
    };

    // Enable Dot Radius Options
    let dotRadSlider = document.querySelector("#range-dot-radius");
    dotRad = dotRadSlider.value;
    dotRadSlider.oninput = function () {
        dotRad = this.value;
        dotRadLabel.innerHTML = `Dot Radius: ${dotRad}`;
    };

    // Update Labels with given values
    paddingLabel.innerHTML = `Padding: ${padding}`;
    dotRadLabel.innerHTML = `Dot Radius: ${dotRad}`;

    loop();
}

function resetCanvas() {
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    numDots = 0;
}

function loop() {
    setTimeout(loop, 1000 / fps);

    let angle = numDots * dtr(divergence);
    let radius = padding * Math.sqrt(numDots);

    // console.log(angle, radius);

    let x = radius * Math.cos(angle) + canvasWidth / 2;
    let y = radius * Math.sin(angle) + canvasHeight / 2;

    // console.log(x,y);
    // let color = `rgb(${numDots % 256},0,255)`;

    // let aDegrees = (numDots * divergence) % 256;
    // let color = `rgb(${aDegrees},0,255)`;

    // let aDegrees = (numDots * divergence) % 361;
    // let color = `hsl(${aDegrees},100%,50%)`;

    let color = `hsl(${numDots / 5 % 361},100%,50%)`;

    drawCircle(ctx, x, y, dotRad, color);
    numDots++
    dotsLabel.innerHTML = `Dots: ${numDots}`;
}

function drawCircle(ctx, x, y, radius, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

init();