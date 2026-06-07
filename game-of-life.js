import * as THREE from 'three';
import Engine from './engine.js';

export default class GameOfLife {
  constructor() {
    this.engine = new Engine();

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(-0.5, 0.2, -1);
    this.engine.scene.add(this.directionalLight);

    this.engine.camera.position.set(-2, 2, -2);
    this.engine.camera.lookAt(0, 0, 0);
  }

  render() {
    this.engine.render();
  }
}