// Settings.js - Manages the settings scene; Allows users to configure game options

import React from "react";
import "./MainMenu.css";
import ButtonComponent from "../components/gameplay/UI/ButtonComponent";

const MenuButtons = ({ onSignal }) => {
  const handleGoBack = () => {
    onSignal("mainmenu");
  };

  return (
    <div className="main-menu">
      <ButtonComponent label="Back" onClick={handleGoBack} />
    </div>
  );
};

export default MenuButtons;
