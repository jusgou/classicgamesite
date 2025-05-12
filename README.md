# Classic Game Site

A modern web application featuring classic arcade games rebuilt with TypeScript and React. The site offers a sleek, responsive interface and smooth gameplay experience.

## 🎮 Live Demo

Visit the site at: https://classic-game-site.windsurf.build

## 🛠 Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Netlify with continuous deployment from GitHub

## 🏗 Project Structure

```
src/
├── components/         # React components
│   ├── GameCard       # Game selection cards
│   ├── GameContainer  # Main game canvas container
│   ├── GameControls   # Game control interface
│   ├── GameIcon       # Game icons/thumbnails
│   └── GameMenu       # Main menu interface
├── context/
│   └── GameContext    # Game state management
├── games/
│   └── SnakeGame      # Snake game implementation
└── styles/
    └── app.css        # Global styles and Tailwind
```

## 🎯 Features

### Components
- **GameMenu**: Main hub for game selection and navigation
- **GameContainer**: Handles the game canvas and gameplay area
- **GameControls**: Provides user interface for game controls
- **GameContext**: Manages game state and transitions

### Games

#### 🐍 Snake Game
A classic implementation of the Snake game with modern features:
- Smooth canvas-based rendering
- Responsive controls
- Score tracking
- Food particle effects with shine
- Game over handling with menu return
- Customizable speed (currently set to 110ms refresh)

Technical Implementation:
- Uses HTML5 Canvas for rendering
- Class-based TypeScript implementation
- Collision detection system
- Responsive keyboard controls
- State management for game progression

## 🚀 Deployment

The site is deployed on Netlify with continuous deployment:

1. **GitHub Integration**:
   - Repository is connected to Netlify
   - Any push to main branch triggers automatic deployment

2. **Build Configuration** (`netlify.toml`):
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Development**:
   - Local development: `npm run dev`
   - Build: `npm run build`
   - Preview: `npm run preview`

## 🔧 Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## 🔄 Continuous Deployment

The site automatically deploys when changes are pushed to the main branch:

1. Push changes to GitHub
2. Netlify automatically:
   - Detects the push
   - Runs build command
   - Deploys to production if build succeeds

## 🎮 Adding New Games

To add a new game:

1. Create game logic in `src/games/`
2. Add game component to menu
3. Implement canvas rendering
4. Add controls and state management
5. Update GameContext to include new game

## 📝 License

MIT License - feel free to use and modify as needed!
