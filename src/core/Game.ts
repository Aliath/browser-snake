import { Renderer } from './Renderer';
import { SceneManager, Scene } from './SceneManager';
import { Snake } from './Snake';

export interface GameOptions {
    canvasSelector: string
    wrapperSelector: string;
    startButtonSelector: string;
    playAgainButtonSelector: string;
    scoreSelector: string;
    boardColor: string;
    snakeColor: string;
    pointColor: string;
}

export class Game {
    renderer: Renderer;
    sceneManager: SceneManager;
    snake: Snake;
    currentPoint: [number, number];

    constructor(options: GameOptions) {
        const {
            canvasSelector, wrapperSelector, startButtonSelector,
            playAgainButtonSelector, boardColor, snakeColor, pointColor
        } = options;

        this.snake = new Snake();
        this.renderer = new Renderer({ canvasSelector, pointColor, boardColor, snakeColor });
        this.sceneManager = new SceneManager({
            defaultScene: Scene.START,
            wrapperSelector,
            startButtonSelector,
            playAgainButtonSelector
        });
    }
}