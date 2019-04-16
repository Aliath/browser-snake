import store from './store';

export default class GamePage {
  defineElements() {
    this.containerElement = document.getElementById('game-page');
    this.button = document.getElementById('game-button');

    //this.canvasElement = document.getElementById('GAME');
  }

  handleElements() {
    this.button.addEventListener('click', () => {
      store.set('PAGE_STATE', 'GAMEOVER_PAGE');
    }, false);
  }

  hide() {
    this.containerElement.classList.add('article--hidden');
  }

  show() {
    this.containerElement.classList.remove('article--hidden');
  }


  constructor() {
    this.defineElements();
    this.handleElements();
  }
}
