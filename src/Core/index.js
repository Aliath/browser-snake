import Map from './Map';
import Snake from './Snake';
import Renderer from './Renderer';
import KeyboardManager from './KeyboardManager';
import TouchManager from './TouchManager';
import store from './store';

const GRID_SIZE = 32;

export default class Game {
  setCanvasSize() {
    this.width = Math.floor(window.innerWidth / GRID_SIZE);
    this.height = Math.floor(window.innerHeight / GRID_SIZE);

    this.canvas.width = this.width * GRID_SIZE;
    this.canvas.height = this.height * GRID_SIZE;

    store.set('GAME_SIZE', [this.width, this.height]);
  }

  setDefaultStore() {
    store.set('GAME_STATE', 'OFF');
    store.set('GAME_SIZE', [0, 0]);
    store.set('GAME_DIRECTION', 'RIGHT');
    store.set('GAME_SPEED', 250);
  }

  constructor(canvas) {
    this.width = 0;
    this.height = 0;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.setDefaultStore();
    this.setCanvasSize();

    this.keyboardManager = new KeyboardManager();
    this.touchManager = new TouchManager(canvas);

    this.map = new Map(this.width, this.height);
    this.snake = new Snake(this.map);
    this.renderer = new Renderer(this.context, this.map, this.snake);
  }
}
