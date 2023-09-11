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

  init(data) {
    this.onSignal = data.onSignal;
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
    this.ground.setScale(multiplier);

    this.wallGroup = this.physics.add.staticGroup();

    const walls = width / (32 * multiplier);
    for (let i = 0; i < walls; i++) {
      const wallX = 16 + 32 * i;
      this.wallGroup.create(wallX, 16, "wall");
    }
    console.log("Creating in GameScene.js");

    const backbutton = this.add
      .text((width / 16) * 11, 60, "Back to Main Menu")
      .setInteractive();
    backbutton.on(
      "pointerdown",
      function () {
        this.onSignal("mainmenu");
      }.bind(this)
    );

    this.player = new PlayerCharacter(this, 100, 100);
    this.player.setScale(multiplier);

    this.physics.add.collider(this.player, this.wallGroup); // Makes player and walls collide
  }

  update() {
    this.player.update();
  }
}

let game; // Move this outside of the useEffect to retain the reference between renders

function PhaserGame(props) {
  useEffect(() => {
    // Runs return on dismount, everything else on mount.

    if (game) {
      // If game exists, just restart the GameScene
      game.scene.restart("GameScene");
    } else {
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

      game = new Phaser.Game(config);
      game.scene.start("GameScene", { onSignal: props.onSignal });
    }

    return () => {
      // Clean up resources if needed
      if (game) {
        game.destroy(true);
        game = null;
        console.log("Destroyed in GameScene.js");
      }
    };
  }, [props.onSignal]);

  return (
    <div id="phaser-game-container">
      {/* Your game canvas will be inserted here */}
    </div>
  );
}

export default PhaserGame;
