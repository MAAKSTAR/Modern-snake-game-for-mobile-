import { Game } from './game';

export class InputHandler {
    private game: Game;
    private touchStartX: number = 0;
    private touchStartY: number = 0;

    constructor(game: Game) {
        this.game = game;
        this.setupKeyboardInput();
        this.setupTouchInput();
    }

    private setupKeyboardInput() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    e.preventDefault();
                    this.game.setDirection(0, -1);
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    e.preventDefault();
                    this.game.setDirection(0, 1);
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    e.preventDefault();
                    this.game.setDirection(-1, 0);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    e.preventDefault();
                    this.game.setDirection(1, 0);
                    break;
            }
        });
    }

    private setupTouchInput() {
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) return;

        canvas.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this.touchStartX = touch.clientX;
            this.touchStartY = touch.clientY;
        });

        canvas.addEventListener('touchend', (e) => {
            const touch = e.changedTouches[0];
            const touchEndX = touch.clientX;
            const touchEndY = touch.clientY;

            const deltaX = touchEndX - this.touchStartX;
            const deltaY = touchEndY - this.touchStartY;

            const minSwipeDistance = 30;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (deltaX > minSwipeDistance) {
                    this.game.setDirection(1, 0); // Right
                } else if (deltaX < -minSwipeDistance) {
                    this.game.setDirection(-1, 0); // Left
                }
            } else {
                // Vertical swipe
                if (deltaY > minSwipeDistance) {
                    this.game.setDirection(0, 1); // Down
                } else if (deltaY < -minSwipeDistance) {
                    this.game.setDirection(0, -1); // Up
                }
            }
        });
    }
}
