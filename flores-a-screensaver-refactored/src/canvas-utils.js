import { getRandomColor, getRandomInt } from "./utils.js";

// canvas helpers
const drawRectangle = (ctx, x, y, width, height, fillStyle = "black", lineWidth = 0, strokeStyle = "black") => {
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();
    if (lineWidth > 0) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
}
const drawArc = (ctx, x, y, radius, fillStyle = "black", lineWidth = 0, strokeStyle = "black", startAngle = 0, endAngle = Math.PI * 2) => {
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.fill();
    if (lineWidth > 0) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
}
const drawLine = (ctx, x1, y1, x2, y2, lineWidth = 1, strokeStyle = "black") => {
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    if (lineWidth > 0) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
}

const drawRandomRect = ({ ctx, minX, minY, maxX, maxY, minWidth, maxWidth, minHeight, maxHeight }) => {
    let x = getRandomInt(minX, maxX);
    let y = getRandomInt(minY, maxY);
    let width = getRandomInt(minWidth, maxWidth);
    let height = getRandomInt(minHeight, maxHeight);
    let fillStyle = getRandomColor();
    let lineWidth = getRandomInt(0, 5);
    let strokeStyle = getRandomColor();
    drawRectangle(ctx, x, y, width, height, fillStyle, lineWidth, strokeStyle);
}
const drawRandomArc = ({ ctx, minX, minY, maxX, maxY, minRadius, maxRadius }) => {
    let x = getRandomInt(minX, maxX);
    let y = getRandomInt(minY, maxY);
    let radius = getRandomInt(minRadius, maxRadius);
    let fillStyle = getRandomColor();
    let lineWidth = getRandomInt(0, 5);
    let strokeStyle = getRandomColor();
    drawArc(ctx, x, y, radius, fillStyle, lineWidth, strokeStyle);
}
const drawRandomLine = ({ ctx, minX, minY, maxX, maxY }) => {
    let x1 = getRandomInt(minX, maxX);
    let y1 = getRandomInt(minY, maxY);
    let x2 = getRandomInt(minX, maxX);
    let y2 = getRandomInt(minY, maxY);
    let lineWidth = getRandomInt(0, 5);
    let strokeStyle = getRandomColor();
    drawLine(ctx, x1, y1, x2, y2, lineWidth, strokeStyle);
}
export { drawRectangle, drawArc, drawLine, drawRandomRect, drawRandomArc, drawRandomLine };