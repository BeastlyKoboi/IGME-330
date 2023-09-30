let canvas;
let ctx;
let paused = false;
let createRectangles;
let createArcs;
let createLines;

import { getRandomColor, getRandomInt } from "./utils.js";
import {
    drawRectangle, drawArc, drawLine,
    drawRandomRect, drawRandomArc, drawRandomLine
} from "./canvas-utils.js";

const init = () => {
    console.log("Page Loaded!");

    canvas = document.querySelector("canvas");

    ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";

    ctx.fillRect(20, 20, 600, 440);

    // Rect
    drawRectangle(ctx, 120, 120, 400, 300, "yellow", 10, "magenta");

    // Lines
    drawLine(ctx, 20, 20, 620, 460, 5, "magenta");
    drawLine(ctx, 620, 20, 20, 460, 5, "magenta");

    // Circle
    drawArc(ctx, 320, 240, 50, "green", 1, "purple", 0, 2 * Math.PI);

    // small circle
    drawArc(ctx, 320, 240, 20, "gray", 1, "yellow", 0, Math.PI);

    // Left Eye
    drawArc(ctx, 300, 220, 10, "gray", 1, "yellow", 0, 2 * Math.PI);

    // Right Eye
    drawArc(ctx, 340, 220, 10, "gray", 1, "yellow", 0, 2 * Math.PI);

    // Added Line
    drawLine(ctx, 20, 50, 620, 50, 20, "yellow");

    setupUI();

    update();
}

const update = () => {
    if (paused) return;
    requestAnimationFrame(update);
    if (createRectangles) drawRandomRect({
        ctx,
        minX: 0,
        minY: 0,
        maxX: 640,
        maxY: 480,
        minWidth: 10,
        maxWidth: 90,
        minHeight: 10,
        maxHeight: 90
    });
    if (createArcs) drawRandomArc({
        ctx,
        minX: 0,
        minY: 0,
        maxX: 640,
        maxY: 480,
        minRadius: 10,
        maxRadius: 90
    });
    if (createLines) drawRandomLine({
        ctx,
        minX: 0,
        minY: 0,
        maxX: 640,
        maxY: 480,
    });
}

// Event handlers
const canvasClicked = (e) => {
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    console.log(mouseX, mouseY);
    for (let i = 0; i < 10; i++) {
        let x = getRandomInt(-100, 100) + mouseX;
        let y = getRandomInt(-100, 100) + mouseY;
        let radius = getRandomInt(10, 30);
        let color = getRandomColor();
        // drawRectangle(ctx, x, y, width, height, color);
        drawArc(ctx, x, y, radius, color);
    }
}

// helpers
const setupUI = () => {
    document.querySelector("#btn-pause").onclick = () => {
        paused = true;
    };
    document.querySelector("#btn-play").onclick = () => {
        if (!paused) return;
        paused = false;
        update();
    };
    document.querySelector("#btn-clear").onclick = () => {
        ctx.clearRect(0, 0, 640, 480);
    };

    canvas.onclick = canvasClicked;

    createRectangles = document.querySelector("#cb-rectangles").checked;
    createArcs = document.querySelector("#cb-arcs").checked;
    createLines = document.querySelector("#cb-lines").checked;

    document.querySelector("#cb-rectangles").onclick = (e) => {
        createRectangles = e.target.checked;
    };
    document.querySelector("#cb-arcs").onclick = (e) => {
        createArcs = e.target.checked;
    };
    document.querySelector("#cb-lines").onclick = (e) => {
        createLines = e.target.checked;
    };
}

init();