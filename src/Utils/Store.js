export default class Store {
  callSubscribers() {
    this.subscribers.forEach(handler => {
      handler();
    });
  }

  set(field, value) {
    this.data[field] = value;
    this.callSubscribers();
  }

  get(field) {
    return this.data[field];
  }

  emitEvent(name, data) {
    if (!this.events.hasOwnProperty(name)) return;

    this.events[name].forEach(handler => handler(data));
  }

  on(name, handler) {
    if (!this.events.hasOwnProperty(name)) this.events[name] = [];

    this.events[name].push(handler);
  }

  subscribe(handler) {
    this.subscribers.push(handler);
  }

  constructor() {
    this.data = {};
    this.events = {};
    this.subscribers = [];
  }
}
