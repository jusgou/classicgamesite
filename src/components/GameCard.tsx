import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { 
  CircleOff,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { GameIcon } from './GameIcon';

interface GameCardProps {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  disabled?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ 
  id, 
  name, 
  description, 
  color, 
  icon,
  disabled = false 
}) => {
  const { startGame } = useContext(GameContext);

  return (
    <div 
      className={`relative overflow-hidden rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 transition-all duration-300 ${
        disabled ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer'
      }`}
      onClick={() => !disabled && startGame(id)}
    >
      <div className={`absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-gradient-to-r ${color} opacity-80`}></div>
      
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-gray-700 p-3 rounded-lg">
            <GameIcon name={icon} className="w-8 h-8" />
          </div>
          {disabled && (
            <div className="bg-gray-700 p-2 rounded-lg">
              <CircleOff className="w-5 h-5 text-gray-400" />
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mt-2">{name}</h3>
        <p className="text-gray-400 text-sm mt-2 flex-grow">{description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          {disabled ? (
            <div className="flex items-center text-yellow-500 text-xs">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Coming Soon
            </div>
          ) : (
            <div className="flex items-center text-blue-400 text-sm font-medium">
              Play Now
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};