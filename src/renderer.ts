import { SnakeRenderer } from './snake';
import { FoodRenderer } from './food';
import type { SnakeBody } from './snake';
import type { Food } from './food';

export class Renderer {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.setupContext();
    }

    private setupContext() {
        this.ctx.imageSmoothingEnabled = false;
    }

    public clear() {
        // Dark background with gradient
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#0a0e27');
        gradient.addColorStop(1, '#1a0a2e');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public drawGrid(gridSize: number, cols: number, rows: number) {
        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
        this.ctx.lineWidth = 0.5;

        // Draw vertical lines
        for (let i = 0; i <= cols; i++) {
            const x = i * gridSize;
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        // Draw horizontal lines
        for (let i = 0; i <= rows; i++) {
            const y = i * gridSize;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    public drawSnake(snake: SnakeBody[], gridSize: number) {
        snake.forEach((segment, index) => {
            const x = segment.x * gridSize;
            const y = segment.y * gridSize;
            const isHead = index === 0;
            SnakeRenderer.drawSegment(this.ctx, x, y, gridSize, isHead);
        });
    }

    public drawFood(food: Food, gridSize: number) {
        const x = food.x * gridSize;
        const y = food.y * gridSize;
        FoodRenderer.drawFood(this.ctx, x, y, gridSize);
    }
}