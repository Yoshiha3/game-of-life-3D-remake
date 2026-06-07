import * as THREE from 'three';
import GameOfLife from './game-of-life.js';

const gameOfLife = new GameOfLife();

gameOfLife.engine.blocks.setBlock(1, 0, 0, 0);

gameOfLife.render();