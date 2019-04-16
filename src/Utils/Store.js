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

  subscribe(handler) {
    this.subscribers.push(handler);
  }

  constructor() {
    this.data = {};
    this.subscribers = [];
  }
}
