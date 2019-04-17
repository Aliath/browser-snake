import store from './store';

const KEYBOARD_DIRECTIONS = {
  UP: ['KeyW', 'ArrowUp'],
  LEFT: ['KeyA', 'ArrowLeft'],
  RIGHT: ['KeyD', 'ArrowRight'],
  DOWN: ['KeyS', 'ArrowDown']
};

export default class KeyboardManager {
  handleKeyEvents() {
    addEventListener('keydown', event => {
      Object.keys(KEYBOARD_DIRECTIONS).forEach(direction => {
        const keyCodes = KEYBOARD_DIRECTIONS[direction];

        if (keyCodes.indexOf(event.code) > -1) store.set('GAME_DIRECTION', direction);
      });
    }, false);
  }


  constructor() {
    this.handleKeyEvents();
  }
}
