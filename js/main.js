import RainbowBars from './visualizations/RainbowBars.js';
import Torus from './visualizations/Torus.js';
import VoxelWorld from './visualizations/VoxelWorld.js';

const visualizations = {
    VoxelWorld,
    Torus,
    RainbowBars,
};

const requestAnimationFrame = window.requestAnimationFrame || window.mozAnimationFrame || window.webkitAnimationFrame;

class Main {
    constructor(audioElement) {
        audioElement.addEventListener('play', () => this._onPlay());
        this.createVizSelection();
        this.audioElement = audioElement;
        this._boundTick = () => this._tick();
    }

    createVizSelection() {
        const select = document.getElementById('viz');
        Object.keys(visualizations).forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.innerHTML = value;
            select.appendChild(option);
        })
        select.addEventListener('change', () => {
            this.setVisualization(visualizations[select.value])
        });
    }
    setVisualization(Visualization) {
        const visualization = new Visualization();
        const root = visualization.getRootElement();
        root.id = 'visualization';
        document.getElementById('visualization').replaceWith(root);
        this.visualization = visualization;
    }
    _onPlay() {
        if (this.connected) {
            return;
        }
        this.connected = true;

        const ctx = new (window.AudioContext || window.mozAudioContext || window.webkitAudioContext);
        const source = ctx.createMediaElementSource(this.audioElement);
        const analyzer = ctx.createAnalyser();

        source.connect(analyzer);
        analyzer.connect(ctx.destination);

        this._analyzer = analyzer;
        this._frequencyData = new Uint8Array(analyzer.frequencyBinCount / 2);

        this._boundTick();
    }
    _tick() {
        this.visualization.tick(this._frequencyData);
        this._analyzer.getByteFrequencyData(this._frequencyData);

        requestAnimationFrame(this._boundTick);
    }
}

const main = new Main(document.getElementById('music'));
main.setVisualization(VoxelWorld);