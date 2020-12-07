import events from "./events.js";
import { operators } from "../lib/functions.js";
import totalizator from "./totalizator.js";

/**
 */

// const memType = [
//   "OperandA<Float>",
//   "Operator<String>",
//   "OperandB<Float>",
//   "currentOperator<String>",
// ];

const _nullMemorySet = [null, null, null];
let _memory = [..._nullMemorySet];
let _instance = undefined;

class Memory {
  get length() {
    console.log(_memory);
    return _memory.length;
  }

  get operandA() {
    console.log("get", this.get(3));
    this.get(3);
  }

  set operandA(num) {
    console.log("set", num);
    this.set(3, num);
  }

  get operandB() {
    this.get(1);
  }

  set operandB(num) {
    this.set(1, num);
  }

  get operator() {
    this.get(2);
  }

  set operator(symbol) {
    this.set(2, symbol);
  }

  constructor() {}

  store([operandA, operator, operandB]) {
    // validate prev memory set
    _memory.push(operandA, operator, operandB);
  }

  save() {
    // this.operandA = totalizator.getAnswer()
    events.publish("memory:save", this.recall(3));
    _memory.push(..._nullMemorySet);
  }

  set(location, value) {
    _memory[_memory.length - location] = value;
    events.publish("memory:set", location, value);
  }

  get(location) {
    return this.recall(location)[0];
  }

  recall(count) {
    return count ? _memory.slice(-count) : _memory;
  }

  validate(candidate = this.memory.recall(1)) {
    let isValid = true;

    for (operator of operators) {
      if (operator !== candidate) {
        isValid = false;
      }
    }

    if (!isValid) {
      // _errCorrectIfPossible();
      console.log(_memory);
      throw new Error("memory seems invalid\n");
    }

    return isValid;
  }

  clear() {
    _memory = [..._nullMemorySet];
    events.publish("memory:clear");

    return this;
  }

  static load() {
    return _instance || (_instance = new Memory(_memory));
  }
}

export { Memory };
export default Memory.load();
