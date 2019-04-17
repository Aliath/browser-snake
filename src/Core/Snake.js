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

  move() {
    setTimeout(this.move.bind(this), store.get('GAME_SPEED'));
    if (store.get('GAME_STATE') === 'OFF') return;

    const deltas = countDeltas(this.direction);

    this.body = this.body.map(element => {
      const copiedElement = [...element];

      copiedElement[0] += deltas[0];
      copiedElement[1] += deltas[1];

      return copiedElement;
    });

    this.checkIsOnCollision();
  }

  checkIsOnCollision() {
    this.body.forEach(([x, y]) => {
      if (this.map.checkCollision(x, y)) store.emitEvent('GAME_OVER');
    });
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
    this.direction = 'RIGHT';
    this.map = map;
    this.body = [];

    this.createBody();
    this.handleStore();

    setTimeout(this.move.bind(this), store.get('GAME_SPEED'));
  }
}


/*
  [[x3, y3], [x2, y2], [x1, y1], [x, y]]
*/
