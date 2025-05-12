export class SnakeGame {
  private gridSize: number = 20;
  private tileCount: number;
  private snake: { x: number, y: number }[];
  private food: { x: number, y: number };
  private dx: number = 0;
  private dy: number = 0;
  private score: number = 0;
  private gameLoop: number | null = null;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private updateScoreCallback: (score: number) => void;
  private boundHandleInput: (event: KeyboardEvent) => void;

  constructor(updateScoreCallback: (score: number) => void) {
    this.canvas = window.gameCanvas as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.tileCount = this.canvas.width / this.gridSize;
    this.snake = [{ x: 10, y: 10 }];
    this.food = this.getRandomFood();
    this.updateScoreCallback = updateScoreCallback;
    
    // Bind the event handler and store the bound function
    this.boundHandleInput = this.handleInput.bind(this);
    document.addEventListener('keydown', this.boundHandleInput);
  }

  private getRandomFood(): { x: number, y: number } {
    return {
      x: Math.floor(Math.random() * this.tileCount),
      y: Math.floor(Math.random() * this.tileCount)
    };
  }

  private handleInput(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        if (this.dy === 0) { this.dx = 0; this.dy = -1; }
        break;
      case 'ArrowDown':
        if (this.dy === 0) { this.dx = 0; this.dy = 1; }
        break;
      case 'ArrowLeft':
        if (this.dx === 0) { this.dx = -1; this.dy = 0; }
        break;
      case 'ArrowRight':
        if (this.dx === 0) { this.dx = 1; this.dy = 0; }
        break;
    }
  }

  private update(): void {
    // Move snake
    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

    // Check collision with walls
    if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
      this.gameOver();
      return;
    }

    // Check collision with self
    if (this.snake.some((segment, index) => index > 0 && segment.x === head.x && segment.y === head.y)) {
      this.gameOver();
      return;
    }

    // Move snake
    this.snake.unshift(head);

    // Check food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.updateScoreCallback(this.score);
      this.food = this.getRandomFood();
    } else {
      this.snake.pop();
    }

    // Draw
    this.draw();
  }

  private draw(): void {
    const ctx = this.ctx;
    
    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, '#1a202c');
    gradient.addColorStop(1, '#2d3748');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw grid lines (subtle)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= this.tileCount; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(i * this.gridSize, 0);
      ctx.lineTo(i * this.gridSize, this.canvas.height);
      ctx.stroke();
      
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, i * this.gridSize);
      ctx.lineTo(this.canvas.width, i * this.gridSize);
      ctx.stroke();
    }

    // Draw snake with gradient and rounded corners
    this.snake.forEach((segment, index) => {
      const isHead = index === 0;
      
      // Create snake segment gradient (head is different from body)
      const segmentGradient = ctx.createLinearGradient(
        segment.x * this.gridSize,
        segment.y * this.gridSize,
        (segment.x + 1) * this.gridSize,
        (segment.y + 1) * this.gridSize
      );
      
      if (isHead) {
        segmentGradient.addColorStop(0, '#4ade80');  // Green 400
        segmentGradient.addColorStop(1, '#22c55e');  // Green 500
      } else {
        segmentGradient.addColorStop(0, '#22c55e');  // Green 500
        segmentGradient.addColorStop(1, '#16a34a');  // Green 600
      }
      
      ctx.fillStyle = segmentGradient;
      
      // Draw rounded rectangle for the snake segment
      const size = this.gridSize - 2;
      const radius = isHead ? 6 : 4;
      const x = segment.x * this.gridSize + 1;
      const y = segment.y * this.gridSize + 1;
      
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + size, y, x + size, y + size, radius);
      ctx.arcTo(x + size, y + size, x, y + size, radius);
      ctx.arcTo(x, y + size, x, y, radius);
      ctx.arcTo(x, y, x + size, y, radius);
      ctx.closePath();
      ctx.fill();
      
      // Add eyes to the head
      if (isHead) {
        ctx.fillStyle = 'white';
        
        // Position eyes based on direction
        const eyeSize = 3;
        let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
        
        if (this.dx === 1) { // Moving right
          leftEyeX = x + size - 6;
          leftEyeY = y + 5;
          rightEyeX = x + size - 6;
          rightEyeY = y + size - 8;
        } else if (this.dx === -1) { // Moving left
          leftEyeX = x + 6;
          leftEyeY = y + 5;
          rightEyeX = x + 6;
          rightEyeY = y + size - 8;
        } else if (this.dy === -1) { // Moving up
          leftEyeX = x + 5;
          leftEyeY = y + 6;
          rightEyeX = x + size - 8;
          rightEyeY = y + 6;
        } else { // Moving down or not moving
          leftEyeX = x + 5;
          leftEyeY = y + size - 6;
          rightEyeX = x + size - 8;
          rightEyeY = y + size - 6;
        }
        
        ctx.beginPath();
        ctx.arc(leftEyeX, leftEyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(rightEyeX, rightEyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw food with pulsing effect
    const time = Date.now() * 0.003;
    const pulse = 1 + Math.sin(time) * 0.1;
    
    // Create food gradient (red apple-like)
    const foodGradient = ctx.createRadialGradient(
      this.food.x * this.gridSize + this.gridSize / 2,
      this.food.y * this.gridSize + this.gridSize / 2,
      0,
      this.food.x * this.gridSize + this.gridSize / 2,
      this.food.y * this.gridSize + this.gridSize / 2,
      this.gridSize / 2
    );
    
    foodGradient.addColorStop(0, '#ef4444'); // Red 500
    foodGradient.addColorStop(1, '#b91c1c'); // Red 700
    
    ctx.fillStyle = foodGradient;
    
    // Draw circular food with pulse
    const centerX = this.food.x * this.gridSize + this.gridSize / 2;
    const centerY = this.food.y * this.gridSize + this.gridSize / 2;
    const radius = (this.gridSize / 2 - 2) * pulse;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Add shine to food
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(centerX - 2, centerY - 2, radius / 3, 0, Math.PI * 2);
    ctx.fill();
  }

  private gameOver(): void {
    this.stop();
    setTimeout(() => {
      alert(`Game Over! Score: ${this.score}`);
      // Use the GameContext to return to menu
      if (window.returnToMenu) {
        window.returnToMenu();
      }
    }, 100);
  }

  public start(): void {
    if (!this.gameLoop) {
      this.gameLoop = window.setInterval(() => this.update(), 110); // Slightly faster for better gameplay
    }
  }

  public stop(): void {
    if (this.gameLoop) {
      window.clearInterval(this.gameLoop);
      this.gameLoop = null;
    }
    document.removeEventListener('keydown', this.boundHandleInput);
  }
}

// Add window interface extension
declare global {
  interface Window {
    gameCanvas: HTMLCanvasElement;
    returnToMenu: () => void;
  }
}