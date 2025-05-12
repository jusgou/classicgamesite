import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

export const GameControls: React.FC = () => {
  const { currentGame } = useContext(GameContext);
  
  if (!currentGame) return null;
  
  // Game-specific controls based on the current game
  let controlsInfo;
  
  switch(currentGame) {
    case 'snake':
      controlsInfo = (
        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex flex-col items-center">
            <div className="bg-gray-700 p-2 rounded-lg mb-1">
              <ArrowUp className="w-5 h-5" />
            </div>
            <span className="text-xs">Up</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-700 p-2 rounded-lg mb-1">
              <ArrowDown className="w-5 h-5" />
            </div>
            <span className="text-xs">Down</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-700 p-2 rounded-lg mb-1">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="text-xs">Left</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-700 p-2 rounded-lg mb-1">
              <ArrowRight className="w-5 h-5" />
            </div>
            <span className="text-xs">Right</span>
          </div>
        </div>
      );
      break;
    default:
      controlsInfo = null;
  }
  
  return (
    <div className="p-4 border-t border-gray-700 bg-gray-800 bg-opacity-50">
      <p className="text-sm text-center text-gray-400 mb-3">Game Controls</p>
      {controlsInfo}
    </div>
  );
};