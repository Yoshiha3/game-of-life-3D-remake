import * as THREE from 'three';
import GameOfLife from './game-of-life.js';

const gameOfLife = new GameOfLife(10, 10, 10);

gameOfLife.engine.blocks.setBlock(1, 0, 0, 0);

gameOfLife.startUpdate();
gameOfLife.startAnimation();