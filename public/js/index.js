(function () {
    'use strict';

    var Renderer = /** @class */ (function () {
        function Renderer(options) {
            this.isRendering = false;
            var canvasSelector = options.canvasSelector;
            this.canvas = document.querySelector(canvasSelector);
            this.context = this.canvas.getContext('2d');
            this.fitCanvasToScreen();
        }
        Renderer.prototype.fitCanvasToScreen = function () {
            var canvas = this.canvas;
            var width = window.innerWidth, height = window.innerHeight;
            Object.assign(canvas, { width: width, height: height });
        };
        Renderer.prototype.getTimeDelta = function (currentTimestamp) {
            var timeDelta = 0;
            if (this.lastTimestamp) {
                timeDelta = currentTimestamp - this.lastTimestamp;
            }
            this.lastTimestamp = currentTimestamp;
            return timeDelta;
        };
        Renderer.prototype.renderBoard = function () {
            var _a = this, canvas = _a.canvas, context = _a.context;
            context.fillStyle =
                context.fillRect(0, 0, canvas.width, canvas.height);
        };
        Renderer.prototype.render = function (currentTimestamp) {
            if (!this.isRendering)
                return;
            requestAnimationFrame(this.render);
            var timeDelta = this.getTimeDelta(currentTimestamp);
            this.renderBoard();
        };
        return Renderer;
    }());

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

    var Snake = /** @class */ (function () {
        function Snake() {
        }
        return Snake;
    }());

    var Game = /** @class */ (function () {
        function Game(options) {
            var canvasSelector = options.canvasSelector, wrapperSelector = options.wrapperSelector, startButtonSelector = options.startButtonSelector, playAgainButtonSelector = options.playAgainButtonSelector, scoreSelector = options.scoreSelector, boardColor = options.boardColor, snakeColor = options.snakeColor, pointColor = options.pointColor;
            this.snake = new Snake();
            // this.board = new Board();
            this.renderer = new Renderer({ canvasSelector: canvasSelector, pointColor: pointColor, boardColor: boardColor, snakeColor: snakeColor });
            this.sceneManager = new SceneManager({
                defaultScene: Scene.START,
                wrapperSelector: wrapperSelector,
                startButtonSelector: startButtonSelector,
                playAgainButtonSelector: playAgainButtonSelector
            });
        }
        return Game;
    }());

    new Game({
        canvasSelector: '#game',
        wrapperSelector: '#scene-wrapper',
        startButtonSelector: '#start-game',
        playAgainButtonSelector: '#play-again',
        scoreSelector: '#result',
        boardColor: 'rgba(0, 0, 0, .5)',
        snakeColor: 'lime',
        pointColor: 'purple'
    });

}());
//# sourceMappingURL=index.js.map
