import store from './store';

export default class Map {
  setCollision(x, y) {
    this.collisions[y * this.width + x] = 1;
  }

  removeCollision(x, y) {
    this.collisions[y * this.width + x] = 0;
  }

  checkCollision(x, y) {
    return this.collisions[y * this.width + x] === 1;
  }

  getCollisions() {
    return [...this.collisions];
  }

  setDefaultCols() {
    const newCollisions = this.collisions.map((value, index) => {
      const x = index % this.width;
      const y = (index - x) / this.width;

      if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
        return 1;
      }

      return 0;
    });

    this.collisions = newCollisions;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.collisions = new Array(this.width * this.height).fill(0);
  }


  constructor() {
    this.setSize.apply(this, store.get('GAME_SIZE'));
    this.setDefaultCols();
  }
}
