// Game.js - Manages game logic and screen transitions; Acts as a mediator between scenes & what to render

import React from "react";
import MainMenu from "./scenes/MainMenu";
import Settings from "./scenes/Settings";
import GameScene from "./scenes/GameScene";
import { width, height } from "./config/gameConfig";
import Phaser from "phaser";

const Game = () => {
  return (
    <div className="game-container" id="phaser-container"></div>
  );
};

const gameConfig = {
  type: Phaser.CANVAS,
  width: width,
  height: height,
  parent: "phaser-container",
  scene: [MainMenu, GameScene, Settings],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(gameConfig);

// Start with the desired scene
game.scene.start("MainMenu");

export default Game;
