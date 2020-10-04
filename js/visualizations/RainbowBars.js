
import Visualization from './Visualization.js';

export default class RainbowBars {
    constructor() {
        this.root = document.createElement('div');
        this.barCount = 1024 / 4;
        this.barWidth = 100 / this.barCount

        this._setupBars();
    }
    getRootElement() {
        return this.root;
    }
    tick(frequencyData) {
        let p, l = frequencyData.length;
        let bars = document.querySelectorAll("#visualization div");
        for (let i = 0; i < this.barCount; i++) {
            p = (frequencyData[Math.floor(l / this.barCount * i)] / 2.55);
            bars[i].style.height = p + '%';
            bars[i].style.backgroundColor = 'hsla(' + (360 * (1.8 - (p / 100))) + ',100%,50%,1)';
        }
    }

    _setupBars() {
        //make divs
        for (let i = 0; i < this.barCount; i++) {
            let div = document.createElement('div');
            div.style.left = (i * this.barWidth) + '%';
            div.style.width = (this.barWidth) + "%"
            div.style.backgroundColor = 'hsla(' + (360 * i / this.barCount) + ',100%,50%,1)';
            this.root.appendChild(div);
        }
    }
}