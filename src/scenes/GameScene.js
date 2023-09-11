// GameScene.js - Represents the Phaser game scene; Handles gameplay, assets, and updates

import React, { useEffect } from "react";
import Phaser from "phaser";
import { mapToLoad } from "./MapLoader";
import PlayerCharacter from "../components/gameplay/PlayerCharacter";
import { width, height, multiplier } from "../config/gameConfig"; // Screen width, height, and multiplier

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    const mapPath = mapToLoad();
    this.load.image("ground", mapPath);
    this.load.image("player", "assets/player.png");
    this.load.image("wall", "assets/wall.png");

    console.log("Preloading in GameScene.js");
  }

  create() {
    this.physics.world.setBounds(0, 0, width, height); // Set collision to edges of the screen
    this.ground = this.add.image(width / 2, height / 2, "ground"); // Adds ground texture and makes it centered
    this.ground.setScale(multiplier)

    this.wallGroup = this.physics.add.staticGroup();

    const walls = width / (32 * multiplier);
    for (let i = 0; i < walls; i++) {
      const wallX = 16 + 32 * i;
      this.wallGroup.create(wallX, 16, "wall");
    }
    console.log("Creating in GameScene.js");

    this.player = new PlayerCharacter(this, 100, 100);
    this.player.setScale(multiplier)

    this.physics.add.collider(this.player, this.wallGroup); // Makes player and walls collide
  }

  update() {
    this.player.update();
  }
}

function PhaserGame() {
  useEffect(() => {
    // useEffect runs return on dismount, everything else on mount.
    const config = {
      type: Phaser.CANVAS,
      width: width,
      height: height,
      scene: GameScene,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false, // set to true if you want to visualize the physics bodies
        },
      },
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
