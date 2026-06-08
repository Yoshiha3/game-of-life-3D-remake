import * as THREE from 'three';

export default class Blocks {
  #blockSize = 1;
  #scene;
  #blockIds;
  #blockMeshes;
  #blockTypes;
  constructor(scene, width, height, depth) {
    this.#scene = scene;
    // idを格納する3次元配列
    this.#blockIds = new Grid3D("ブロックID", width, height, depth);
    // meshを格納する3次元配列
    this.#blockMeshes = new Grid3D("ブロックメッシュ", width, height, depth, null);

    this.#blockTypes = {
      1: {
        geometry: new THREE.BoxGeometry(this.#blockSize, this.#blockSize, this.#blockSize),
        material: new THREE.MeshStandardMaterial({color: 0xffffff})
      }
    }
  }

  getWidth() {
    return this.#blockIds.getWidth();
  }

  getHeight() {
    return this.#blockIds.getHeight();
  }

  getDepth() {
    return this.#blockIds.getDepth();
  }

  randomize(rate) {
    for(let x = 0; x < this.getWidth(); x++) {
      for(let y = 0; y < this.getHeight(); y++) {
        for(let z = 0; z < this.getDepth(); z++) {
          if(Math.random() < rate) this.setBlock(1, x, y, z);
        }
      }
    }
  }

  isInField(x, y, z) {
    return this.#blockIds.isInGrid(x, y, z);
  }

  setBlock(id, x, y, z) {
    if(!this.isInField(x, y, z)) {
      console.error(`領域外にブロックを設置できません(x: ${x}, y: ${y}, z: ${z})`);
      return;
    }

    if(id === this.#blockIds.getCell(x, y, z)) return;

    const oldMesh = this.#blockMeshes.getCell(x, y, z);
    if(oldMesh) {
      oldMesh.removeFromParent();
      this.#blockMeshes.setCell(null, x, y, z);
    }

    this.#blockIds.setCell(id, x, y, z);

    if(id === 0) return; // id:0は空気

    const blockType = this.#blockTypes[id];
    const mesh = new THREE.Mesh(blockType.geometry, blockType.material);
    mesh.position.set(
      this.#blockSize * x,
      this.#blockSize * y,
      this.#blockSize * z
    );
    this.#blockMeshes.setCell(mesh, x, y, z);

    this.#scene.add(mesh);
  }
}

class Grid3D {
  #dataName;
  #width;
  #height;
  #depth;
  #grid;
  constructor(dataName, width, height, depth, defaultValue = 0) {
    this.#dataName = dataName;
    this.#width = width;
    this.#height = height;
    this.#depth = depth;
    this.#grid = Array.from({length: this.#width}, () =>
      Array.from({length: this.#height}, () => 
        Array.from({length: this.#depth}, () => defaultValue)
      )
    );
  }

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
  }

  getDepth() {
    return this.#depth;
  }

  isInGrid(x, y, z) {
    return (
      0 <= x && x < this.#width &&
      0 <= y && y < this.#height &&
      0 <= z && z < this.#depth
    );
  }

  setCell(cell, x, y, z) {
    if(!this.isInGrid(x, y, z)) {
      console.error(`領域外に${this.#dataName}をセットできません(x: ${x}, y: ${y}, z: ${z})`);
      return;
    }
    this.#grid[x][y][z] = cell;
  }

  getCell(x, y, z) {
    if(!this.isInGrid(x, y, z)) {
      console.error(`領域外の${this.#dataName}を取得できません(x: ${x}, y: ${y}, z: ${z})`);
      return;
    }
    return this.#grid[x][y][z];
  }
}