import Module from "./module.js";

let _instance = undefined;
let _events = {};

class EventBus extends Module {
  get events() {
    return _events;
  }

  constructor(events = {}) {
    super(_instance)
    this.hi('no way! called base method')
    _events = events;
  }

  listenTo(nameSpaces, callback) {
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
}

const run = () => {
  return _instance || (_instance = new EventBus());
};

export default run();
