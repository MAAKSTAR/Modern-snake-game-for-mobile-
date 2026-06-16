import { Game } from './game';
import { InputHandler } from './input';

// Initialize game
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const game = new Game(canvas);
const inputHandler = new InputHandler(game);

// UI Elements
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const finalScore = document.getElementById('finalScore');

// Load high score from localStorage
const savedHighScore = localStorage.getItem('snakeHighScore');
if (savedHighScore) {
    game.highScore = parseInt(savedHighScore);
    if (highScoreDisplay) highScoreDisplay.textContent = game.highScore.toString();
}

// Event Listeners
startBtn?.addEventListener('click', () => {
    startScreen!.classList.add('hidden');
    game.start();
    gameLoop();
});

restartBtn?.addEventListener('click', () => {
    gameOverScreen!.classList.add('hidden');
    game.reset();
    game.start();
    gameLoop();
});

// Game Loop
function gameLoop() {
    game.update();
    game.render();

    if (scoreDisplay) scoreDisplay.textContent = game.score.toString();
    if (highScoreDisplay) highScoreDisplay.textContent = game.highScore.toString();

    if (game.gameOver) {
        if (finalScore) finalScore.textContent = game.score.toString();
        gameOverScreen!.classList.remove('hidden');
        // Save high score
        localStorage.setItem('snakeHighScore', game.highScore.toString());
        return;
    }

    requestAnimationFrame(gameLoop);
}

// Canvas sizing
function resizeCanvas() {
    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);