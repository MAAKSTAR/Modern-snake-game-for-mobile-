export interface SnakeBody {
    x: number;
    y: number;
}

export class SnakeRenderer {
    static drawSegment(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        gridSize: number,
        isHead: boolean = false
    ) {
        const padding = 2;
        const size = gridSize - padding;

        // Draw neon glow
        if (isHead) {
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 20;
        } else {
            ctx.shadowColor = '#00d4ff';
            ctx.shadowBlur = 15;
        }

        ctx.fillStyle = isHead ? '#00ff88' : '#00d4ff';
        ctx.fillRect(x + padding / 2, y + padding / 2, size, size);

        // Draw border
        ctx.strokeStyle = isHead ? '#ffffff' : '#00ffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + padding / 2, y + padding / 2, size, size);

        ctx.shadowColor = 'transparent';
    }
}