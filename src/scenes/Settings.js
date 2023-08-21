import React from 'react';
import './MainMenu.css';

const MenuButtons = ({ onSignal }) => {
  const handleGoBack = () => {
    onSignal('mainmenu');
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
