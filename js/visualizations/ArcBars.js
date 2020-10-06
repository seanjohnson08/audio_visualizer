import Visualization from './Visualization.js';

export default class ArcBars {
    constructor() {
        this.root = document.createElement('canvas');
        this.ctx = this.root.getContext("2d");
        this.root.style.transform = "rotate(-0.5turn)"; // Start at left side of circle

        this.barCount = 10;
        //this.barWidth = 100 / this.barCount
        this._setupBars();
    }
    getRootElement() {
        return this.root;
    }

    tick(frequencyData) {

        let p, l = frequencyData.length;
        this.ctx.clearRect(0, 0, this.root.width, this.root.height);

        for(let i=this.barCount; i > 0; i--){
            p = (frequencyData[Math.floor(l / this.barCount * i)] / 255);

            //console.log(i / (this.root.height / 2));

            this.ctx.fillStyle = `hsla(${360 * (1.8 - (i / this.barCount))}, 100%, 50%, 1)`;
            this.ctx.beginPath();
            this.ctx.moveTo(this.root.width / 2, this.root.height / 2);
            // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
            this.ctx.arc(this.root.width / 2, this.root.height / 2, ((this.root.height/2) / this.barCount)*i, 0, Math.PI * 2 * p, false);
            this.ctx.lineTo(this.root.width / 2, this.root.height / 2);
            this.ctx.fill();
        }
    }

    
    _setupBars() {
        this.bars = [];

        for (let i = 0; i < this.barCount; i++) {
            let bar = {angle: 0};
            this.bars.push(bar);
        }

        /*
        //make divs
        for (let i = 0; i < this.barCount; i++) {
            let div = document.createElement('div');
            div.style.left = (i * this.barWidth) + '%';
            div.style.width = (this.barWidth) + "%"
            div.style.backgroundColor = 'hsla(' + (360 * i / this.barCount) + ',100%,50%,1)';
            this.root.appendChild(div);
        }
        */
    }
}