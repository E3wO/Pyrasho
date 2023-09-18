// MainMenu.js - Manages the main menu scene; Provides UI for starting the game

import Phaser from "phaser";
import { width, height } from "../config/gameConfig";

class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  preload() {
    this.load.image("bg", "assets/mainmenu.png");
  }

  create() {
    this.add.image(width / 2, height / 2, "bg");

    let startButton = this.add.text(width / 2, height / 2 - 100, "Start Game").setInteractive();
    startButton.on("pointerdown", () => {
      this.scene.start("GameScene");
    });
    let settingsButton = this.add.text(width / 2, height / 2 - 50, "Settings").setInteractive();
    settingsButton.on("pointerdown", () => {
      this.scene.start("Settings");
    });
  }
}

export default MainMenu;
