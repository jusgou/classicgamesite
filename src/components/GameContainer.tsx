import React, { useContext, useRef, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import { ArrowLeft, Trophy } from 'lucide-react';
import { GameControls } from './GameControls';

export const GameContainer: React.FC = () => {
  const { gameVisible, currentGame, returnToMenu, score } = useContext(GameContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (gameVisible && canvasRef.current && currentGame) {
      // The canvas is now available for the game to use
      window.gameCanvas = canvasRef.current;
    }
  }, [gameVisible, currentGame]);

  return (
    <div className={`transition-all duration-500 transform ${
      gameVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0 absolute pointer-events-none'
    } flex flex-col items-center`}>
      
      <div className="w-full max-w-2xl bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-xl">
        <div className="p-4 flex items-center justify-between bg-gray-800 border-b border-gray-700">
          <button 
            onClick={returnToMenu}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Menu
          </button>
          
          <div className="flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
            <span className="font-semibold">Score: {score}</span>
          </div>
        </div>
        
        <div className="relative">
          <canvas 
            ref={canvasRef}
            id="gameCanvas" 
            width="400" 
            height="600" 
            className="bg-gray-900 mx-auto border-gray-700"
          ></canvas>
          
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center" 
               style={{ opacity: gameVisible && currentGame ? 0 : 1, transition: 'opacity 0.5s ease' }}>
            <div className="text-center p-8 bg-gray-900 bg-opacity-70 rounded-lg">
              <p className="text-xl">Select a game from the menu to start playing</p>
            </div>
          </div>
        </div>
        
        <GameControls />
      </div>
    </div>
  );
};