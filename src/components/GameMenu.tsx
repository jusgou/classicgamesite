import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { GameCard } from './GameCard';
import { Joystick } from 'lucide-react';

export const GameMenu: React.FC = () => {
  const { currentGame, gameVisible } = useContext(GameContext);

  return (
    <div className={`transition-all duration-500 ease-in-out transform ${gameVisible ? 'scale-0 opacity-0 absolute' : 'scale-100 opacity-100'} text-center max-w-4xl w-full mx-auto`}>
      <div className="flex items-center justify-center mb-8">
        <Joystick className="w-10 h-10 mr-3 text-purple-400" />
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Classic Games
        </h1>
      </div>
      
      <p className="text-gray-300 mb-8 max-w-md mx-auto">
        Revisit the golden era of gaming with these timeless classics. Choose a game to start playing!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <GameCard 
          id="snake"
          name="Snake"
          description="Control the snake, eat food, and grow as long as possible without hitting the walls or yourself."
          color="from-green-600 to-green-400"
          icon="snake"
        />
        <GameCard 
          id="flappybird"
          name="Flappy Bird"
          description="Navigate through pipes by controlling the bird's flight. Test your reflexes and timing!"
          color="from-yellow-600 to-yellow-400"
          icon="bird"
        />
        <GameCard 
          id="tetris"
          name="Tetris"
          description="Arrange falling blocks to create complete rows. Coming soon!"
          color="from-blue-600 to-blue-400"
          icon="tetris"
          disabled
        />
        <GameCard 
          id="pong"
          name="Pong"
          description="The classic table tennis game. Coming soon!"
          color="from-red-600 to-red-400"
          icon="pong"
          disabled
        />
      </div>
    </div>
  );
};