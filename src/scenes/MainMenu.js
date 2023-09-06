// MainMenu.js - Manages the main menu scene; Provides UI for starting the game

import React from "react";
import "./MainMenu.css";

const MenuButtons = ({ onSignal }) => {
  const handleStartGame = () => {
    onSignal("startgame");
  };

  const handleSettings = () => {
    onSignal("opensettings");
  };

  return (
    <div className="main-menu">
      <button className="menu-button" onClick={handleStartGame}>
        Start Game
      </button>
      <button className="menu-button" onClick={handleSettings}>
        Settings
      </button>
    </div>
  );
};

export default MenuButtons;
