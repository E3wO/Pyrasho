import React, { useState } from "react";
import Phaser from "phaser";
import MainMenu from "./scenes/MainMenu";
import Settings from "./scenes/Settings";
import GameScene from "./scenes/GameScene";

const Game = () => {
  const [currentScreen, setCurrentScreen] = useState("mainmenu"); //Defaults to Main Menu on first init

  const handleSignal = (signal) => {
    setCurrentScreen(signal);
  };

  return (
    <div className="game-container">
      {currentScreen === "mainmenu" && (
        <div>
          <MainMenu onSignal={handleSignal} />
          {console.log("Rendering MainMenu")}
        </div>
      )}
      {currentScreen === "startgame" && (
        <div>
          <GameScene onSignal={handleSignal} />
          {console.log("Rendering GameScene")}
        </div>
      )}
      {currentScreen === "opensettings" && (
        <div>
          <Settings onSignal={handleSignal} />
          {console.log("Rendering Settings")}
        </div>
      )}
    </div>
  );
};

export default Game;
