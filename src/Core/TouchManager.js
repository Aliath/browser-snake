export default class TouchManager {
  handleTouch(deltaX, deltaY) {
    const deltaOfDelta = Math.abs(deltaX) - Math.abs(deltaY);

    if (deltaOfDelta === 0) return; //just a click

    const dominantDirection = deltaOfDelta > 0 ? 'H' : 'V';
    const dominantValue = [deltaX, deltaY].reduce(a, b => Math.abs(a) > Math.abs(b) ? a : b) > 0;

    let direction;

    if (dominantDirection === 'H') {
      if (dominantValue > 0) direction = 'RIGHT';
      else direction = 'LEFT';
    } else {
      if (dominantValue > 0) direction = 'DOWN';
      else direction = 'UP';
    }

    store.set('GAME_DIRECTION', direction);
  }

  handleTouchStart() {
    element.addEventListener('touchstart', event => {
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
    }, false);
  }

  handleTouchEnd() {
    element.addEventListener('touchend', event => {
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;

      const deltaX = endX - startX;
      const deltaY = endY - startY;

      this.handleTouch(deltaX, deltaY);
    }, false);
  }

  handleTouchEvents() {
    this.handleTouchStart();
    this.handleTouchEnd();
  }


  constructor(element) {
    this.element = element;
    this.startX = 0;
    this.startY = 0;

    this.handleTouchEvents();
  }
}
