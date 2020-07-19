import { Game } from './core/Game';
import { snakeColor, boardColor, pointColor } from './utils/colors';

new Game({
    boardColor, snakeColor, pointColor,

    canvasSelector: '#game',
    wrapperSelector: '#scene-wrapper',
    startButtonSelector: '#start-game',
    playAgainButtonSelector: '#play-again',
    scoreSelector: '#result',
});