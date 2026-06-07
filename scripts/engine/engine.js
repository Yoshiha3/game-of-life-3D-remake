import * as THREE from 'three';
import Blocks from './blocks.js';
import CameraController from './camera.js';

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