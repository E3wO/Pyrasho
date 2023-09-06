// GameScene.js - Represents the Phaser game scene; Handles gameplay, assets, and updates

import React, { useEffect } from "react";
import Phaser from "phaser";
import MapLoader from "./MapLoader";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("ground", "assets/ground.png");

    console.log("Preloading in GameScene.js");
  }

  create() {
    this.add.image(400, 300, "ground");
    console.log("Creating in GameScene.js");
  }

  update() {
    // Implement game logic here
  }
}

function PhaserGame() {
  useEffect(() => {
    const config = {
      type: Phaser.CANVAS,
      width: 800,
      height: 600,
      scene: GameScene,
    };

    const game = new Phaser.Game(config);

    return () => {
      // Clean up resources if needed
      game.destroy();
      console.log("Destroyed in GameScene.js");
    };
  }, []);

  return (
    <div id="phaser-game-container">
      {/* Your game canvas will be inserted here */}
    </div>
  );
}

export default PhaserGame;
