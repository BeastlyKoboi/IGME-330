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
let flowerObjs = [];

import { dtr, drawCircle } from "./utils.js";
import { PhylloFlower } from "./PhylloFlower.js";

function init() {
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 
    flowerObjs.push(new PhylloFlower(100, 100, 137.5, 3));
    flowerObjs.push(new PhylloFlower(canvasWidth - 100, 100, 137.1, 3));

    loop();
}

function resetCanvas() {
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    numDots = 0;
}

function loop() {
    setTimeout(loop, 1000 / fps);

    for (let flower of flowerObjs) {
        flower.draw(ctx);
    }
}

init();