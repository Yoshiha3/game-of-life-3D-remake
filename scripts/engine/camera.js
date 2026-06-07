import * as THREE from 'three';

export default class CameraController {
  constructor(screenWidth, screenHeight) {
    this.centerPosition = new THREE.Vector3(0, 0, 0);
    this.cameraPositionSpherical = new THREE.Spherical(8, 0, 0);
    this.camera = new THREE.PerspectiveCamera( 70, screenWidth / screenHeight, 0.01, 1000 );

    this.updateCamera();
  }

  setRadius(radius) {
    this.cameraPositionSpherical.radius = radius;
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