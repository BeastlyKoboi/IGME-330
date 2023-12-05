import * as utils from '../utils';

export default class Sprite {
    type: string;
    pivotX: number;
    pivotY: number;
    radius: number;
    rotation: number;
    rotRadius: number; 
    color: string;
    speed: number;
    x: number;
    y: number;
    scale: number; 

    constructor({ type, pivotX, pivotY, radius, rotation, rotRadius, color, speed = 10 }) {
        Object.assign(this, { type, pivotX, pivotY, radius, rotation, rotRadius, color, speed })
        this.x = this.pivotX + Math.cos(this.rotation) * this.rotRadius;
        this.y = this.pivotY + Math.sin(this.rotation) * this.rotRadius;
        this.scale = 1;
    }

    update(scale: number) {
        this.scale = scale;
        this.rotation += .01 * this.speed;
        if (this.rotation > 360)
            this.rotation -= 360;
        this.x = this.pivotX + Math.cos(this.rotation) * this.rotRadius * this.scale;
        this.y = this.pivotY + Math.sin(this.rotation) * this.rotRadius * this.scale;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        switch (this.type) {
            case "circle":
                utils.drawCircle(ctx, this.x, this.y, this.radius, this.color, this.scale);
                break;
        }
        ctx.restore();
    }
}