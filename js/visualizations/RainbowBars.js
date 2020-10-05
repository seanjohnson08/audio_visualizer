
import Visualization from './Visualization.js';

export default class RainbowBars extends Visualization {
    constructor() {
        super(...arguments);
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
            const div = document.createElement('div');
            Object.assign(div.style, {
                position: 'absolute',
                bottom: 0,
                left: `${i * this.barWidth}%`,
                width: `${this.barWidth}%`,
                backgroundColor: `hsla(${360 * i / this.barCount}, 100%, 50%, 1)`,
            })

            this.root.appendChild(div);
        }
    }
}