export default class Point {
  hasReachedPosition(x, y) {
    return this.x === x && this.y === 0;
  }

  getAvailablePositions() {
    const mapCollisions = this.map.getCollisions();
    const availablePositions = mapCollisions.map(value => value === 1 ? 0 : 1);

    this.snake.getElements().forEach(value => {
      const [x, y] = value;

      availablePositions[y * this.map.width + x] = 0;
    });

    return availablePositions.map((value, index) => {
      const x = index % this.map.width;
      const y = (index - x) / this.map.width;

      return [value, x, y];
    }).filter((value, index) => value[0] === 1);
  }

  setNewPosition() {
    const availablePositions = this.getAvailablePositions();

    const randomedIndex = Math.round(Math.random() * availablePositions.length);
    const randomedValue = availablePositions[randomedIndex];

    const [, x, y] = randomedValue;

    Object.assign(this, { x, y });
  }

  getPosition() {
    return [this.x, this.y];
  }


  constructor(map, snake) {
    this.map = map;
    this.snake = snake;

    this.setNewPosition();
  }
}
