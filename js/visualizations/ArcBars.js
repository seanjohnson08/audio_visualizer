import Visualization from './Visualization.js';

export default class ArcBars extends Visualization {
    constructor() {
        super(...arguments);
        this.root = document.createElement('canvas');
        this.ctx = this.root.getContext('2d');
        this.root.style.transform = 'rotate(-0.5turn)'; // Start at left side of circle

        this.barCount = 100;

        this._setupBars();
    }
    getRootElement() {
        return this.root;
    }

    tick(frequencyData) {

        let p, l = frequencyData.length;
        let offsetP;
        if (this.root.height != this.root.clientHeight) {
            this.root.height = this.root.clientHeight;
            this.root.width = this.root.clientWidth;
        }
        this.ctx.clearRect(0, 0, this.root.width, this.root.height);

        for(let i=this.barCount-1; i >= 0; i--){
            p = (frequencyData[Math.floor(l / this.barCount * i)] / 255);
            offsetP = p/4;

            if(p > this.bars[i].p){
                p = this.bars[i].p + ((p - this.bars[i].p) * .75)
                console.log(p);
            } else if (p < this.bars[i].p){
                p = this.bars[i].p - .01;
                p = p < 0 ? 0 : p;
            }

            this.bars[i].p = p;

            this.ctx.fillStyle = `hsla(${360 * (1.8 - (i / this.barCount))}, 100%, 50%, 1)`;
            this.ctx.beginPath();
            this.ctx.moveTo(this.root.width / 2, this.root.height / 2);
            this.ctx.arc(this.root.width / 2, this.root.height / 2, ((this.root.height/2) / this.barCount)*i, 0, Math.PI * 2 * p, false);
            this.ctx.lineTo(this.root.width / 2, this.root.height / 2);
            this.ctx.fill();
        }
    }

    _setupBars() {
        this.bars = [];

        for (let i = 0; i < this.barCount; i++) {
            let bar = {p: 0};
            this.bars.push(bar);
        }

    }
}