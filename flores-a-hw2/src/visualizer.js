import * as utils from './utils.js';
import { Sprite } from './Sprite.js';

let ctx, canvasWidth, canvasHeight, analyserNode, audioData;

let layer1Sprites = [];
let layer2Sprites = [];
let layer3Sprites = [];
let layer4Sprites = [];
let allSprites = [];

let layerColors = [];

const setupCanvas = (canvasElement, analyserNodeRef, startLayerColors) => {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;

    ctx.globalCompositeOperation = "source-over";

    // keep a reference to the analyser node
    analyserNode = analyserNodeRef;
    // this is the array where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.fftSize / 2);

    layerColors = startLayerColors;

    setupSprites();
}

const setupSprites = () => {

    // layer 1
    for (let i = 0; i < 5; i++) {
        layer1Sprites.push(new Sprite({
            type: "circle",
            pivotX: canvasWidth / 2,
            pivotY: canvasHeight / 2,
            radius: 50,
            rotation: Math.PI * 2 * i / 5,
            rotRadius: 200,
            color: layerColors[0],
            speed: 10
        }));
    }
    for (let i = 0; i < 5; i++) {
        layer2Sprites.push(new Sprite({
            type: "circle",
            pivotX: canvasWidth / 2,
            pivotY: canvasHeight / 2,
            radius: 50,
            rotation: Math.PI * 2 * i / 5,
            rotRadius: 300,
            color: layerColors[1],
            speed: -10
        }));
    }
    for (let i = 0; i < 5; i++) {
        layer3Sprites.push(new Sprite({
            type: "circle",
            pivotX: canvasWidth / 2,
            pivotY: canvasHeight / 2,
            radius: 50,
            rotation: Math.PI * 2 * i / 5,
            rotRadius: 400,
            color: layerColors[2],
            speed: 10
        }));
    }
    for (let i = 0; i < 5; i++) {
        layer4Sprites.push(new Sprite({
            type: "circle",
            pivotX: canvasWidth / 2,
            pivotY: canvasHeight / 2,
            radius: 50,
            rotation: Math.PI * 2 * i / 5,
            rotRadius: 500,
            color: layerColors[3],
            speed: -10
        }));
    }

    allSprites = [layer1Sprites, layer2Sprites, layer3Sprites, layer4Sprites];

};

const draw = (params = {}) => {
    // populate the audioData array with the frequency data from the analyserNode
    // notice these arrays are passed "by reference" 

    if (params.useFrequencyData)
        analyserNode.getByteFrequencyData(audioData);
    else if (params.useWaveformData)
        analyserNode.getByteTimeDomainData(audioData);

    // draw background
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    ctx.globalCompositeOperation = "lighter";
    let newScale = audioData[audioData.length / 4 - 1] / 128;
    for (let sprite of layer1Sprites) {
        sprite.update(newScale);
        sprite.draw(ctx);
    }

    newScale = audioData[2 * audioData.length / 4 - 1] / 128;
    for (let sprite of layer2Sprites) {
        sprite.update(newScale);
        sprite.draw(ctx);
    }

    newScale = audioData[3 * audioData.length / 4 - 1] / 128;
    for (let sprite of layer3Sprites) {
        sprite.update(newScale);
        sprite.draw(ctx);
    }

    newScale = audioData[4 * audioData.length / 4 - 1] / 128;
    for (let sprite of layer3Sprites) {
        sprite.update(newScale);
        sprite.draw(ctx);
    }

    ctx.globalCompositeOperation = "source-over";

    // 
    utils.drawCircle(ctx, canvasWidth / 2, canvasHeight / 2, 200, "black");
    utils.drawCircle(ctx, canvasWidth / 2, canvasHeight / 2, 190, "white");

    // 
    if (params.showBars) {
        const BAR_WIDTH = 6;
        const MAX_BAR_HEIGHT = 100;
        const PADDING = 3.5;
        const RADIUS = (audioData.length * (BAR_WIDTH + PADDING) / (2 * Math.PI));

        ctx.fillStyle = "black";
        ctx.save();
        ctx.translate(canvasWidth / 2,
            canvasHeight / 2 - RADIUS);

        for (let value of audioData) {
            let percent = value / 255;
            if (percent < .02) percent = 0.02;
            ctx.translate(BAR_WIDTH, 0); // move to right
            ctx.rotate(Math.PI * 2 / audioData.length);
            ctx.save();
            ctx.scale(1, 1);
            ctx.fillRect(0, 0, BAR_WIDTH, MAX_BAR_HEIGHT * percent);
            ctx.restore();
            ctx.translate(PADDING, 0);
        }
        ctx.restore();
    }


    // draw circles
    if (params.showCircles) {
        let maxRadius = canvasHeight / 4;
        ctx.save();
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < audioData.length; i++) {
            // red-ish circles
            let percent = audioData[i] / 255;

            let circleRadius = percent * maxRadius;
            ctx.beginPath();
            // ctx.fillStyle = utils.makeColor(255, 111, 111, .34 - percent / 3.0);
            ctx.fillStyle = utils.makeColor(0, 255, 255, .34 - percent / 3.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            // blue-ish circles, bigger, more transparent 
            ctx.beginPath();
            // ctx.fillStyle = utils.makeColor(0, 0, 255, .10 - percent / 10.0);
            ctx.fillStyle = utils.makeColor(200, 200, 200, .10 - percent / 10.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius * 1.5, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            // yellow-ish circles, smaller 
            ctx.save();
            ctx.beginPath();
            // ctx.fillStyle = utils.makeColor(200, 200, 0, .5 - percent / 5.0);
            ctx.fillStyle = utils.makeColor(0, 0, 255, .5 - percent / 5.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius * .50, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
        ctx.restore();
    }

    // bitmap manipulation
    // TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
    // regardless of whether or not we are applying a pixel effect
    // At some point, refactor this code so that we are looping though the image data only if
    // it is necessary

    // A) grab all of the pixels on the canvas and put them in the `data` array
    // `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
    // the variable `data` below is a reference to that array 
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width;

    if (params.showInvert) {
        // invert? 
        // Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
        for (let i = 0; i < length; i += 4) {

            let red = data[i], green = data[i + 1], blue = data[i + 2];
            data[i] = 255 - red;        // set red
            data[i + 1] = 255 - green;  // set green
            data[i + 2] = 255 - blue;   // set blue
            // data[i+3] is the alpha, but we're leaving that alone

        } // end for
    }

    // copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);
}

const setLayerColor = (layerNum, color) => {
    console.log(allSprites);
    let spriteLayer = allSprites[layerNum - 1];

    for (let sprite of spriteLayer) {
        sprite.color = color;
    }
    
};

export { setupCanvas, draw, setLayerColor };