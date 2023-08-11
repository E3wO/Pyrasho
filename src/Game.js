import React, { useState } from 'react';
import Phaser from 'phaser';
import MainMenu from './components/MainMenu';
import App from './App';

const Game = () => {
  const [currentScreen, setCurrentScreen] = useState('mainmenu');

  const handleSignal = (signal) => {
    setCurrentScreen(signal);
  };

  return (
    <div className="game-container">
      {currentScreen === 'mainmenu' && <MainMenu onSignal={handleSignal} />}
      {currentScreen === 'game' && <App />}
    </div>
  );
};

export default Game;
