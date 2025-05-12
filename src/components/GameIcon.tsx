import React from 'react';
import { 
  Zap, 
  Puzzle, 
  CircleDashed
} from 'lucide-react';

interface GameIconProps {
  name: string;
  className?: string;
}

export const GameIcon: React.FC<GameIconProps> = ({ name, className = "w-6 h-6" }) => {
  switch (name.toLowerCase()) {
    case 'snake':
      // Custom SVG for snake
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          <path d="M21 12c0-4.4-3.6-8-8-8s-8 3.6-8 8" />
          <path d="M5 12c0 4.4 3.6 8 8 8" />
          <path d="M13 20c4.4 0 8-3.6 8-8" />
          <path d="M13 4c3 0 5.5 1.4 7 4" />
          <path d="M10 20c-3 0-5.5-1.4-7-4" />
          <path d="M16 8l-3.8 1.3" />
          <path d="M14 16L10 14" />
        </svg>
      );
    case 'tetris':
      return <Puzzle className={className} />;
    case 'pong':
      return <CircleDashed className={className} />;
    default:
      return <Zap className={className} />;
  }
};