// BaseMenuScene.js - Preloads menu assets to reduce repeating code

import Phaser from "phaser";
import { width, height, multiplier, scale } from "../../config/gameConfig";

class BaseMenuScene extends Phaser.Scene {
  preload() {
    this.load.image("menuBackground", "assets/menubackground.png");
    this.load.image("button", "assets/button.png");
  }

  createBackground() {
    this.backg = this.add.image(width / 2, height / 2, "menuBackground");
    this.backg.setScale(0.25 * multiplier);
  }

  createButton(x, y, text, targetScene) {
    // Create the button with the texture
    let button = this.add.image(x, y, "button").setInteractive();

    button.setScale(scale);

    // Add text over the button
    this.add.text(x, y, text, { backgroundColor: 'transparent', align: "center" }).setOrigin(0.5, 0.5);


    // Listen for pointer events on the button
    button.on("pointerdown", () => {
      this.scene.start(targetScene);
    });

    // Optionally, you can add visual feedback for button hover (pointerover) and pointerout events
    button.on("pointerover", () => {
      button.setTint(0xc0c0c0); // Lighten the button when hovered
    });

    button.on("pointerout", () => {
      button.clearTint(); // Reset tint when hover ends
    });
    return button; // This is optional, but can be useful if you want to further manipulate the button outside this method.
  }
}

export default BaseMenuScene;
