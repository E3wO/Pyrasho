import React, { useState } from 'react';
//import Phaser from 'phaser';
import MainMenu from './scenes/MainMenu';
import Settings from './scenes/Settings';
import PlayScene from './scenes/PlayScene';

const Game = () => {
  const [currentScreen, setCurrentScreen] = useState('mainmenu'); //Defaults to Main Menu on first init

  const handleSignal = (signal) => {
    setCurrentScreen(signal);
  };

  return (
    <div className="game-container">
      {currentScreen === 'mainmenu' && <MainMenu onSignal={handleSignal} />}
      {currentScreen === 'startgame' && <PlayScene onSignal={handleSignal} />}
      {currentScreen === 'opensettings' && <Settings onSignal={handleSignal} />}
    </div>
  );
};

export default Game;
