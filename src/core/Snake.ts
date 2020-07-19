import EventEmitter from "../lib/EventEmitter";

export enum SnakeElementDirection {
    HORIZONTAL,
    VERTICAL
};

export interface SnakeElement {
    direction: SnakeElementDirection;
    anchor: [number, number];
    length: number;
}

export class Snake {
    elements: SnakeElement[];

    constructor() {
        this.handleRenderEvents();
    }

    private handleRenderEvents(): void {
        EventEmitter.on('startRender', ([width, height]: number[]) => {
            this.reset([Math.floor(width / 2), Math.floor(height / 2)]);
        });
    }

    public getElements(): SnakeElement[] {
        return JSON.parse(JSON.stringify(this.elements)) as SnakeElement[];
    }

    public reset(startCoordinates: [number, number]): void {
        const [anchorX, anchorY] = startCoordinates;

        this.elements = [
            {
                direction: SnakeElementDirection.HORIZONTAL,
                anchor: [anchorX, anchorY],
                length: 1
            }
        ];
    }
}

[
    { direction: 'horizontal', anchor: [0, 0], length: 0 }
]