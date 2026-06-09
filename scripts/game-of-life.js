import * as THREE from 'three';
import Engine from './engine/engine.js';

export default class GameOfLife {
  constructor(width, height, depth) {
    this.engine = new Engine(width, height, depth);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(-0.5, 0.2, -1);
    this.engine.scene.add(this.directionalLight);

    this.engine.cameraController.setCenter(width / 2, height / 2, depth / 2);
    this.engine.cameraController.setRadius(Math.max(width, height, depth) * 2);
    this.engine.cameraController.setPhi(Math.PI / 4);
    this.engine.cameraController.setTheta(Math.PI * 5 / 4);
    this.engine.cameraController.updateCamera();

    this.engine.blocks.randomize(0.2);

    // 生きている隣接セルの数による「誕生」と「生存」のルール
    this.birthRule = [5];
    this.survivalRule = [5, 7, 8];
  }

  update() {
    const previousBlockIds = this.engine.blocks.blockIds.clone();
    const width = previousBlockIds.getWidth();
    const height = previousBlockIds.getHeight();
    const depth = previousBlockIds.getDepth();
    for(let x = 0; x < width; x++) {
      for(let y = 0; y < height; y++) {
        for(let z = 0; z < depth; z++) {
          const cell = previousBlockIds.getCell(x, y, z);
          const numOfNeighborLivingCells = this.countNeighborLivingCells(previousBlockIds, x, y, z);

          let setId = 0;
          switch(cell) {
            case 0:
              if(this.birthRule.includes(numOfNeighborLivingCells)) setId = 1; // 誕生
              break;
            case 1:
              if(this.survivalRule.includes(numOfNeighborLivingCells)) setId = 1; // 生存
              break;
            default:
              console.error(`予期せぬセルの値です(id: ${cell}, x: ${x}, y: ${y}, z: ${z})`);
          }
          this.engine.blocks.setBlock(setId, x, y, z);
        }
      }
    }
  }

  countNeighborLivingCells(blockIds, x, y, z) {
    let numOfLivingCells = 0;
    for(let dx = -1; dx <= 1; dx++) {
      for(let dy = -1; dy <= 1; dy++) {
        for(let dz = -1; dz <= 1; dz++) {
          if(dx === 0 && dy === 0 & dz === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          const nz = z + dz;
          if(!blockIds.isInGrid(nx, ny, nz)) continue;

          const blockId = blockIds.getCell(nx, ny, nz);
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