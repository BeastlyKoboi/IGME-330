const makeColor = (red, green, blue, alpha = 1) => {
    return `rgba(${red},${green},${blue},${alpha})`;
};

const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
};

const getRandomColor = () => {
    const floor = 35; // so that colors are not too bright or too dark 
    const getByte = () => getRandom(floor, 255 - floor);
    return `rgba(${getByte()},${getByte()},${getByte()},1)`;
};

const getLinearGradient = (ctx, startX, startY, endX, endY, colorStops) => {
    let lg = ctx.createLinearGradient(startX, startY, endX, endY);
    for (let stop of colorStops) {
        lg.addColorStop(stop.percent, stop.color);
    }
    return lg;
};

const drawSquare = (ctx, x, y, width, height, rotation, scale, fillStyle) => {
    ctx.save();  // save the old state attributes
    ctx.fillStyle = fillStyle;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);
    // now we'll draw from the center to get the rotation right
    ctx.fillRect(0 - width / 2, 0 - height / 2, width, height);
    ctx.restore();
}

const drawCircle = (ctx, x, y, radius, color, scale = 1) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius * scale, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
const goFullscreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullscreen) {
        element.mozRequestFullscreen();
    } else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
    // .. and do nothing if the method is not supported
};

const loadJSON = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = callback;
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
};

export {
    makeColor, getRandomColor, getLinearGradient,
    drawSquare, drawCircle,
    goFullscreen, loadJSON
};