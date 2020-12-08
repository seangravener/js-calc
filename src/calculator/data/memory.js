import events from "./events.js";
import { operators } from "../lib/functions.js";
import totalizator from "./totalizator.js";

const _nullMemorySet = () => [[null, 0]];
let _memory = _nullMemorySet();
let _instance = undefined;

class Memory {
  get length() {
    console.log(_memory);
    return _memory.length;
  }

  get operandA() {
    return totalizator.compute(_memory);
  }

  get operandB() {
    return this.get(1).operandB;
  }

  set operandB(operandB) {
    this.set(1, { operandB });
  }

  get operator() {
    return this.get(1).operator;
  }

  set operator(operator) {
    this.set(1, { operator });
  }

  constructor() {}

  store([operator, operandB]) {
    // validate prev memory set
    _memory.push([operator, operandB]);
  }

  save() {
    const isValid = this.operandB && this.operator;
    _memory.push(..._nullMemorySet());
    console.log("Saved.", "Current Answer --> ", this.operandA);
    return this.operandA;
  }

  set(loc, { operator, operandB }) {
    const [localOperator, localOperandB] = _memory[_memory.length - loc]; // this is stored mem set
    console.log(`set this loc: ${loc}`, _memory[_memory.length - loc]);

    operator = operator || localOperator;
    operandB = !isNaN(operandB) ? operandB : localOperandB; // this is active mem set
    console.log(`with :`, { operator, operandB });

    _memory[_memory.length - loc] = [operator, operandB];

    console.log(
      `result: ${_memory[_memory.length - loc]}`,
      `--MEM= ${_memory}`,
      "\n\n"
    );
    return { operator, operandB };
  }

  get(loc) {
    const operator = this.recall(loc)[0][0];
    const operandB = this.recall(loc)[0][1];

    return { operator, operandB };
  }

  recall(count) {
    return count ? _memory.slice(-count) : _memory;
  }

  clear() {
    _memory = _nullMemorySet();
    events.publish("memory:clear");

    return this;
  }

  static load() {
    return _instance || (_instance = new Memory(_memory));
  }
}

export { Memory };
export default Memory.load();
