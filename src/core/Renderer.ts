export interface RendererOptions {
    canvasSelector: string;
    pointColor: string;
    boardColor: string;
    snakeColor: string;
}

export class Renderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    snakeColor: string;
    boardColor: string;
    pointColor: string;
    isRendering: boolean = false;
    startTimestamp: number;
    lastTimestamp: number | null;

    constructor(options: RendererOptions) {
        const { canvasSelector } = options;

        this.canvas = document.querySelector(canvasSelector);
        this.context = this.canvas.getContext('2d');

        this.fitCanvasToScreen();
    }

    private fitCanvasToScreen(): void {
        const { canvas, snakeColor, boardColor, pointColor } = this;
        const { innerWidth: width, innerHeight: height } = window;

        Object.assign(this, { snakeColor, boardColor, pointColor });
        Object.assign(canvas, { width, height });
    }

    private getTimeDelta(currentTimestamp: number): number {
        let timeDelta = 0;
        if (this.lastTimestamp) {
            timeDelta = currentTimestamp - this.lastTimestamp;
        }

        this.lastTimestamp = currentTimestamp;
        return timeDelta;
    }

    private renderBoard(): void {
        const { canvas, context, boardColor } = this;

        context.fillStyle = boardColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    private render(currentTimestamp: number): void {
        if (!this.isRendering) return;
        requestAnimationFrame(this.render);

        const timeDelta = this.getTimeDelta(currentTimestamp);
        
        this.renderBoard();
    }
}