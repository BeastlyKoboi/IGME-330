import * as utils from './utils.js';

class Sprite {
    constructor({ type, pivotX, pivotY, radius, rotation, rotRadius, color, speed = 10 }) {
        Object.assign(this, { type, pivotX, pivotY, radius, rotation, rotRadius, color, speed })
        this.x = this.pivotX + Math.cos(this.rotation) * this.rotRadius;
        this.y = this.pivotY + Math.sin(this.rotation) * this.rotRadius;
        this.scale = 1;
    }

    update(scale) {
        this.scale = scale;
        this.rotation += .01 * this.speed;
        if (this.rotation > 360)
            this.rotation -= 360;
        this.x = this.pivotX + Math.cos(this.rotation) * this.rotRadius * this.scale;
        this.y = this.pivotY + Math.sin(this.rotation) * this.rotRadius * this.scale;
    }

    draw(ctx) {
        ctx.save();
        switch (this.type) {
            case "circle":
                utils.drawCircle(ctx, this.x, this.y, this.radius, this.color, this.scale);
                break;
        }
        ctx.restore();
    }
}

export { Sprite };