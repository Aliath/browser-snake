import EventEmitter from '../lib/EventEmitter';

export interface SceneOptions {
    wrapperSelector: string;
    startButtonSelector: string;
    playAgainButtonSelector: string;
    defaultScene: Scene;
}

export enum Scene {
    START,
    GAME,
    GAME_OVER,
};

export class SceneManager {
    private wrapper: HTMLElement;
    private startButton: HTMLElement;
    private playAgainButton: HTMLElement;
    private currentScene: Scene;

    constructor(options: SceneOptions) {
        const { wrapperSelector, startButtonSelector, playAgainButtonSelector, defaultScene } = options;

        this.wrapper = document.querySelector(wrapperSelector);
        this.startButton = document.querySelector(startButtonSelector);
        this.playAgainButton = document.querySelector(playAgainButtonSelector);
        this.currentScene = defaultScene;

        this.bindUIEvents();
    }

    private bindUIEvents(): void {
        window.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;

            if ([this.startButton, this.playAgainButton].includes(target)) {
                this.changeScene(Scene.GAME);
            }
        }, false);
    }

    public changeScene(nextScene: Scene): void {
        this.wrapper.classList.remove(`scene-${this.currentScene}`);
        this.wrapper.classList.add(`scene-${nextScene}`);
        this.currentScene = nextScene;

        EventEmitter.emit('changeScene', nextScene);
    }
}