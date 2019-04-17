import store from './store';

const BACKGROUND_COLOR = '#181818';
const SNAKE_COLOR = '#00b894';
const COLLISION_COLOR = 'darkred';
const POINT_COLOR = '#a29bfe';
const GRID_SIZE = 32;

export default class Renderer {
  render() {
    if (!this.isRendering) return;


    requestAnimationFrame(this.render.bind(this));

    const context = this.canvasContext;
    const snakeElements = this.snake.getElements();
    const mapCollisions = this.map.collisions;

    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, this.map.width * GRID_SIZE, this.map.height * GRID_SIZE);

    context.fillStyle = SNAKE_COLOR;
    snakeElements.forEach(element => {
      context.fillRect(element[0] * GRID_SIZE, element[1] * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });

    context.fillStyle = COLLISION_COLOR;
    mapCollisions.map((value, index) => {
      const x = index % this.map.width;
      const y = (index - x) / this.map.width;

      return [value, x, y];
    }).filter(value => value[0] === 1).forEach((value, index) => {
      const [, x, y] = value;

      context.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });
  }

  startRender() {
    if (this.isRendering) return;

    this.isRendering = true;

    requestAnimationFrame(this.render.bind(this));
  }

  stopRender() {
    this.isRendering = false;
  }

  handleStore() {
    store.subscribe(() => {
      const gameState = store.get('GAME_STATE');

      if (gameState === 'OFF') this.stopRender();
      else this.startRender();
    })
  }

  constructor(canvasContext, map, snake) {
    Object.assign(this, { canvasContext, map, snake });

    this.isRendering = store.get('GAME_STATE') === 'ON';
    this.handleStore();
  }
}
