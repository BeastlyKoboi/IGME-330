/*
    main.js is primarily responsible for hooking up the UI to the rest of the application 
    and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './visualizer.js';

let paused = false;

const drawParams = {
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
    console.log("init called");

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

const setupUI = (canvasElement) => {
    // A - hookup fullscreen button
    const playButton = document.querySelector("#btn-play");
    const fsButton = document.querySelector("#btn-fullscreen");

    // add .onclick event to fullscreen button
    fsButton.onclick = e => {
        console.log("goFullscreen() called");
        utils.goFullscreen(canvasElement);
    };

    // Ad .onclick event to Play/Pause button
    playButton.onclick = e => {
        console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

        // Check if context is in suspended state (autoplay policy)
        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
        }
        console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
        if (e.target.dataset.playing == "no") {
            // if track is currently paused, play it
            audio.playCurrentSound();
            e.target.dataset.playing = "yes"; // Our CSS will set teh text to "Pause"
            // if the track IS playing, pause it
        } else {
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no"; /// our CSS will set the text to "Play"
        }
    };

    // hookup volume slider & label 
    let volumeSlider = document.querySelector("#slider-volume");
    let volumeLabel = document.querySelector("#lbl-volume");

    // add .oninput event to slider
    volumeSlider.oninput = e => {
        // set the gain
        audio.setVolume(e.target.value);
        console.log(e.target.value);
        // update value of label to match value of slider 
        volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
    };

    // set value of label to match initial value of slider
    volumeSlider.value = DEFAULTS.volume;
    console.log(volumeSlider);
    volumeSlider.dispatchEvent(new Event("input"));

    // hookup track <select>
    let trackSelect = document.querySelector("#select-track");
    // add .onchange event to <select>
    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);
        // pause the current track if it is playing
        if (playButton.dataset.playing == "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
    };
    trackSelect.dispatchEvent(new Event("change"));

    // Toggle for Frequency or Waveform data
    let dataUsed = document.querySelector("#select-data-type");
    dataUsed.onchange = e => {
        if (e.target.value == "frequency") {
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

    document.querySelector('#slider-distortion').value = DEFAULTS.distortion;
    document.querySelector('#slider-distortion').onchange = e => {
        let value = Number(e.target.value);
        audio.setDistortion(value);
    };

    let reverbCheckbox = document.querySelector("#cb-reverb");
    reverbCheckbox.onchange = e => {
        audio.toggleReverb();
    };
    reverbCheckbox.checked = DEFAULTS.hasReverb;

    // Checkboxes
    // bars
    let barsCheckBox = document.querySelector("#cb-bars");
    barsCheckBox.onchange = e => {
        drawParams.showBars = e.target.checked;
    };
    barsCheckBox.checked = drawParams.showBars;
    // circles 
    let circleCheckBox = document.querySelector("#cb-circles");
    circleCheckBox.onchange = e => {
        drawParams.showCircles = e.target.checked;
    };
    circleCheckBox.checked = drawParams.showCircles;
    // invert 
    let invertCheckBox = document.querySelector("#cb-invert");
    invertCheckBox.onchange = e => {
        drawParams.showInvert = e.target.checked;
    };
    invertCheckBox.checked = drawParams.showInvert;

    // 
    document.querySelector("#color-layer1").value = DEFAULTS.layerColors[0];
    document.querySelector("#color-layer2").value = DEFAULTS.layerColors[1];
    document.querySelector("#color-layer3").value = DEFAULTS.layerColors[2];
    document.querySelector("#color-layer4").value = DEFAULTS.layerColors[3];

    document.querySelector("#color-layer1").oninput = e => { canvas.setLayerColor(1, e.target.value); };
    document.querySelector("#color-layer2").oninput = e => { canvas.setLayerColor(2, e.target.value); };
    document.querySelector("#color-layer3").oninput = e => { canvas.setLayerColor(3, e.target.value); };
    document.querySelector("#color-layer4").oninput = e => { canvas.setLayerColor(4, e.target.value); };

}; // end setupUI

const loop = () => {
    if (paused)
        return;

    setTimeout(loop, 1000 / 60);

    canvas.draw(drawParams);

    // testing();
};

const testing = () => {
    // 1) create a byte array (values of 0-255) to hold the audio data
    // normally, we do this once when the program starts up, NOT every frame
    let audioData = new Uint8Array(audio.analyserNode.fftSize / 2);

    // 2) populate the array of audio data *by reference* (i.e. by its address)
    // audio.analyserNode.getByteFrequencyData(audioData);
    // for percentages 0.0-1.0 use getFloatFrequencyData
    audio.analyserNode.getByteTimeDomainData(audioData); // waveform data

    // 3) log out the array and the average loudness (amplitude) of all of the frequency bins
    console.log(audioData);

    console.log("-----Audio Stats-----");
    let totalLoudness = audioData.reduce((total, num) => total + num);
    let averageLoudness = totalLoudness / (audio.analyserNode.fftSize / 2);
    let minLoudness = Math.min(...audioData); // ooh - the ES6 spread operator is handy!
    let maxLoudness = Math.max(...audioData); // ditto!
    // Now look at loudness in a specific bin
    // 22050 kHz divided by 128 bins = 172.23 kHz per bin
    // the 12th element in array represents loudness at 2.067 kHz
    let loudnessAt2K = audioData[11];
    console.log(`averageLoudness = ${averageLoudness}`);
    console.log(`minLoudness = ${minLoudness}`);
    console.log(`maxLoudness = ${maxLoudness}`);
    console.log(`loudnessAt2K = ${loudnessAt2K}`);
    console.log("---------------------");
};

export { init };