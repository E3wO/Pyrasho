import React from 'react';
import './MainMenu.css';

const MainMenu = ({ onSignal }) => {
  const handleStartGame = () => {
    onSignal('startgame');
  };

  return (
    <div className="main-menu">
      <button className="menu-button" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default MainMenu;
