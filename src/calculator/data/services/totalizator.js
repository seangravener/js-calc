// import { input } from "../../lib/index.js";
import _store from "../store/instance.js"
import { Service } from "../models/service.js";
import { arithmetic } from "../../lib/functions.js";

let _instance = undefined;
const _input = _store.input
const _memory = _store.memory

class Totalizator extends Service {
  get answer() {
    return this.compute().toString();
  }

  get currentOperand() {
    // return store.input.value
    return _input.value;
  }

  set currentOperand(value) {
    _input.value = value;
  }

  get previousOperand() {
    return _memory.recall(2);
  }

  get operator() {
    return _input.operator || _memory.recall(1) || "";
  }

  set operator(symbol) {
    console.log("--set-operator=", symbol);
    if (_memory.length && symbol) {
      console.log("--set-memory=", symbol);
      _memory.set(1, symbol);
    }
    _input.operator = symbol;
  }

  constructor() {
    super()
  }

  // move to calculator.js
  save() {
    // this.mode('hold') // don't accept input
    _memory.store(_input.value, this.operator);
    _input.reset('', this.compute());

    return _input.value
  }

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
