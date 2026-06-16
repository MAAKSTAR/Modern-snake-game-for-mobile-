# 🎮 Neon Snake Game

A modern, highly visual neon-styled snake game for mobile and PC devices.

## Features

✨ **Modern Visuals**
- Stunning neon glow effects
- Smooth animations with GSAP
- Dark theme with cyan and purple accents
- Particle system effects

📱 **Mobile & PC Support**
- Touch controls (swipe to move)
- Keyboard controls (Arrow keys or WASD)
- Fully responsive design
- Works on all modern browsers

🎯 **Gameplay**
- Progressive difficulty (speed increases with score)
- High score tracking (saved locally)
- Smooth snake movement
- Grid-based navigation with wrapping

## Setup & Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

## Technologies Used

- **TypeScript** - Type-safe game logic
- **HTML5 Canvas** - Graphics rendering
- **Vite** - Fast build tool
- **Tailwind CSS** - UI styling
- **GSAP** - Animation library

## Controls

### Keyboard
- **Arrow Keys** or **WASD** - Move snake
- **Enter** - Start game / Restart

### Mobile
- **Swipe** - Move snake in swiped direction

## Game Rules

1. Move the snake to eat the magenta food
2. Each food eaten grows your snake and adds 10 points
3. Colliding with yourself ends the game
4. Snake wraps around the screen edges
5. Game speed increases every 100 points

## File Structure

```
src/
├── main.ts          # Game entry point
├── game.ts          # Core game logic
├── renderer.ts      # Rendering system
├── snake.ts         # Snake rendering
├── food.ts          # Food rendering
├── input.ts         # Input handling
├── styles.css       # Styling & animations
index.html           # Main HTML file
```

## Future Enhancements

- [ ] Power-ups system
- [ ] Sound effects & music
- [ ] Leaderboard system
- [ ] Different game modes
- [ ] Themes (light/dark/custom)
- [ ] Multiplayer support

## License

MIT - Feel free to use this project for learning and development!

---

**Enjoy the game! 🎮⚡**