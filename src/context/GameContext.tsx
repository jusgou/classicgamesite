import React, { createContext, useState, useEffect } from 'react';
import { SnakeGame } from '../games/SnakeGame';

interface GameContextType {
  currentGame: string | null;
  gameVisible: boolean;
  score: number;
  startGame: (game: string) => void;
  returnToMenu: () => void;
  updateScore: (newScore: number) => void;
}

export const GameContext = createContext<GameContextType>({
  currentGame: null,
  gameVisible: false,
  score: 0,
  startGame: () => {},
  returnToMenu: () => {},
  updateScore: () => {}
});

export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [gameVisible, setGameVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [gameInstance, setGameInstance] = useState<any>(null);

  // Clean up game instance when component unmounts
  useEffect(() => {
    return () => {
      if (gameInstance) {
        gameInstance.stop();
      }
    };
  }, [gameInstance]);

  const startGame = (game: string) => {
    setCurrentGame(game);
    setGameVisible(true);
    setScore(0);
    
    // Wait for next tick to ensure canvas is ready
    setTimeout(() => {
      let instance;
      
      if (game === 'snake') {
        instance = new SnakeGame(updateScore);
        instance.start();
      }
      // Add more games here as they're implemented
      
      setGameInstance(instance);
    }, 100);
  };

  const returnToMenu = () => {
    if (gameInstance) {
      gameInstance.stop();
    }
    
    setGameInstance(null);
    setGameVisible(false);
    setCurrentGame(null);
  };

  const updateScore = (newScore: number) => {
    setScore(newScore);
  };

  return (
    <GameContext.Provider 
      value={{ 
        currentGame, 
        gameVisible, 
        score,
        startGame, 
        returnToMenu,
        updateScore
      }}
    >
      {children}
    </GameContext.Provider>
  );
};