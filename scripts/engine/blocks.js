import * as THREE from 'three';

export default class Blocks {
  constructor(scene, width, height, depth) {
    this.blockSize = 1;
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.depth = depth;
    // idを格納する3次元配列
    this.blockIds = new Array(this.width).fill(null).map(() => new Array(this.height).fill(null).map(() => new Array(this.depth).fill(0)));
    // meshを格納する3次元配列
    this.blockMeshes = new Array(this.width).fill(null).map(() => new Array(this.height).fill(null).map(() => new Array(this.depth).fill(null)));

    this.blockTypes = {
      1: {
        geometry: new THREE.BoxGeometry(this.blockSize, this.blockSize, this.blockSize),
        material: new THREE.MeshStandardMaterial({color: 0xffffff})
      }
    }
  }

  cloneBlockIds() {
    return structuredClone(this.blockIds);
  }

  randomize(rate) {
    for(let x = 0; x < this.width; x++) {
      for(let y = 0; y < this.height; y++) {
        for(let z = 0; z < this.depth; z++) {
          if(Math.random() < rate) this.setBlock(1, x, y, z);
        }
      }
    }
  }

  isInField(x, y, z) {
    return (
      0 <= x && x < this.width &&
      0 <= y && y < this.height &&
      0 <= z && z < this.depth
    );
  }

  setBlock(id, x, y, z) {
    if(!this.isInField(x, y, z)) {
      console.error(`領域外にブロックを設置できません(x: ${x}, y: ${y}, z: ${z})`);
      return;
    }

    if(id === this.getBlockId(x, y, z)) return;

    const oldMesh = this.getBlockMesh(x, y, z);
    if(oldMesh) {
      oldMesh.removeFromParent();
      this.#setBlockMesh(null, x, y, z);
    }

    this.#setBlockId(id, x, y, z);

    if(id === 0) return; // id:0は空気

    const blockType = this.blockTypes[id];
    const mesh = new THREE.Mesh(blockType.geometry, blockType.material);
    mesh.position.set(
      this.blockSize * x,
      this.blockSize * y,
      this.blockSize * z
    );
    this.#setBlockMesh(mesh, x, y, z);

    this.scene.add(mesh);
  }

  #setBlockId(id, x, y, z) {
    if(!this.isInField(x, y, z)) {
      console.error(`領域外にブロックidをセットできません(x: ${x}, y: ${y}, z: ${z})`);
      return;
    }
    this.blockIds[x][y][z] = id;
  }

  #setBlockMesh(mesh, x, y, z) {
    if(!this.isInField(x, y, z)) {
      console.error(`領域外にブロックメッシュをセットできません(x: ${x}, y: ${y}, z: ${z})`);
      return;
    }
    this.blockMeshes[x][y][z] = mesh;
  }

  getBlockId(x, y, z) {
    if(!this.isInField(x, y, z)) {
      console.error(`領域外のブロックidを取得できません(x: ${x}, y: ${y}, z: ${z})`);
      return;
    }
    return this.blockIds[x][y][z];
  }

  getBlockMesh(x, y, z) {
    if(!this.isInField(x, y, z)) {
      console.error(`領域外のブロックメッシュを取得できません(x: ${x}, y: ${y}, z: ${z})`);
      return;
    }
    return this.blockMeshes[x][y][z];
  }
}