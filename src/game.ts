import { Renderer } from './renderer';
import { SnakeBody } from './snake';
import { Food } from './food';

export class Game {
    private canvas: HTMLCanvasElement;
    private renderer: Renderer;
    private gridSize: number = 20;
    private gameWidth: number = 0;
    private gameHeight: number = 0;
    private cols: number = 0;
    private rows: number = 0;

    // Game state
    public snake: SnakeBody[];
    public food: Food | null = null;
    public direction: { x: number; y: number } = { x: 1, y: 0 };
    public nextDirection: { x: number; y: number } = { x: 1, y: 0 };
    public score: number = 0;
    public highScore: number = 0;
    public gameOver: boolean = false;
    public gameStarted: boolean = false;
    private gameSpeed: number = 8; // frames per move
    private frameCount: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.renderer = new Renderer(canvas);
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.cols = Math.floor(this.gameWidth / this.gridSize);
        this.rows = Math.floor(this.gameHeight / this.gridSize);

        this.snake = [
            { x: Math.floor(this.cols / 2), y: Math.floor(this.rows / 2) }
        ];

        this.spawnFood();
    }

    private spawnFood() {
        let newFood: Food;
        let isOnSnake = true;

        while (isOnSnake) {
            newFood = {
                x: Math.floor(Math.random() * this.cols),
                y: Math.floor(Math.random() * this.rows)
            };

            isOnSnake = this.snake.some(segment => 
                segment.x === newFood.x && segment.y === newFood.y
            );
        }

        this.food = newFood;
    }

    public setDirection(x: number, y: number) {
        // Prevent reversing into itself
        if (this.direction.x === -x && this.direction.y === -y) {
            return;
        }
        this.nextDirection = { x, y };
    }

    public start() {
        this.gameStarted = true;
        this.gameOver = false;
    }

    public reset() {
        this.snake = [
            { x: Math.floor(this.cols / 2), y: Math.floor(this.rows / 2) }
        ];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.score = 0;
        this.gameStarted = false;
        this.gameOver = false;
        this.frameCount = 0;
        this.spawnFood();
    }

    public update() {
        if (!this.gameStarted || this.gameOver) return;

        this.frameCount++;

        if (this.frameCount % this.gameSpeed === 0) {
            this.direction = { ...this.nextDirection };

            // Calculate new head
            const head = this.snake[0];
            const newHead: SnakeBody = {
                x: (head.x + this.direction.x + this.cols) % this.cols,
                y: (head.y + this.direction.y + this.rows) % this.rows
            };

            // Check collision with self
            if (this.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                this.gameOver = true;
                return;
            }

            this.snake.unshift(newHead);

            // Check food collision
            if (this.food && newHead.x === this.food.x && newHead.y === this.food.y) {
                this.score += 10;
                if (this.score > this.highScore) {
                    this.highScore = this.score;
                }
                this.spawnFood();
                // Increase difficulty
                if (this.gameSpeed > 3 && this.score % 100 === 0) {
                    this.gameSpeed--;
                }
            } else {
                this.snake.pop();
            }
        }
    }

    public render() {
        this.renderer.clear();
        this.renderer.drawGrid(this.gridSize, this.cols, this.rows);
        this.renderer.drawSnake(this.snake, this.gridSize);
        if (this.food) {
            this.renderer.drawFood(this.food, this.gridSize);
        }
    }

    public getGridSize(): number {
        return this.gridSize;
    }
}