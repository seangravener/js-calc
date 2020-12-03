let _instance = undefined;

class State {
  get displayValue() {
    return "i ❤️ 80083";
  }

  constructor() {}

  static load() {
    return _instance || (_instance = new State());
  }
}

export { State };
