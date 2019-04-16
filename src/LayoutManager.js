import StartPage from './Pages/StartPage.js';
import GamePage from './Pages/GamePage.js';
import GameOverPage from './Pages/GameOverPage.js';
import store from './store';


const START_PAGE = 'START_PAGE';
const GAME_PAGE = 'GAME_PAGE';
const GAMEOVER_PAGE = 'GAMEOVER_PAGE';

export default class LayoutManager {
  hideAllPages() {
    this.startPage.hide();
    this.gamePage.hide();
    this.gameOverPage.hide();
  }

  bindPageHandler() {
    store.subscribe(() => {
      this.currentState = store.get('PAGE_STATE');
      this.renderPage();
    });
  }

  createPages() {
    this.startPage = new StartPage();
    this.gamePage = new GamePage();
    this.gameOverPage = new GameOverPage();
  }

  renderPage() {
    this.hideAllPages();

    switch (this.currentState) {
      case START_PAGE:
        this.startPage.show();
        break;
      case GAME_PAGE:
        this.gamePage.show();
        break;
      case GAMEOVER_PAGE:
        this.gameOverPage.show();
        break;
    }
  }

  setState(state) {
    this.currentState = state;

    this.renderPage();
  }

  constructor() {
    this.bindPageHandler();
    this.createPages();

    this.currentState = START_PAGE;
    this.renderPage();
  }
}