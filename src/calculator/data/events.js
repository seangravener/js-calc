let _instance = undefined;
let _events = {};

class EventBus {
  get events() {
    return _events;
  }

  constructor(events = _events) {
    _events = events;
  }

  // https://medium.com/@jesusgalvan/vue-js-event-bus-promises-f83e73a81d72
  listenTo$(nameSpaces) {
    return new Promise((resolve, reject) => {});
  }

  listenTo(nameSpaces, callback) {
    nameSpaces = [...[nameSpaces]]; // '' or [''] are ok
    nameSpaces.forEach((nameSpace) => {
      _events[nameSpace] = _events[nameSpace] || [];
      _events[nameSpace].push(callback);
    });

    return this;
  }

  publish(nameSpace, payload = {}) {
    if (_events[nameSpace]) {
      _events[nameSpace].map((callback) => callback(payload));
    }

    return this;
  }

  static load() {
    return _instance || (_instance = new EventBus());
  }
}

export { EventBus };
export default EventBus.load();
