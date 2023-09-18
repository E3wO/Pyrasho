// MainMenu.js - Manages the main menu scene; Provides UI for starting the game

import BaseMenuScene from "./base/BaseMenuScene";
import { width, height, multiplier } from "../config/gameConfig";

class MainMenu extends BaseMenuScene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.createBackground();

    this.createButton(width / 2, height / 2 - (50 * multiplier), "Settings", "Settings");
    this.createButton(width / 2, height / 2 - (100 * multiplier), "Start Game", "GameScene");
  }
}

export default MainMenu;
