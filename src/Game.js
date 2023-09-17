// Game.js - Manages game logic and screen transitions; Acts as a mediator between scenes & what to render

import React, { useState } from "react";
import MainMenu from "./scenes/MainMenu";
import Settings from "./scenes/Settings";
import GameScene from "./scenes/GameScene";

const Game = () => {
  const [currentScreen, setCurrentScreen] = useState("mainmenu"); // Defaults to Main Menu on first init

  const handleSignal = (signal) => {
    setCurrentScreen(signal);
  }; // Defines without executing immediately

  return (
    <div className="game-container">
      {currentScreen === "mainmenu" && ( // If true then
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
