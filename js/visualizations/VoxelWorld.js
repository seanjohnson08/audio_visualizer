import Visualization from './Visualization.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.js';
import 'https://threejs.org/examples/js/controls/OrbitControls.js';

export default class Torus extends Visualization {
    constructor() {
        super(...arguments);
        this.numCubes = 50;
        this.clock = 0;
        this.cubes = [];

        this.rootElement = document.createElement('canvas');
        this._createScene();
    }

    _createScene() {
        this._loadTextures();

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.controls = new THREE.OrbitControls(camera, renderer.domElement);

        this.geometry = new THREE.CubeGeometry();
        this.materials = [
            this.textures.dirt_side,
            this.textures.dirt_side,
            this.textures.dirt_top,
            this.textures.dirt_bottom,
            this.textures.dirt_side,
            this.textures.dirt_side,
        ].map(map => new THREE.MeshBasicMaterial({ map }));

        camera.position.z = 20;

        // HODL onto these for later
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        this.rootElement = renderer.domElement;
    }

    _makeRowOfCubes() {
        const cubes = [];
        for (let i = this.numCubes / -2; i <= this.numCubes / 2; i++) {
            const cube = new THREE.Mesh(
                this.geometry, this.materials
            );
            cube.position.x = i;
            cubes.push(cube);
            this.scene.add(cube);
        }
        return cubes;
    }

    _loadTextures() {
        const loader = new THREE.TextureLoader();
        this.textures = {
            dirt_top: loader.load('./sprites/mc_dirt_top.jpg'),
            dirt_side: loader.load('./sprites/mc_dirt_side.png'),
            dirt_bottom: loader.load('./sprites/mc_dirt_bottom.jpg')
        };
    }

    _applyFrequencyToCubeRow(frequencyData, cubes, resetZ = false) {
        const spectRatio = frequencyData.length / this.numCubes;
        cubes.forEach((cube, i) => {
            cube.position.y = frequencyData[Math.round(i * spectRatio)] / 255 * 30 - 15;
            if (resetZ) {
                cube.position.z = 10;
            }
        });
    }

    getRootElement() {
        return this.rootElement;
    }

    tick(frequencyData) {
        const { renderer, scene, camera } = this;

        if (this.clock % 20 === 0) {
            if (this.cubes.length > 50) {
                const row = this.cubes.shift();
                this._applyFrequencyToCubeRow(frequencyData, row, true);
                this.cubes.push(row);
            } else {
                const row = this._makeRowOfCubes();
                this._applyFrequencyToCubeRow(frequencyData, row, true);
                this.cubes.push(row);
            }
        }

        this._applyFrequencyToCubeRow(frequencyData, this.cubes[this.cubes.length - 1]);

        for (let i = 0; i < this.cubes.length; i++) {
            for (let j = 0; j < this.cubes[i].length; j++) {
                this.cubes[i][j].position.z -= 0.05;
            }
        }

        // shape.rotation.x += 0.01;
        // shape.rotation.y += 0.01;
        this.controls.update();
        renderer.render(scene, camera);

        this.clock++;
    }
}