import inputs from "./inputs.js";
import { arithmetic } from "../lib/functions.js";

let _instance = undefined;
const _input = {}; // _store.input
const _memory = {}; // _store.memory

class Totalizator {
  get answer() {
    return this.compute().toString();
  }

  constructor() {}

  // move to calculator.js

  compute() {
    const snapshot = _memory.recall();

    return snapshot.length
      ? snapshot.reduce(_memoryReducer.bind(this))
      : "Err. Nothing in memory to compute.";
  }

  memoryReducer(total, item) {
    let localValue = 0;
    let localOperator = this.operator;
    const key = _input.keys.get(item);

    if (key.isOfType("operators")) {
      localOperator = item;
      localValue = total;
    } else if (!isNaN(item)) {
      localValue = arithmetic(localOperator, [total, item]);
    }
    return localValue;
  }

  // move to calculator.js
  clear() {
    _input.operator = "";
    _memory.clear();
  }

  static load() {
    return _instance || (_instance = new Totalizator());
  }
}

export { Totalizator };
export default Totalizator.load();
