import events from "./events.js";
import totalizator from "../lib/totalizator.js";

const _nullMemorySet = () => [[null, "0"]];
let _memory = _nullMemorySet();
let _instance = undefined;

class Memory {
  get length() {
    console.log(_memory);
    return _memory.length;
  }

  get operandA() {
    return `${totalizator.compute(_memory)}`;
  }

  get operandB() {
    return this.get(1).operandB;
  }

  set operandB(operandB) {
    this.set(1, { operandB: Memory.toString(operandB) });
  }

  get operator() {
    return this.get(1).operator;
  }

  set operator(operator) {
    this.set(1, { operator });
  }

  constructor() {}

  store({ operator, operandB }) {
    _memory.push([operator, Memory.toString(operandB)]);
  }

  save() {
    _memory.push(..._nullMemorySet());
    console.log("Saved.", "Current Answer --> ", this.operandA);

    return this.operandA;
  }

  set(position, locals) {
    const { operator, operandB } = { ...this.get(position), ...locals };
    _memory[_memory.length - position] = [operator, Memory.toString(operandB)];

    return { operator, operandB };
  }

  get(position) {
    const [operator, operandB] = this.recall(position)[0];
    return { operator, operandB };
  }

  recall(count) {
    return count ? _memory.slice(-count) : _memory;
  }

  clear() {
    _memory = _nullMemorySet();
    events.publish("memory:clear");
  }

  static toString(obj) {
    return `${obj}`.replace(/[, ]+/g, "");
  }

  static load() {
    return _instance || (_instance = new Memory(_memory));
  }
}

export { Memory };
export default Memory.load();
