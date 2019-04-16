const GRID_SIZE = 32;

export default class Game {
  setCanvasSize() {
    this.width = Math.floor(window.innerWidth / GRID_SIZE);
    this.height = Math.floor(window.innerHeight / GRID_SIZE);

    this.canvas.width = this.width * GRID_SIZE;
    this.canvas.height = this.height * GRID_SIZE;
  }

  constructor(canvas) {
    this.width = 0;
    this.height = 0;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.setCanvasSize();
  }
}
