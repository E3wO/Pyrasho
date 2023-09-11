// GameScene.js - Represents the Phaser game scene; Handles gameplay, assets, and updates

import React, { useEffect } from "react";
import Phaser from "phaser";
import { mapToLoad } from "./MapLoader";
import PlayerCharacter from "../components/Gameplay/PlayerCharacter";

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

    console.log("Preloading in GameScene.js");
  }

  create() {
    this.physics.world.setBounds(0, 0, 1280, 720);
    this.add.image(640, 360, "ground");
    console.log("Creating in GameScene.js");

    const backbutton = this.add.text(1050, 40, "Back to Main Menu").setInteractive();
    backbutton.on("pointerdown", function () {
      this.onSignal("mainmenu");
    }.bind(this));

    this.player = new PlayerCharacter(this, 100, 100);
  }

  update() {
    this.player.update();
  }
}

function PhaserGame(props) {
  useEffect(() => {
    // Runs return on dismount, everything else on mount.
    const config = {
      type: Phaser.CANVAS,
      width: 1280,
      height: 720,
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
    game.scene.start('GameScene', { onSignal: props.onSignal });

    return () => {
      // Clean up resources if needed
      game.destroy();
      console.log("Destroyed in GameScene.js");
    };
  }, [props.onSignal]);

  return (
    <div id="phaser-game-container">
      {/* Your game canvas will be inserted here */}
    </div>
  );
}

export default PhaserGame;
