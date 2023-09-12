// MainMenu.js - Manages the main menu scene; Provides UI for starting the game

import React from "react";
import "./MainMenu.css";
import ButtonComponent from "../components/UI/ButtonComponent";

const MenuButtons = ({ onSignal }) => {
  const handleStartGame = () => {
    onSignal("startgame");
  };

  const handleSettings = () => {
    onSignal("opensettings");
  };

  return (
    <div className="main-menu">
      <ButtonComponent label="Start Game" onClick={handleStartGame} />
      <ButtonComponent label="Settings" onClick={handleSettings} />
    </div>
  );
};

export default MenuButtons;
