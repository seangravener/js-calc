import events from "./events.js";
import memory from "./memory.js";
import totalizator from "./totalizator.js";
import KeyBindings from "../lib/keys.js";
import { Totalizator } from "./totalizator.js";

let _instance = undefined;

class Inputs {
  get length() {
    return this.operandB.length;
  }

  get operandB() {
    console.log('get')
    return memory.recall(2);
  }

  set operandB(value) {
    console.log('set', value)
    memory.set(2, value);
  }

  get digits() {
    return memory
      .recall(2)
      .split("")
      .map((digit) => parseFloat(digit));
  }

  get display() {
    return `${memory.operator} ${memory.operandB}`;
  }

  constructor() {  }

  append(digit) {
    this.operandB = `${this.operandB}${digit}`;
  }

  remove() {
    _history.pop();
  }

  reset(operator = "", operandB = "") {
    memory.operator = operator;
    memory.operandB = operandB;

    return this;
  }

  save() {
    // memory.store(_input.operandB, this.operator);
    // this.reset("", totalizator.compute());

    return _input.operandB;
  }

  static load() {
    return _instance || (_instance = new Inputs());
  }
}

export { Inputs };
export default Inputs.load();
