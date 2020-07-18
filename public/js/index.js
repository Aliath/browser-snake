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

    var DEFINED_DIRECTIONS = {
        'UP': ['KeyW', 'ArrowUp'],
        'DOWN': ['KeyS', 'ArrowDown'],
        'LEFT': ['KeyD', 'ArrowLeft'],
        'RIGHT': ['KeyA', 'ArrowRight'],
    };
    var listenedKeys = Object.values(DEFINED_DIRECTIONS).reduce(function (a, b) { return __spreadArrays(a, b); });
    var KeyboardManager = /** @class */ (function () {
        function KeyboardManager() {
            this.bindKeyboardEvents();
        }
        KeyboardManager.prototype.bindKeyboardEvents = function () {
            window.addEventListener('keydown', function (event) {
                if (!listenedKeys.includes(event.code))
                    return;
                var direction = Object.entries(DEFINED_DIRECTIONS).find(function (_a) {
                    var values = _a[1];
                    return values.includes(event.code);
                })[0];
                EventEmitter$1.emit('changeGameDirection', direction);
            }, false);
        };
        return KeyboardManager;
    }());

    var km = new KeyboardManager();

}());
//# sourceMappingURL=index.js.map