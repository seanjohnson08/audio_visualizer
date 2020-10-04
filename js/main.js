const audioContext = window.AudioContext || window.mozAudioContext || window.webkitAudioContext;

import RainbowBars from './visualizations/RainbowBars.js';

requestAnimationFrame = window.requestAnimationFrame || window.mozAnimationFrame || window.webkitAnimationFrame;

const visualizer = new RainbowBars();
const root = visualizer.getRootElement();
root.id = 'visualization';
document.getElementById('visualization').replaceWith(root);

// TODO remove globals
let _analyzer;
let _frequencyData;

function _tick() {
    visualizer.tick(_frequencyData);
    _analyzer.getByteFrequencyData(_frequencyData);

    requestAnimationFrame(_tick);
}
let music = document.getElementById('music');
music.onplay = function () {

    let ctx = new audioContext;
    let source = ctx.createMediaElementSource(music);
    _analyzer = ctx.createAnalyser();

    source.connect(_analyzer);
    _analyzer.connect(ctx.destination);

    _frequencyData = new Uint8Array(_analyzer.frequencyBinCount / 2);

    _tick();
};