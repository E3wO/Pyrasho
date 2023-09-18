// GameScene.js - Represents the Phaser game scene; Handles gameplay, assets, and updates

import Phaser from "phaser";
import { mapToLoad } from "../components/utils/MapLoader";
import PlayerCharacter from "../components/gameplay/PlayerCharacter";
import { width, height, multiplier, scale } from "../config/gameConfig"; // Screen width, height, and multiplier

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    const mapPath = mapToLoad();
    this.load.image("ground", mapPath);
    this.load.image("player", "assets/player.png");
    this.load.image("wall", "assets/wall.png");
    this.load.image("floor", "assets/floor1.png")
  }

  create() {
    this.setupBackground();
    this.setupPlayer();
    this.setupInteractiveElements();
  }

  setupBackground() {
    this.physics.world.setBounds(0, 0, width, height);
    this.addScaledImage(width / 2, height / 2, "ground", multiplier);

    const bWidth = width / (32 * multiplier);
    const bHeight = height / (32 * multiplier);

    for (let i = 0; i < bWidth; i++) {
      const wallX = (16 * multiplier) + (32 * multiplier) * i;
      this.addScaledImage(wallX, 16 * multiplier, "wall");

      for (let n = 1; n < bHeight; n++) {
        this.addScaledImage(wallX, (16 + 32 * n) * multiplier, "floor");
      }
    }
  }

    setupPlayer() {
    this.player = new PlayerCharacter(this, 100 * multiplier, 100 * multiplier);
    this.player.setScale(scale);
    //this.physics.add.collider(this.player, this.object); // Makes player and desired objects collide
  }

  setupInteractiveElements() {
    const backbutton = this.add.text((width / 16) * 11, 60, "Back to Main Menu").setInteractive();
    backbutton.on("pointerdown", function () {
      this.scene.start("MainMenu");
    }, this);
  }

  addScaledImage(x, y, key, scaleValue = scale) {
    const image = this.add.image(x, y, key);
    image.setScale(scaleValue);
    return image;
  }

  update() {
    this.player.update();
  }
}

export default GameScene;
