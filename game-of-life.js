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

    this.engine.cameraController.setCenter(this.width / 2, this.height / 2, this.depth / 2);
    this.engine.cameraController.setRadius(Math.max(this.width, this.height, this.depth) * 2);
    this.engine.cameraController.setPhi(Math.PI / 4);
    this.engine.cameraController.setTheta(Math.PI * 5 / 4);
    this.engine.cameraController.updateCamera();
  }

  render() {
    this.engine.render();
  }
}