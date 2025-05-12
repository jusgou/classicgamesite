import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Define global window function for the snake game
window.returnToMenu = () => {
  // This will be overridden by the actual function from GameContext
  console.log("returnToMenu not yet initialized");
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);