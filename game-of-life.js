import * as THREE from 'three';
import Engine from './engine.js';

export default class GameOfLife {
  constructor(width, height, depth) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.engine = new Engine(this.width, this.height, this.depth);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(-0.5, 0.2, -1);
    this.engine.scene.add(this.directionalLight);

    this.engine.cameraController.setPhi(Math.PI / 4);
    this.engine.cameraController.setTheta(Math.PI * 5 / 4);
    this.engine.cameraController.updateCamera();

    this.engine.blocks.randomize(0.2);
  }

  render() {
    this.engine.render();
  }
}