import Visualization from './Visualization.js';
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.module.js';

export default class Torus extends Visualization {
    constructor() {
        super(...arguments);

        this.rootElement = document.createElement('canvas');
        this._createScene();
    }

    _createScene() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        const geometry = new THREE.TorusKnotBufferGeometry();
        const material = new THREE.MeshNormalMaterial();
        const shape = new THREE.Mesh( geometry, material );
        scene.add( shape );

        camera.position.z = 5;

        // HODL onto these for later
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.shape = shape;

        this.rootElement = renderer.domElement;
    }

    getRootElement() {
        return this.rootElement;
    }

    tick(frequencyData) {
        const { shape, renderer, scene, camera } = this;

        let sum = 0;
        const samples = 2;
        // compute average of all frequency data
        for(let i = 0; i < frequencyData.length; i += samples) {
            sum += frequencyData[i];
        }
        const avg = sum / (frequencyData.length / samples);

        shape.scale.x = shape.scale.y = shape.scale.z = avg / 64;

        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}