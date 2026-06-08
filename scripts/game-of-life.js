import * as THREE from 'three';
import Engine from './engine/engine.js';

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

    this.engine.blocks.randomize(0.2);
  }

  countNeighborLivingCells(x, y, z) {
    let numOfLivingCells = 0;
    for(let dx = -1; dx <= 1; dx++) {
      for(let dy = -1; dy <= 1; dy++) {
        for(let dz = -1; dz <= 1; dz++) {
          if(dx === 0 && dy === 0 & dz === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          const nz = z + dz;
          if(!this.engine.blocks.isInField(nx, ny, nz)) continue;

          const blockId = this.engine.blocks.getBlockId(nx, ny, nz);
          if(blockId === 1) numOfLivingCells++; // id:0を「死」,id:1を「生」とする
        }
      }
    }
    return numOfLivingCells;
  }

  render() {
    this.engine.render();
  }
}