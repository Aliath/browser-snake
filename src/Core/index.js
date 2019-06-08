import Map from './Map';
import Snake from './Snake';
import Renderer from './Renderer';
import KeyboardManager from './KeyboardManager';
import TouchManager from './TouchManager';
import gameStore from './store';
import pageStore from '../Pages/store';
import countGridSize from '../Utils/countGridSize';


const GRID_SIZE = countGridSize();

export default class Game {
  setCanvasSize() {
    this.width = Math.floor(window.innerWidth / GRID_SIZE);
    this.height = Math.floor(window.innerHeight / GRID_SIZE);

    this.canvas.width = this.width * GRID_SIZE;
    this.canvas.height = this.height * GRID_SIZE;

    gameStore.set('GAME_SIZE', [this.width, this.height]);
  }

  setDefaultStore() {
    gameStore.set('GAME_STATE', 'OFF');
    gameStore.set('GAME_SIZE', [0, 0]);
    gameStore.set('GAME_DIRECTION', 'RIGHT');
    gameStore.set('GAME_SPEED', 250);
    gameStore.set('GAME_RESULT', 0);

  }

  handleStore() {
    gameStore.on('GAME_OVER', () => {
      gameStore.set('GAME_DIRECTION', 'RIGHT');
      gameStore.set('GAME_SPEED', 250);
      gameStore.set('GAME_STATE', 'OFF');
      pageStore.set('PAGE_STATE', 'GAMEOVER_PAGE');
    });
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

    this.handleStore();
  }
}
