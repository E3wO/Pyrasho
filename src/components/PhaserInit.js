// PhaserInit.js - Initializes a Phaser instance
import React, { useEffect } from "react";
import Phaser from "phaser";
import GameScene from "../scenes/GameScene";
import { width, height } from "../config/gameConfig";

export default function PhaserInit(props) {
  useEffect(() => {
    const config = {
      type: Phaser.CANVAS,
      parent: "phaser-container",
      width: width,
      height: height,
      scene: GameScene,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(config);
    game.scene.start("GameScene", { onSignal: props.onSignal });

    return () => {
      game.destroy(true);
    };
  }, [props.onSignal]);

  return <div id="phaser-container" style={{ width: width, height: height }} />;
}
