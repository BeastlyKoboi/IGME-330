// 1 - our WebAudio context, **we will export and make this public at the bottom of the file**
let audioCtx: AudioContext;
// **These are "private" properties - these will NOT be visible outside of this module (i.e. file)**
// 2 - WebAudio nodes that are part of our WebAudio audio routing graph
let element: HTMLAudioElement,
    sourceNode: MediaElementAudioSourceNode,
    analyserNode: AnalyserNode,
    distortionFilter: WaveShaperNode,
    reverbNode: ConvolverNode,
    gainNode: GainNode;

// 3 - here we are faking an enumeration
const DEFAULTS = Object.seal({
    gain: .5,
    numSamples: 256,
    hasReverb: true,
});
let hasReverb: boolean;

// **Next are "public" methods - we are going to export all of these at the bottom of this file**
const setupWebaudio = async (filePath: string, impulseResponseURL: string) => {
    // The || is because WebAudio has not been standardized across browsers yet
    const AudioContext = window.AudioContext;
    audioCtx = new AudioContext();

    // this creates an <audio> element
    element = new Audio();

    // have it point at a sound file
    loadSoundFile(filePath);

    // create an a source node that points at the <audio> element
    sourceNode = audioCtx.createMediaElementSource(element);

    // create an analyser node
    // note the UK spelling of "Analyser"
    analyserNode = audioCtx.createAnalyser();

    /*
    // 
    We will request DEFAULTS.numSamples number of samples or "bins" spaced equally 
    across the sound spectrum.
    
    If DEFAULTS.numSamples (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz, 
    the third is 344Hz, and so on. Each bin contains a number between 0-255 representing 
    the amplitude of that frequency.
    */

    // fft stands for Fast Fourier Transform
    analyserNode.fftSize = DEFAULTS.numSamples;

    // Create distortion node
    distortionFilter = audioCtx.createWaveShaper();

    // create a gain (volume) node
    gainNode = audioCtx.createGain();
    gainNode.gain.value = DEFAULTS.gain;

    //
    reverbNode = await createReverb(impulseResponseURL);

    hasReverb = DEFAULTS.hasReverb;

    // connect the nodes - we now have an audio graph
    if (hasReverb) {
        sourceNode.connect(reverbNode);
        reverbNode.connect(distortionFilter);
        distortionFilter.connect(analyserNode);
        analyserNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);
    }
    else {
        sourceNode.connect(distortionFilter);
        distortionFilter.connect(analyserNode);
        analyserNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);
    }
};


const loadSoundFile = (filepath: string) => {
    element.src = filepath;
};

const playCurrentSound = () => {
    element.play();
};

const pauseCurrentSound = () => {
    element.pause();
};

const setVolume = (value: number) => {
    gainNode.gain.value = value;
};

const setDistortion = (value: number) => {
    if (value) {
        distortionFilter.curve = makeDistortionCurve(value);
    }
    else
        distortionFilter.curve = null;
};

const toggleReverb = () => {
    if (hasReverb) {
        sourceNode.disconnect(reverbNode);
        reverbNode.disconnect(distortionFilter);
        sourceNode.connect(distortionFilter);
        hasReverb = false;
    }
    else {
        sourceNode.disconnect(distortionFilter);
        sourceNode.connect(reverbNode);
        reverbNode.connect(distortionFilter);
        hasReverb = true;
    }
}

const makeDistortionCurve = (amount = 20) => {
    let n_samples = 256, curve = new Float32Array(n_samples);
    for (let i = 0; i < n_samples; ++i) {
        let x = i * 2 / n_samples - 1;
        curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
        //curve[i] = x; // does not modify sound
        //curve[i] = 0; // silence
        //curve[i] = x * amount; // classic distortion
        //curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
        // curve[i] =(Math.PI + 100 * x/2) / (Math.PI + 100 * Math.abs(x)); // nice distortion
        //curve[i] = -(Math.PI + 100 * x/2) / (Math.PI + 50 * Math.abs(x));
        //			
        // curve[i] = Math.random() * 2 - 1;	// static!	
        //curve[i] = x * 5 + Math.random() * 2 - 1; // adds a less intrusive static to the audio
        // curve[i] = x * Math.sin(x) * amount/5; // sounds like a cross between Donald Duck and Cartman from South Park

        // curve[i] = (3 + 20) * x * 57 * (Math.PI / 180) / (Math.PI + 20 * Math.abs(x)) // from the stack overflow post
    }
    return curve;
}

const createReverb = async (url: string) => {
    let convolver = audioCtx.createConvolver();

    // load impulse response from file
    let response = await fetch(url);
    let arraybuffer = await response.arrayBuffer();
    convolver.buffer = await audioCtx.decodeAudioData(arraybuffer);

    return convolver;
};

export { audioCtx, setupWebaudio, playCurrentSound, pauseCurrentSound, loadSoundFile, setVolume, setDistortion, toggleReverb, analyserNode, DEFAULTS }

