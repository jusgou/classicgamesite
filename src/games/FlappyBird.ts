export class FlappyBird {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private gameLoop: number | null = null;
  private boundHandleInput: (e: KeyboardEvent) => void;

  // Game constants
  private readonly WIDTH = 400;
  private readonly HEIGHT = 600;
  private readonly GRAVITY = 0.5;
  private readonly JUMP = -10;
  private readonly PIPE_WIDTH = 60;
  private readonly PIPE_GAP = 150;
  private readonly PIPE_SPEED = 3;
  private readonly GROUND_HEIGHT = 100;
  private readonly RIM_HEIGHT = 20;
  private readonly BIRD_RADIUS = 15;

  // Colors
  private readonly SKY_BLUE = '#87CEEB';
  private readonly GROUND_GREEN = '#9ACD32';
  private readonly PIPE_GREEN = '#538D4E';
  private readonly PIPE_RIM = '#3E6A3A';
  private readonly YELLOW = '#FFD700';
  private readonly ORANGE = '#FFA500';
  private readonly BLACK = '#000000';
  private readonly WHITE = '#FFFFFF';

  // Game state
  private score: number = 0;
  private gameOver: boolean = false;
  private bird = {
    x: 100,
    y: 300,
    velocity: 0,
    flapFrame: 0,
    flapSpeed: 10
  };
  private pipe = {
    x: this.WIDTH,
    height: 0
  };
  private groundX: number = 0;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    this.ctx = ctx;

    // Set canvas size
    this.canvas.width = this.WIDTH;
    this.canvas.height = this.HEIGHT;

    // Bind input handler
    this.boundHandleInput = this.handleInput.bind(this);
    document.addEventListener('keydown', this.boundHandleInput);

    // Initialize first pipe
    this.resetPipe();
  }

  private resetGame(): void {
    this.bird = {
      x: 100,
      y: 300,
      velocity: 0,
      flapFrame: 0,
      flapSpeed: 10
    };
    this.pipe.x = this.WIDTH;
    this.resetPipe();
    this.score = 0;
    this.groundX = 0;
    this.gameOver = false;
  }

  private resetPipe(): void {
    this.pipe.height = Math.random() * 300 + 100; // Random height between 100 and 400
  }

  private handleInput(event: KeyboardEvent): void {
    if (event.code === 'Space' && !this.gameOver) {
      this.bird.velocity = this.JUMP;
    }
  }

  private update(): void {
    if (this.gameOver) return;

    // Update bird
    this.bird.velocity += this.GRAVITY;
    this.bird.y += this.bird.velocity;
    this.bird.flapFrame = (this.bird.flapFrame + 1) % this.bird.flapSpeed;

    // Update pipe
    this.pipe.x -= this.PIPE_SPEED;
    if (this.pipe.x < -this.PIPE_WIDTH) {
      this.pipe.x = this.WIDTH;
      this.resetPipe();
      this.score++;
    }

    // Update ground
    this.groundX -= this.PIPE_SPEED;
    if (this.groundX <= -this.WIDTH) {
      this.groundX = 0;
    }

    // Collision detection
    if (this.checkCollision()) {
      this.gameOver = true;
      this.stop();
      setTimeout(() => {
        alert(`Game Over! Score: ${this.score}`);
        if (window.returnToMenu) {
          window.returnToMenu();
        }
      }, 100);
    }

    this.draw();
  }

  private checkCollision(): boolean {
    // Ground collision
    if (this.bird.y > this.HEIGHT - this.GROUND_HEIGHT || this.bird.y < 0) {
      return true;
    }

    // Pipe collision - using rectangular collision detection
    const birdBox = {
      left: this.bird.x - this.BIRD_RADIUS,
      right: this.bird.x + this.BIRD_RADIUS,
      top: this.bird.y - this.BIRD_RADIUS,
      bottom: this.bird.y + this.BIRD_RADIUS
    };

    // Upper pipe
    if (
      birdBox.right > this.pipe.x &&
      birdBox.left < this.pipe.x + this.PIPE_WIDTH &&
      birdBox.top < this.pipe.height
    ) {
      return true;
    }

    // Lower pipe
    if (
      birdBox.right > this.pipe.x &&
      birdBox.left < this.pipe.x + this.PIPE_WIDTH &&
      birdBox.bottom > this.pipe.height + this.PIPE_GAP
    ) {
      return true;
    }

    return false;
  }

  private draw(): void {
    // Clear canvas
    this.ctx.fillStyle = this.SKY_BLUE;
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    // Draw ground
    this.ctx.fillStyle = this.GROUND_GREEN;
    this.ctx.fillRect(this.groundX, this.HEIGHT - this.GROUND_HEIGHT, this.WIDTH, this.GROUND_HEIGHT);
    this.ctx.fillRect(this.groundX + this.WIDTH, this.HEIGHT - this.GROUND_HEIGHT, this.WIDTH, this.GROUND_HEIGHT);

    // Draw pipes
    this.drawPipes();

    // Draw bird
    this.drawBird();

    // Draw score
    this.ctx.fillStyle = this.BLACK;
    this.ctx.font = '36px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 40);
  }

  private drawPipes(): void {
    // Upper pipe
    this.ctx.fillStyle = this.PIPE_GREEN;
    this.ctx.fillRect(this.pipe.x, 0, this.PIPE_WIDTH, this.pipe.height);
    
    // Upper pipe rim
    this.ctx.fillStyle = this.PIPE_RIM;
    this.ctx.fillRect(this.pipe.x - 10, this.pipe.height - this.RIM_HEIGHT, 
                     this.PIPE_WIDTH + 20, this.RIM_HEIGHT);

    // Lower pipe
    this.ctx.fillStyle = this.PIPE_GREEN;
    this.ctx.fillRect(this.pipe.x, this.pipe.height + this.PIPE_GAP, 
                     this.PIPE_WIDTH, this.HEIGHT);

    // Lower pipe rim
    this.ctx.fillStyle = this.PIPE_RIM;
    this.ctx.fillRect(this.pipe.x - 10, this.pipe.height + this.PIPE_GAP, 
                     this.PIPE_WIDTH + 20, this.RIM_HEIGHT);
  }

  private drawBird(): void {
    const flapState = Math.floor(this.bird.flapFrame / (this.bird.flapSpeed / 3));
    
    // Bird body
    this.ctx.fillStyle = this.YELLOW;
    this.ctx.beginPath();
    this.ctx.arc(this.bird.x, this.bird.y, this.BIRD_RADIUS, 0, Math.PI * 2);
    this.ctx.fill();

    // Wing
    this.ctx.beginPath();
    if (flapState === 0) { // Up position
      this.ctx.moveTo(this.bird.x + 5, this.bird.y + 5);
      this.ctx.lineTo(this.bird.x + 10, this.bird.y - 5);
      this.ctx.lineTo(this.bird.x - 5, this.bird.y - 5);
    } else if (flapState === 1) { // Middle position
      this.ctx.moveTo(this.bird.x + 5, this.bird.y + 5);
      this.ctx.lineTo(this.bird.x + 15, this.bird.y);
      this.ctx.lineTo(this.bird.x - 5, this.bird.y);
    } else { // Down position
      this.ctx.moveTo(this.bird.x + 5, this.bird.y + 5);
      this.ctx.lineTo(this.bird.x + 10, this.bird.y + 10);
      this.ctx.lineTo(this.bird.x - 5, this.bird.y + 10);
    }
    this.ctx.fill();

    // Eye
    this.ctx.fillStyle = this.WHITE;
    this.ctx.beginPath();
    this.ctx.arc(this.bird.x + 8, this.bird.y - 5, 5, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = this.BLACK;
    this.ctx.beginPath();
    this.ctx.arc(this.bird.x + 8, this.bird.y - 5, 2, 0, Math.PI * 2);
    this.ctx.fill();

    // Beak
    this.ctx.fillStyle = this.ORANGE;
    this.ctx.beginPath();
    this.ctx.moveTo(this.bird.x + 10, this.bird.y);
    this.ctx.lineTo(this.bird.x + 20, this.bird.y - 5);
    this.ctx.lineTo(this.bird.x + 20, this.bird.y + 5);
    this.ctx.closePath();
    this.ctx.fill();
  }

  public start(): void {
    if (!this.gameLoop) {
      this.resetGame();
      this.gameLoop = window.setInterval(() => this.update(), 1000 / 60); // 60 FPS
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
