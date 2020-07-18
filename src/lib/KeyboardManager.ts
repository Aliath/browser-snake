import EventEmitter from './EventEmitter';

const DEFINED_DIRECTIONS = {
    'UP': ['KeyW', 'ArrowUp'],
    'DOWN': ['KeyS', 'ArrowDown'],
    'LEFT': ['KeyD', 'ArrowLeft'],
    'RIGHT': ['KeyA', 'ArrowRight'],
};
const listenedKeys = Object.values(DEFINED_DIRECTIONS).reduce((a, b) => [...a, ...b]);

export class KeyboardManager {
    constructor() {
        this.bindKeyboardEvents();
    }

    private bindKeyboardEvents(): void {
        window.addEventListener('keydown', (event) => {
            if (!listenedKeys.includes(event.code)) return;

            const [direction] = Object.entries(DEFINED_DIRECTIONS).find(([, values]) => {
                return values.includes(event.code);
            });

            EventEmitter.emit('changeGameDirection', direction);
        }, false);
    }
}