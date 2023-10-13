import { dtr, drawCircle } from "./utils.js";

class PhylloFlower {
    constructor(x, y, divergence, padding, dotRad = 2) {
        this.numDots = 0;
        this.x = x;
        this.y = y;
        this.divergence = divergence;
        this.padding = padding;
        this.dotRad = dotRad;
    }
    draw(ctx) {
        let angle = this.numDots * dtr(this.divergence);
        let radius = this.padding * Math.sqrt(this.numDots);

        let x = radius * Math.cos(angle) + this.x;
        let y = radius * Math.sin(angle) + this.y;

        let color = `hsl(${this.numDots / 5 % 361},100%,50%)`;

        drawCircle(ctx, x, y, this.dotRad, color);
        this.numDots++
    }
}

export { PhylloFlower };