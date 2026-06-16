export interface Food {
    x: number;
    y: number;
}

export class FoodRenderer {
    static drawFood(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        gridSize: number
    ) {
        const padding = 3;
        const size = gridSize - padding;
        const centerX = x + gridSize / 2;
        const centerY = y + gridSize / 2;
        const radius = (gridSize - padding) / 2;

        // Draw neon glow
        ctx.shadowColor = '#ff00ff';
        ctx.shadowBlur = 25;

        // Draw circle
        ctx.fillStyle = '#ff00ff';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw border
        ctx.strokeStyle = '#ff88ff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw inner glow
        ctx.fillStyle = 'rgba(255, 0, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = 'transparent';
    }
}