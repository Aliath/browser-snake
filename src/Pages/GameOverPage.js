import pageStore from './store';
import gameStore from '../Core/store';

export default class GameOverPage {
  defineElements() {
    this.containerElement = document.getElementById('gameover-page');
    this.resultElement = document.getElementById('gameover-result');
    this.buttonElement = document.getElementById('gameover-button');
  }

  handleElements() {
    this.buttonElement.addEventListener('click', () => {
      pageStore.set('PAGE_STATE', 'GAME_PAGE');
      gameStore.set('GAME_STATE', 'ON');
      gameStore.set('GAME_STARTTIME', Date.now());
    }, false);
  }

  bindResultHandler() {
    pageStore.subscribe(() => {
      const value = gameStore.get('GAME_RESULT');

      this.resultElement.textContent = value + ' pkt';
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
