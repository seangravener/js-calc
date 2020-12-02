let _events = {};

class EventBus {
  get events() {
    return _events;
  }

  constructor(events = {}) {
    _events = events;
  }

  listenTo(event, callback) {
    if (!_events.hasOwnProperty(event)) {
      _events[event] = [];
    }

    console.log(this)
    return _events[event].push(callback);
  }

  publish(event, payload = {}) {
    return _events.hasOwnProperty(event)
      ? _events[event].map((callback) => callback(payload))
      : [];
  }
}

let _instance = undefined;
const run = () => {
  return _instance || (_instance = new EventBus());
};

export default run();
