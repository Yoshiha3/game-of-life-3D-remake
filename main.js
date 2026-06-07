import * as THREE from 'three';
import Engine from './engine.js';

const engine = new Engine();

engine.camera.position.set(2, 2, 2);
engine.camera.lookAt(0, 0, 0);

engine.blocks.setBlock(1, 0, 0, 0);

// 仮でライトを追加
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 0.5, 0.1)
engine.scene.add(directionalLight);


engine.render();