import { colorStop } from "./interfaces/colorStop.interface";

const makeColor = (red: number, green: number, blue: number, alpha = 1) => {
    return `rgba(${red},${green},${blue},${alpha})`;
};

const getRandom = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

const getRandomColor = () => {
    const floor = 35; // so that colors are not too bright or too dark 
    const getByte = () => getRandom(floor, 255 - floor);
    return `rgba(${getByte()},${getByte()},${getByte()},1)`;
};

const getLinearGradient = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, colorStops: colorStop[]) => {
    let lg = ctx.createLinearGradient(startX, startY, endX, endY);
    for (let stop of colorStops) {
        lg.addColorStop(stop.percent, stop.color);
    }
    return lg;
};

const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, rotation: number, scale: number, fillStyle: string) => {
    ctx.save();  // save the old state attributes
    ctx.fillStyle = fillStyle;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);
    // now we'll draw from the center to get the rotation right
    ctx.fillRect(0 - width / 2, 0 - height / 2, width, height);
    ctx.restore();
}

const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, scale = 1) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius * scale, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
const goFullscreen = (element: HTMLCanvasElement) => {
    if (element.requestFullscreen)
        element.requestFullscreen();
};

const loadJSON = (url: string, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = callback;
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${(e.target as XMLHttpRequest).status}`);
    xhr.open("GET", url);
    xhr.send();
};

export {
    makeColor, getRandomColor, getLinearGradient,
    drawSquare, drawCircle,
    goFullscreen, loadJSON
};