// Game.js - Manages game logic and screen transitions; Acts as a mediator between scenes & what to render

import React, { useEffect, useRef } from "react";
import MainMenu from "./scenes/MainMenu";
import Settings from "./scenes/Settings";
import GameScene from "./scenes/GameScene";
import { width, height } from "./config/gameConfig";
import Phaser from "phaser";

const Game = () => {
  // Hold a reference to the game
  const gameRef = useRef(null);

  useEffect(() => {
    const gameConfig = {
      type: Phaser.CANVAS,
      width: width,
      height: height,
      parent: "phaser-container",
      scene: [MainMenu, GameScene, Settings],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
    };

    gameRef.current = new Phaser.Game(gameConfig);

    // Default to main menu on mount
    gameRef.current.scene.start("MainMenu");

    // Destroy game component on dismount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []); // Empty dependency array means this effect runs once

  return <div className="game-container" id="phaser-container"></div>;
};

export default Game;
