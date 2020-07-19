(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var _handlers = {};
    var EventEmitter = /** @class */ (function () {
        function EventEmitter() {
        }
        EventEmitter.prototype.on = function (eventName, handler) {
            var currentHandlers = _handlers[eventName];
            var newHandlers = currentHandlers ? __spreadArrays(currentHandlers, [handler]) : [handler];
            _handlers[eventName] = newHandlers;
        };
        EventEmitter.prototype.off = function (eventName, handler) {
            _handlers[eventName] = _handlers[eventName].filter(function (item) { return item !== handler; });
        };
        EventEmitter.prototype.emit = function (eventName, payload) {
            var handlers = _handlers[eventName];
            if (!handlers)
                return;
            handlers.forEach(function (handler) { return handler(payload); });
        };
        return EventEmitter;
    }());
    var EventEmitter$1 = new EventEmitter();

    var SnakeElementDirection;
    (function (SnakeElementDirection) {
        SnakeElementDirection[SnakeElementDirection["HORIZONTAL"] = 0] = "HORIZONTAL";
        SnakeElementDirection[SnakeElementDirection["VERTICAL"] = 1] = "VERTICAL";
    })(SnakeElementDirection || (SnakeElementDirection = {}));
    var Snake = /** @class */ (function () {
        function Snake() {
            this.handleRenderEvents();
        }
        Snake.prototype.handleRenderEvents = function () {
            var _this = this;
            EventEmitter$1.on('startRender', function (_a) {
                var width = _a[0], height = _a[1];
                _this.reset([Math.floor(width / 2), Math.floor(height / 2)]);
            });
        };
        Snake.prototype.getElements = function () {
            return JSON.parse(JSON.stringify(this.elements));
        };
        Snake.prototype.reset = function (startCoordinates) {
            var anchorX = startCoordinates[0], anchorY = startCoordinates[1];
            this.elements = [
                {
                    direction: SnakeElementDirection.HORIZONTAL,
                    anchor: [anchorX, anchorY],
                    length: 1
                }
            ];
        };
        return Snake;
    }());

    var Scene;
    (function (Scene) {
        Scene[Scene["START"] = 0] = "START";
        Scene[Scene["GAME"] = 1] = "GAME";
        Scene[Scene["GAME_OVER"] = 2] = "GAME_OVER";
    })(Scene || (Scene = {}));
    var SceneManager = /** @class */ (function () {
        function SceneManager(options) {
            var wrapperSelector = options.wrapperSelector, startButtonSelector = options.startButtonSelector, playAgainButtonSelector = options.playAgainButtonSelector, defaultScene = options.defaultScene;
            this.wrapper = document.querySelector(wrapperSelector);
            this.startButton = document.querySelector(startButtonSelector);
            this.playAgainButton = document.querySelector(playAgainButtonSelector);
            this.currentScene = defaultScene;
            this.bindUIEvents();
        }
        SceneManager.prototype.bindUIEvents = function () {
            var _this = this;
            window.addEventListener('click', function (event) {
                var target = event.target;
                if ([_this.startButton, _this.playAgainButton].includes(target)) {
                    _this.changeScene(Scene.GAME);
                }
            }, false);
        };
        SceneManager.prototype.changeScene = function (nextScene) {
            this.wrapper.classList.remove("scene-" + this.currentScene);
            this.wrapper.classList.add("scene-" + nextScene);
            this.currentScene = nextScene;
            EventEmitter$1.emit('changeScene', nextScene);
        };
        return SceneManager;
    }());

    var GRID_SIZE = 16;
    var Renderer = /** @class */ (function () {
        function Renderer(options) {
            this.isRendering = false;
            var canvasSelector = options.canvasSelector, snake = options.snake, snakeColor = options.snakeColor, boardColor = options.boardColor, pointColor = options.pointColor, collisionColor = options.collisionColor;
            this.canvas = document.querySelector(canvasSelector);
            this.context = this.canvas.getContext('2d');
            this.snake = snake;
            Object.assign(this, { snakeColor: snakeColor, boardColor: boardColor, pointColor: pointColor, collisionColor: collisionColor });
            this.fitCanvasToScreen();
            this.handleSceneChange();
        }
        Renderer.prototype.startRendering = function () {
            var _a = this.canvas, width = _a.width, height = _a.height;
            var _b = [width / GRID_SIZE, height / GRID_SIZE], areaWidth = _b[0], areaHeight = _b[1];
            this.isRendering = true;
            this.startTimestamp = this.lastTimestamp = performance.now();
            EventEmitter$1.emit('startRender', [areaWidth, areaHeight]);
            requestAnimationFrame(this.render.bind(this));
        };
        Renderer.prototype.stopRendering = function () {
            this.isRendering = false;
        };
        Renderer.prototype.handleSceneChange = function () {
            var _this = this;
            EventEmitter$1.on('changeScene', function (scene) {
                if (scene === Scene.GAME) {
                    _this.startRendering();
                }
                else {
                    _this.stopRendering();
                }
            });
        };
        Renderer.prototype.fitCanvasToScreen = function () {
            var canvas = this.canvas;
            var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
            var width = innerWidth - (innerWidth % GRID_SIZE);
            var height = innerHeight - (innerHeight % GRID_SIZE);
            Object.assign(canvas, { width: width, height: height });
        };
        Renderer.prototype.getCurrentVelocity = function () {
            return 0.25; //units per second
        };
        Renderer.prototype.getTimeDelta = function (currentTimestamp) {
            var timeDelta = 0;
            if (this.lastTimestamp) {
                timeDelta = currentTimestamp - this.lastTimestamp;
            }
            this.lastTimestamp = currentTimestamp;
            return timeDelta;
        };
        Renderer.prototype.drawLine = function (startPoint, endPoint, lineWidth, lineColor, lineCap) {
            if (lineWidth === void 0) { lineWidth = GRID_SIZE; }
            if (lineCap === void 0) { lineCap = 'round'; }
            var context = this.context;
            context.lineWidth = lineWidth;
            context.lineCap = lineCap;
            if (lineColor)
                context.strokeStyle = lineColor;
            context.beginPath();
            context.moveTo.apply(context, startPoint);
            context.lineTo.apply(context, endPoint);
            context.stroke();
        };
        Renderer.prototype.renderBoard = function () {
            var _a = this, canvas = _a.canvas, context = _a.context, boardColor = _a.boardColor, collisionColor = _a.collisionColor;
            context.fillStyle = boardColor;
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = collisionColor;
            context.strokeStyle = collisionColor;
            var lineOffset = GRID_SIZE / 2;
            this.drawLine([lineOffset, lineOffset], [canvas.width - lineOffset, lineOffset]);
            this.drawLine([lineOffset, lineOffset], [lineOffset, canvas.height - lineOffset]);
            this.drawLine([lineOffset, canvas.height - lineOffset], [canvas.width - lineOffset, canvas.height - lineOffset]);
            this.drawLine([canvas.width - lineOffset, lineOffset], [canvas.width - lineOffset, canvas.height - lineOffset]);
        };
        Renderer.prototype.renderSnake = function () {
            var _this = this;
            var _a = this, snakeColor = _a.snakeColor, snake = _a.snake;
            var elements = snake.getElements();
            elements.forEach(function (element) {
                var direction = element.direction, anchor = element.anchor, length = element.length;
                var startPoint = anchor.map(function (value) { return value * GRID_SIZE; });
                var endPoint;
                if (direction === SnakeElementDirection.HORIZONTAL) {
                    endPoint = [
                        anchor[0] * GRID_SIZE + length * GRID_SIZE,
                        anchor[1] * GRID_SIZE
                    ];
                }
                else {
                    endPoint = [
                        anchor[0] * GRID_SIZE,
                        anchor[1] * GRID_SIZE + length * GRID_SIZE
                    ];
                }
                _this.drawLine(startPoint, endPoint, GRID_SIZE, snakeColor, 'round');
            });
        };
        Renderer.prototype.renderInfo = function (timeDelta) {
            var _a = this, canvas = _a.canvas, context = _a.context;
            var framesPerSecond = Math.round(1000 / timeDelta);
            context.fillStyle = 'white';
            context.textAlign = 'right';
            context.font = '20px "Lato", sans-serif';
            context.fillText("SCORE: " + 0, canvas.width - GRID_SIZE * 2, GRID_SIZE * 3);
            context.fillText("FPS: " + framesPerSecond, canvas.width - GRID_SIZE * 2, GRID_SIZE * 3 + 24);
        };
        Renderer.prototype.render = function (currentTimestamp) {
            if (!this.isRendering)
                return;
            requestAnimationFrame(this.render.bind(this));
            var timeDelta = this.getTimeDelta(currentTimestamp);
            var currentVelocity = this.getCurrentVelocity();
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.renderBoard();
            this.renderInfo(timeDelta);
            this.renderSnake();
        };
        return Renderer;
    }());

    var Game = /** @class */ (function () {
        function Game(options) {
            var canvasSelector = options.canvasSelector, wrapperSelector = options.wrapperSelector, startButtonSelector = options.startButtonSelector, playAgainButtonSelector = options.playAgainButtonSelector, boardColor = options.boardColor, snakeColor = options.snakeColor, pointColor = options.pointColor, collisionColor = options.collisionColor;
            this.snake = new Snake();
            this.renderer = new Renderer({
                canvasSelector: canvasSelector,
                pointColor: pointColor,
                boardColor: boardColor,
                snakeColor: snakeColor,
                collisionColor: collisionColor,
                snake: this.snake
            });
            this.sceneManager = new SceneManager({
                defaultScene: Scene.START,
                wrapperSelector: wrapperSelector,
                startButtonSelector: startButtonSelector,
                playAgainButtonSelector: playAgainButtonSelector
            });
        }
        return Game;
    }());

    var boardColor = '#11151b';
    var snakeColor = '#16a085';
    var pointColor = '#f1c40f';
    var collisionColor = '#c0392b';

    new Game({
        boardColor: boardColor, snakeColor: snakeColor, pointColor: pointColor, collisionColor: collisionColor,
        canvasSelector: '#game',
        wrapperSelector: '#scene-wrapper',
        startButtonSelector: '#start-game',
        playAgainButtonSelector: '#play-again',
        scoreSelector: '#result',
    });

}());
//# sourceMappingURL=index.js.map
