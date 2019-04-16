import store from '../store';

export default class GameOverPage {
  defineElements() {
    this.containerElement = document.getElementById('gameover-page');
    this.resultElement = document.getElementById('gameover-result');
    this.buttonElement = document.getElementById('gameover-button');
  }

  handleElements() {
    this.buttonElement.addEventListener('click', () => {
      store.set('PAGE_STATE', 'GAME_PAGE');
    }, false);
  }

  bindResultHandler() {
    store.subscribe(() => {
      const value = store.get('value');

      this.resultElement.textContent = value;
    });
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
    this.bindResultHandler();
  }
}
