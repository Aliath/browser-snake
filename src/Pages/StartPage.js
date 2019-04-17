import pageStore from './store';
import gameStore from '../Core/store';

export default class StartPage {
  defineElements() {
    this.containerElement = document.getElementById('start-page');
    this.startButton = document.getElementById('start-button');
  }

  handleElements() {
    this.startButton.addEventListener('click', () => {
      pageStore.set('PAGE_STATE', 'GAME_PAGE');
      gameStore.set('GAME_STATE', 'ON');
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
