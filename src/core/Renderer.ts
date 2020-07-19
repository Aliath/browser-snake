import { Snake, SnakeElementDirection } from "./Snake";
import { Scene } from './SceneManager';
import EventEmitter from '../lib/EventEmitter';

export interface RendererOptions {
    canvasSelector: string;
    pointColor: string;
    boardColor: string;
    snakeColor: string;
    collisionColor: string;
    snake: Snake;
}

const GRID_SIZE = 16;

export class Renderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    snakeColor: string;
    boardColor: string;
    pointColor: string;
    collisionColor: string;
    isRendering: boolean = false;
    startTimestamp: number;
    lastTimestamp: number | null;
    snake: Snake;

    constructor(options: RendererOptions) {
        const { canvasSelector, snake, snakeColor, boardColor, pointColor, collisionColor } = options;

        this.canvas = document.querySelector(canvasSelector);
        this.context = this.canvas.getContext('2d');
        this.snake = snake;
        Object.assign(this, { snakeColor, boardColor, pointColor, collisionColor });


        this.fitCanvasToScreen();
        this.handleSceneChange();
    }

    private startRendering(): void {
        const { width, height } = this.canvas;
        const [ areaWidth, areaHeight ] = [width / GRID_SIZE, height / GRID_SIZE];

        this.isRendering = true;
        this.startTimestamp = this.lastTimestamp = performance.now();
        EventEmitter.emit('startRender', [areaWidth, areaHeight]);

        requestAnimationFrame(this.render.bind(this));
    }

    private stopRendering(): void {
        this.isRendering = false;
    }

    private handleSceneChange(): void {
        EventEmitter.on('changeScene', (scene: Scene) => {
            if (scene === Scene.GAME) {
                this.startRendering();
            } else {
                this.stopRendering();
            }
        });
    }

    private fitCanvasToScreen(): void {
        const { canvas } = this;
        const { innerWidth, innerHeight } = window;

        const width = innerWidth - (innerWidth % GRID_SIZE);
        const height = innerHeight - (innerHeight % GRID_SIZE);

        Object.assign(canvas, { width, height });
    }

    private getCurrentVelocity(): number {
        return 0.25; //units per second
    }

    private getTimeDelta(currentTimestamp: number): number {
        let timeDelta = 0;
        if (this.lastTimestamp) {
            timeDelta = currentTimestamp - this.lastTimestamp;
        }

        this.lastTimestamp = currentTimestamp;
        return timeDelta;
    }

    private drawLine(startPoint: [number, number], endPoint: [number, number], lineWidth: number = GRID_SIZE, lineColor?: string, lineCap: CanvasLineCap = 'round') {
        const { context } = this;

        context.lineWidth = lineWidth;
        context.lineCap = lineCap;
        if (lineColor) context.strokeStyle = lineColor;

        context.beginPath();
        context.moveTo(...startPoint);
        context.lineTo(...endPoint);
        context.stroke();
    }

    private renderBoard(): void {
        const { canvas, context, boardColor, collisionColor } = this;

        context.fillStyle = boardColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = collisionColor;

        context.strokeStyle = collisionColor;
        const lineOffset = GRID_SIZE / 2
        this.drawLine([lineOffset, lineOffset], [canvas.width - lineOffset, lineOffset]);
        this.drawLine([lineOffset, lineOffset], [lineOffset, canvas.height - lineOffset]);
        this.drawLine([lineOffset, canvas.height - lineOffset], [canvas.width - lineOffset, canvas.height - lineOffset]);
        this.drawLine([canvas.width - lineOffset, lineOffset], [canvas.width - lineOffset, canvas.height - lineOffset]);
    }

    private renderSnake(): void {
        const { snakeColor, snake } = this;

        const elements = snake.getElements();
        elements.forEach(element => {
            const { direction, anchor, length } = element;

            const startPoint = anchor.map(value => value * GRID_SIZE) as [number, number];
            let endPoint: [number, number];

            if (direction === SnakeElementDirection.HORIZONTAL) {
                endPoint = [
                    anchor[0] * GRID_SIZE + length * GRID_SIZE,
                    anchor[1] * GRID_SIZE
                ];
            } else {
                endPoint = [
                    anchor[0] * GRID_SIZE,
                    anchor[1] * GRID_SIZE + length * GRID_SIZE
                ];
            }


            this.drawLine(startPoint, endPoint, GRID_SIZE, snakeColor, 'round');
        });
    }

    private renderInfo(timeDelta: number): void {
        const { canvas, context } = this;
        const framesPerSecond = Math.round(1000 / timeDelta);

        context.fillStyle = 'white';
        context.textAlign = 'right';

        context.font = '20px "Lato", sans-serif';
        context.fillText(`SCORE: ${0}`, canvas.width - GRID_SIZE * 2, GRID_SIZE * 3);
        context.fillText(`FPS: ${framesPerSecond}`, canvas.width - GRID_SIZE * 2, GRID_SIZE * 3 + 24);
    }

    private render(currentTimestamp: number): void {
        if (!this.isRendering) return;
        requestAnimationFrame(this.render.bind(this));

        const timeDelta = this.getTimeDelta(currentTimestamp);
        const currentVelocity = this.getCurrentVelocity();
        const unitsToMove = timeDelta * currentVelocity;
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.renderBoard();
        this.renderInfo(timeDelta);
        this.renderSnake();
    }
}