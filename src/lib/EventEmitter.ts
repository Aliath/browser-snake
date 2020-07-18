type Handler = (payload?: any) => any;
const _handlers: Record<string, Handler[]> = {};

class EventEmitter {
    on(eventName: string, handler: Handler) {
        const currentHandlers = _handlers[eventName];
        const newHandlers = currentHandlers ? [...currentHandlers, handler] : [handler];

        _handlers[eventName] = newHandlers;
    }

    off(eventName: string, handler: Handler) {
        _handlers[eventName] = _handlers[eventName].filter(item => item !== handler);
    }

    emit(eventName: string, payload: any) {
        const handlers = _handlers[eventName];
        if (!handlers) return;
        
        handlers.forEach(handler => handler(payload));
    }
}

export default new EventEmitter();