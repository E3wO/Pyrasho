// Settings.js - Manages the settings scene; Allows users to configure game options

import Phaser from "phaser";
import { width, height } from "../config/gameConfig";

class Settings extends Phaser.Scene {
  constructor() {
    super("Settings");
  }

  preload() {
    this.load.image("bg", "assets/mainmenu.png");
  }

  create() {
    this.add.image(width / 2, height / 2, "bg");

    let backButton = this.add
      .text(width / 2, height / 2 - 100, "Back")
      .setInteractive();
    backButton.on("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}

export default Settings;
