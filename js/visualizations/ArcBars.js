import Visualization from './Visualization.js';

export default class ArcBars {
    constructor() {
        this.root = document.createElement('svg');
        this.root.setAttribute("viewBox", "-1,-1,2,2");
        this.root.style.transform = "rotate(-0.50turn)"; // Start at left side of circle

        this.barCount = 360;
        //this.barWidth = 100 / this.barCount
        //this._setupBars();
    }
    getRootElement() {
        return this.root;
    }

    _getCoordinatesForPercent(percent) {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
      }

    tick(frequencyData) {
        
        while (this.root.firstChild) {
            this.root.removeChild(this.root.lastChild);
        }

        let p, l = frequencyData.length;

        for(let i=0; i < this.barCount; i++){
            //p = (frequencyData[Math.floor(l / this.barCount * i)] / 255);
            p = .5;

            let coord = this._getCoordinatesForPercent(p);
            let endX = coord[0];
            let endY = coord[1];

            let largeArcFlag = p > .5 ? 1 : 0;

            let pathData = [
                `M 1 0`,
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                `L 0 0 `,
            ].join (' ');

            //console.log(pathData);

            // create a <path> and append it to the <svg> element
            let pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathEl.setAttribute('d', pathData);
            pathEl.setAttribute('fill', 'red');
            //pathEl.setAttribute('fill', 'hsla(' + (360 * (1.8 - (p / 100))) + ',100%,50%,1)');
            this.root.appendChild(pathEl);
        }
    }

    /*
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
    */
}