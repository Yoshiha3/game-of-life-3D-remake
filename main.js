import * as THREE from 'three';

class Engine {
  constructor() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera( 70, this.screenWidth / this.screenHeight, 0.01, 10 );

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.screenWidth, this.screenHeight);
    document.body.appendChild( this.renderer.domElement );

    this.blocks = new Blocks(this.scene, 10, 10, 10);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

class Blocks {
  constructor(scene, width, height, depth) {
    this.blockSize = 1;
    this.scene = scene;
    this.width = width;
    this.height = height;
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

  setBlock(id, x, y, z) {
    if(id === this.getBlockId(x, y, z)) return;
    this.blockIds[x][y][z] = id;

    const blockType = this.blockTypes[id];
    const mesh = new THREE.Mesh(blockType.geometry, blockType.material);
    mesh.position.set(
      this.blockSize * x,
      this.blockSize * y,
      this.blockSize * z
    );
    this.blockMeshes[x][y][z] = mesh;

    this.scene.add(mesh);
  }

  getBlockId(x, y, z) {
    return this.blockIds[x][y][z];
  }
}

const engine = new Engine();

engine.camera.position.set(2, 2, 2);
engine.camera.lookAt(0, 0, 0);

engine.blocks.setBlock(1, 0, 0, 0);

// 仮でライトを追加
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 0.5, 0.1)
engine.scene.add(directionalLight);


engine.render();