import * as THREE from 'three';
import GameOfLife from './game-of-life.js';

const width = 20;
const height = 20;
const depth = 20;
const gameOfLife = new GameOfLife(width, height, depth);

const cubeSize = 6;
gameOfLife.createCube(
  Math.floor(width / 2) - Math.floor(cubeSize / 2),
  Math.floor(height / 2) - Math.floor(cubeSize / 2),
  Math.floor(depth / 2) - Math.floor(cubeSize / 2),
  cubeSize
)
gameOfLife.startUpdate();
gameOfLife.startAnimation();