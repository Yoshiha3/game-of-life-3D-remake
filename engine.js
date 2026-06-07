import * as THREE from 'three';

export default class Engine {
  constructor(width, height, depth) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.cameraController = new CameraController(this.screenWidth, this.screenHeight);

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.screenWidth, this.screenHeight);
    document.body.appendChild( this.renderer.domElement );

    this.blocks = new Blocks(this.scene, width, height, depth);
  }

  render() {
    this.renderer.render(this.scene, this.cameraController.getCamera());
  }
}

class Blocks {
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

    if(id === this.blockIds[x][y][z]) return;

    const oldMesh = this.blockMeshes[x][y][z];
    if(oldMesh) {
      oldMesh.removeFromParent();
      this.blockMeshes[x][y][z] = null;
    }

    this.blockIds[x][y][z] = id;

    if(id === 0) return; // id:0は空気

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
}

class CameraController {
  constructor(screenWidth, screenHeight) {
    this.centerPosition = new THREE.Vector3(0, 0, 0);
    this.cameraPositionSpherical = new THREE.Spherical(8, 0, 0);
    this.camera = new THREE.PerspectiveCamera( 70, screenWidth / screenHeight, 0.01, 1000 );

    this.updateCamera();
  }

  setPhi(phi) {
    this.cameraPositionSpherical.phi = phi;
  }

  setTheta(theta) {
    this.cameraPositionSpherical.theta = theta;
  }

  setCenter(x, y, z) {
    this.centerPosition.set(x, y, z);
  }

  updateCamera() {
    const camera = this.getCamera();
    camera.position.setFromSpherical(this.cameraPositionSpherical);
    camera.position.add(this.centerPosition);
    camera.lookAt(this.centerPosition);
  }

  getCamera() {
    return this.camera;
  }
}