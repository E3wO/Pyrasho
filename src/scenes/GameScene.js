// GameScene.js - Represents the Phaser game scene; Handles gameplay, assets, and updates

import Phaser from "phaser";
import { mapToLoad } from "./MapLoader";
import PlayerCharacter from "../components/gameplay/PlayerCharacter";
import { width, height, multiplier, scale } from "../config/gameConfig"; // Screen width, height, and multiplier

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
    this.load.image("floor", "assets/floor1.png")
  }

  create() {
    this.physics.world.setBounds(0, 0, width, height); // Set collision to edges of the screen
    this.ground = this.add.image(width / 2, height / 2, "ground"); // Adds ground texture and makes it centered
    this.ground.setScale(multiplier);

    const bWidth = width / (32 * multiplier); // Determine screen width in blocks
    const bHeight = height / (32 * multiplier) //Determine screen height in blocks

    for (let i = 0; i < bWidth; i++) {
      const wallX = (16 * multiplier) + (32 * multiplier) * i;
      const wallY = (16 * multiplier)
      this.seina = this.add.image(wallX, wallY, "wall");
      this.seina.setScale(scale)

      for (let n = 1; n < bHeight; n++) {
        const floorY = wallY + (32 * multiplier) * n;
        this.floor = this.add.image(wallX, floorY, "floor");
        this.floor.setScale(scale)
      }
    }

    console.log("Creating in GameScene.js");

    const backbutton = this.add
      .text((width / 16) * 11, 60, "Back to Main Menu")
      .setInteractive();
    backbutton.on(
      "pointerdown",
      function () {
        this.scene.start("MainMenu")
      }.bind(this)
    );

    this.player = new PlayerCharacter(this, 100 * multiplier, 100 * multiplier);
    this.player.setScale(scale);

    //this.physics.add.collider(this.player, this.object); // Makes player and desired objects collide
  }

  update() {
    this.player.update();
  }
}

export default GameScene;
