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
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

const engine = new Engine();

engine.camera.position.set(1, 0.5, 1);
engine.camera.lookAt(0, 0, 0);

const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh( geometry, material );
engine.scene.add(mesh);



engine.render();