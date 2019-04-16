import store from './store';

export default class GameOverPage {
  defineElements() {
    this.containerElement = document.getElementById('gameover-page');
    this.button = document.getElementById('gameover-button');

  }

  handleElements() {
    this.button.addEventListener('click', () => {
      store.set('PAGE_STATE', 'START_PAGE');
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
