import Point from './Point';
import store from './store';

const countDeltas = direction => {
  switch (direction) {
    case 'UP':
      return [0, -1];
    case 'LEFT':
      return [-1, 0];
    case 'RIGHT':
      return [1, 0];
    case 'DOWN':
      return [0, 1];
  }
};

const getOpposedDirection = direction => {
  switch (direction) {
    case 'UP':
      return 'DOWN';
    case 'LEFT':
      return 'RIGHT';
    case 'RIGHT':
      return 'LEFT';
    case 'DOWN':
      return 'UP';
  }
};

export default class Snake {
  setDirection(direction) {
    this.direction = direction;
  }

  updateGameSpeed() {
    const playedTime = (Date.now() - store.get('GAME_STARTTIME')) / 1000;
    const minutesPlayed = playedTime / 60;
    const newSpeed = 2/(minutesPlayed + 2) * 250;

    store.set('GAME_SPEED', newSpeed);
  }

  move() {
    this.updateGameSpeed();
    setTimeout(this.move.bind(this), store.get('GAME_SPEED'));
    if (store.get('GAME_STATE') === 'OFF') return;

    const deltas = countDeltas(this.direction);
    if (this.checkIsOnPoint(deltas)) {
      store.set('GAME_RESULT', store.get('GAME_RESULT') + 1);
      return;
    }

    const newPosition = this.body[0].map((value, index) => value += deltas[index]);
    const bodyCopy = [...this.body].map(value => [...value]);

    bodyCopy.unshift(newPosition);

    this.body = bodyCopy.map((element, index, array) => {
      if (index === 0) return element;
      const previousElement = array[index - 1];
      const newElement = [...previousElement];

      return newElement;
    });

    this.body.shift();

    this.checkIsOnCollision();
    this.checkHasEatenItself();
  }

  checkHasEatenItself() {
    const [x, y] = this.body[0];
    let result = false;

    this.body.slice(1).forEach(element => {
      if (element[0] === x && element[1] === y) result = true;
    });

    if (result) store.emitEvent('GAME_OVER');
  }

  checkIsOnCollision() {
    const [x, y] = this.body[0];
    if (this.map.checkCollision(x, y)) store.emitEvent('GAME_OVER');
  }

  checkIsOnPoint(deltas) {
    const firstElement = this.body[0];
    const newPosition = [firstElement[0] + deltas[0], firstElement[1] + deltas[1]];

    const pointPosition = this.point.getPosition();
    if (pointPosition[0] !== newPosition[0] || pointPosition[1] !== newPosition[1]) return false;

    this.body.unshift(newPosition);
    this.point.setNewPosition();
    return true;
  }

  getElements() {
    return this.body.map(element => [...element]);
  }

  addElement() {
    const lastElement = this.body[this.body.length - 1];
    const newElement = [...lastElement];

    const deltas = countDeltas(this.direction);
    newElement[0] += deltas[0];
    newElement[1] += deltas[1];

    this.body.push(lastElement);
  }

  createBody() {
    const x = Math.round(this.map.width / 2);
    const y = Math.round(this.map.height / 2);

    this.body.push([x, y]);
  }

  reset() {
    this.body = [];
    this.createBody();
  }

  handleStore() {
    store.subscribe(() => {
      this.direction = store.get('GAME_DIRECTION');
      this.speed = store.get('GAME_SPEED');
    });

    store.on('GAME_OVER', this.reset.bind(this));
  }


  constructor(map) {
    this.map = map;
    this.direction = 'RIGHT';
    this.body = [];

    this.point = new Point(map, this);

    this.createBody();
    this.handleStore();

    setTimeout(this.move.bind(this), store.get('GAME_SPEED'));
  }
}


/*
  [[x3, y3], [x2, y2], [x1, y1], [x, y]]
*/
