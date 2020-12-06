import memory from "./memory.js";
import KeyBindings from "../lib/keys.js";

let _instance = undefined;

class Inputs {
  get length() {
    return this.value.length;
  }

  get value() {
    return memory.recall(2);
  }

  set value(value) {
    memory.set(2, value);
  }

  get digits() {
    return memory
      .recall(2)
      .split("")
      .map((digit) => parseFloat(digit));
  }

  get operator() {
      return memory.recall(1)
  }

  set operator(operator) {
    return memory.set(1, operator)
}

  get display() {
    return `${this.operator} ${this.value}`;
  }

  constructor() {
    this.keys = new KeyBindings();
    console.log("input loaded!", this);
    return this.reset();
  }

  append(digit) {
    this.value = `${this.value}${digit}`;
  }

  remove() {
    _history.pop();
  }

  reset(operator = "", value = "") {
    this.operator = operator;
    this.value = value;

    return this;
  }

  static load() {
    return _instance || (_instance = new Inputs());
  }
}

export { Inputs };
export default Inputs.load();
