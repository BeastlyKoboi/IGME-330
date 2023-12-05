/*
    main.js is primarily responsible for hooking up the UI to the rest of the application 
    and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils';
import * as audio from './audio';
import * as canvas from './visualizer';
import { DrawParams } from './interfaces/drawParams.interface';

let paused = false;

const drawParams: DrawParams = {
    useFrequencyData: true,
    useWaveformData: false,
    showBars: true,
    showCircles: true,
    showInvert: false
};

const DEFAULTS = Object.seal({
    defaultSound: "media/New Adventure Theme.mp3",
    volume: 0,
    impulseResponse: "",
    distortion: 0,
    hasReverb: true,
    layerColors: []
});

const init = () => {
    utils.loadJSON("./data/av-data.json", saveJSON);
};

const saveJSON = (e) => {
    const response = e.target.responseText;
    if (!response) {
        console.log(`Error in JSON response`);
    }

    let defaultInfo = JSON.parse(response);

    document.querySelector("title").innerHTML = defaultInfo.title;

    let soundOptions;
    ({ soundOptions } = defaultInfo);

    let optionsHTML = soundOptions.map(option => { return `<option value="${option.url}">${option.name}</option>` }).join("");
    document.querySelector("#select-track").innerHTML = optionsHTML;
    DEFAULTS.defaultSound = soundOptions[0].url;

    DEFAULTS.volume = defaultInfo.volume;

    DEFAULTS.impulseResponse = defaultInfo.impulseResponse;

    DEFAULTS.hasReverb = defaultInfo.hasReverb;

    drawParams.useFrequencyData = defaultInfo.useFrequency;
    drawParams.useWaveformData = !defaultInfo.useFrequency;

    DEFAULTS.layerColors = defaultInfo.layerStartingColors;

    setupModules();
};

const setupModules = () => {
    audio.DEFAULTS.hasReverb = DEFAULTS.hasReverb;
    audio.setupWebaudio(DEFAULTS.defaultSound, DEFAULTS.impulseResponse);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI(canvasElement);
    canvas.setupCanvas(canvasElement, audio.analyserNode, DEFAULTS.layerColors);

    window.onblur = () => {
        paused = true;
    };
    window.onfocus = () => {
        paused = false;
        loop();
    };

    loop();
};

const setupUI = (canvasElement: HTMLCanvasElement) => {
    // A - hookup fullscreen button
    const playButton = document.querySelector("#btn-play") as HTMLButtonElement;
    const fsButton = document.querySelector("#btn-fullscreen") as HTMLButtonElement;

    // add .onclick event to fullscreen button
    fsButton.onclick = e => {
        console.log("goFullscreen() called");
        utils.goFullscreen(canvasElement);
    };

    // Ad .onclick event to Play/Pause button
    playButton.onclick = e => {
        console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

        let playButton = e.target as HTMLButtonElement;

        // Check if context is in suspended state (autoplay policy)
        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
        }
        console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
        if (playButton.dataset.playing == "no") {
            // if track is currently paused, play it
            audio.playCurrentSound();
            playButton.dataset.playing = "yes"; // Our CSS will set teh text to "Pause"
            // if the track IS playing, pause it
        } else {
            audio.pauseCurrentSound();
            playButton.dataset.playing = "no"; /// our CSS will set the text to "Play"
        }
    };

    // hookup volume slider & label 
    let volumeSlider = document.querySelector("#slider-volume") as HTMLInputElement;
    let volumeLabel = document.querySelector("#lbl-volume") as HTMLSpanElement;

    // add .oninput event to slider
    volumeSlider.oninput = e => {
        let volumeValue: number = Number((e.target as HTMLInputElement).value);

        // set the gain
        audio.setVolume(volumeValue);
        console.log(volumeValue);
        // update value of label to match value of slider 
        volumeLabel.innerHTML = `${Math.round((volumeValue / 2 * 100))}`;
    };

    // set value of label to match initial value of slider
    volumeSlider.value = String(DEFAULTS.volume);
    console.log(volumeSlider);
    volumeSlider.dispatchEvent(new Event("input"));

    // hookup track <select>
    let trackSelect: HTMLSelectElement = document.querySelector("#select-track") as HTMLSelectElement;
    // add .onchange event to <select>
    trackSelect.onchange = e => {
        let selectedTrack = (e.target as HTMLSelectElement).value;

        audio.loadSoundFile(selectedTrack);
        // pause the current track if it is playing
        if (playButton.dataset.playing == "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
    };
    trackSelect.dispatchEvent(new Event("change"));

    // Toggle for Frequency or Waveform data
    let dataUsed = document.querySelector("#select-data-type") as HTMLSelectElement;
    dataUsed.onchange = e => {
        let selectedDataType = (e.target as HTMLSelectElement).value;

        if (selectedDataType == "frequency") {
            drawParams.useFrequencyData = true;
            drawParams.useWaveformData = false;
        }
        else {
            drawParams.useFrequencyData = false;
            drawParams.useWaveformData = true;
        }
    };
    dataUsed.selectedIndex = (drawParams.useFrequencyData) ? 0 : 1;
    dataUsed.dispatchEvent(new Event("change"));

    let distortionSlider = document.querySelector('#slider-distortion') as HTMLInputElement;
    distortionSlider.value = `${DEFAULTS.distortion}`;
    distortionSlider.onchange = e => {
        let slider = e.target as HTMLInputElement;
        audio.setDistortion(Number(slider.value));
    };

    let reverbCheckbox = document.querySelector("#cb-reverb") as HTMLInputElement;
    reverbCheckbox.onchange = e => {
        audio.toggleReverb();
    };
    reverbCheckbox.checked = DEFAULTS.hasReverb;

    // Checkboxes
    // bars
    let barsCheckBox = document.querySelector("#cb-bars") as HTMLInputElement;
    barsCheckBox.onchange = e => {
        let checkbox = e.target as HTMLInputElement;
        drawParams.showBars = checkbox.checked;
    };
    barsCheckBox.checked = drawParams.showBars;
    // circles 
    let circleCheckBox = document.querySelector("#cb-circles") as HTMLInputElement;
    circleCheckBox.onchange = e => {
        let checkbox = e.target as HTMLInputElement;
        drawParams.showCircles = checkbox.checked;
    };
    circleCheckBox.checked = drawParams.showCircles;
    // invert 
    let invertCheckBox = document.querySelector("#cb-invert") as HTMLInputElement;
    invertCheckBox.onchange = e => {
        let checkbox = e.target as HTMLInputElement;
        drawParams.showInvert = checkbox.checked;
    };
    invertCheckBox.checked = drawParams.showInvert;

    // 
    for (let i = 1; i <= DEFAULTS.layerColors.length; i++) {
        let colorSelector = document.querySelector(`#color-layer${i}`) as HTMLInputElement;
        colorSelector.value = DEFAULTS.layerColors[i];

        // colorSelector.oninput = e => { canvas.setLayerColor(1, (e.target as HTMLInputElement).value); };
    }

    (document.querySelector("#color-layer1") as HTMLInputElement).oninput = e => { canvas.setLayerColor(2, (e.target as HTMLInputElement).value); };
    (document.querySelector("#color-layer2") as HTMLInputElement).oninput = e => { canvas.setLayerColor(3, (e.target as HTMLInputElement).value); };
    (document.querySelector("#color-layer3") as HTMLInputElement).oninput = e => { canvas.setLayerColor(4, (e.target as HTMLInputElement).value); };
    (document.querySelector("#color-layer4") as HTMLInputElement).oninput = e => { canvas.setLayerColor(1, (e.target as HTMLInputElement).value); };

}; // end setupUI

const loop = () => {
    if (paused)
        return;

    setTimeout(loop, 1000 / 60);

    canvas.draw(drawParams);

    // testing();
};

export { init };