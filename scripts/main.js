import * as THREE from 'three';
import GameOfLife from './game-of-life.js';

const gameOfLife = new GameOfLife(10, 10, 10);

gameOfLife.engine.blocks.randomize(0.2);
gameOfLife.startUpdate();
gameOfLife.startAnimation();