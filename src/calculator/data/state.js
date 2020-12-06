// MOVE TO SERVICE

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

const singleton = () => {
  return State.load();
};

export { State };
export default singleton();
