// Settings.js - Manages the settings scene; Allows users to configure game options

import React from "react";
import "./MainMenu.css";

const MenuButtons = ({ onSignal }) => {
  const handleGoBack = () => {
    onSignal("mainmenu");
  };

  return (
    <div className="main-menu">
      <button className="menu-button" onClick={handleGoBack}>
        Back
      </button>
    </div>
  );
};

export default MenuButtons;
