import store from '../store';

export default class GamePage {
  defineElements() {
    this.containerElement = document.getElementById('game-page');
  }

  hide() {
    this.containerElement.classList.add('article--hidden');
  }

  show() {
    this.containerElement.classList.remove('article--hidden');
  }


  constructor() {
    this.defineElements();
  }
}
