import { Game } from './core/Game';
import { snakeColor, boardColor, pointColor, collisionColor } from './utils/colors';

new Game({
    boardColor, snakeColor, pointColor, collisionColor,

    canvasSelector: '#game',
    wrapperSelector: '#scene-wrapper',
    startButtonSelector: '#start-game',
    playAgainButtonSelector: '#play-again',
    scoreSelector: '#result',
});