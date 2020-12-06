import memory from "./memory.js"

let _instance = undefined;

class State {
  get displayValue() {
    return "i ❤️ 80083";
  }

  get operandA() {}
  set operandA() {
    inputs.operandA = 123
  }

  set operandB() {}
  get operandB() {}

  get operator() {
    return this.inputs.operator
  }

  constructor() {
    this.inputs = new Inputs()
  }

  static load() {
    return _instance || (_instance = new State());
  }
}

const singleton = () => {
  return State.load();
};

export { State };
export default singleton();
