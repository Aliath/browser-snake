import store from '../store';

export default class StartPage {
  defineElements() {
    this.containerElement = document.getElementById('start-page');
    this.startButton = document.getElementById('start-button');
  }

  handleElements() {
    this.startButton.addEventListener('click', () => {
      store.set('PAGE_STATE', 'GAME_PAGE');
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
