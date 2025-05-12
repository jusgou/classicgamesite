import React, { useState } from 'react';
import { GameMenu } from './components/GameMenu';
import { GameContainer } from './components/GameContainer';
import { GameContextProvider } from './context/GameContext';
import './styles/app.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-4">
      <GameContextProvider>
        <GameMenu />
        <GameContainer />
      </GameContextProvider>
    </div>
  );
}

export default App;