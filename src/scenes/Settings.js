// Settings.js - Manages the settings scene; Allows users to configure game options

import BaseMenuScene from "./base/BaseMenuScene";
import { width, height } from "../config/gameConfig";

class Settings extends BaseMenuScene {
  constructor() {
    super("Settings");
  }

  create() {
    this.createBackground();

    this.createButton(width / 2, height / 2 - 100, "Back", "MainMenu");
  }
}

export default Settings;
