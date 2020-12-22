import display from './display.js';
import events from "./events.js";
import memory from "./memory.js";

let _instance = undefined;

class DataService {
  get length() {
    return memory.operandB.length;
  }

  get display() {
    return display.state;
  }

  get history() {
    const reducer = (history, [operator, operandB]) =>
      `${history} ${operator} ${operandB}`;

    return memory.recall(-1).reduce(reducer, "").trim();
  }

  set operator(operator) {
    this.set({ operator });
  }

  get operator() {
    return this.get().operator;
  }

  set operandB(operandB) {
    this.set({ operandA });
  }

  get operandB() {
    return this.get().operandB;
  }

  get is() {
    const { operator, operandB } = this.get();
    const okToSave = !!(operator && operandB !== "0");

    return { okToSave };
  }

  constructor() {}

  get() {
    const { operator, operandA, operandB } = memory;
    return { operator, operandA, operandB };
  }

  set(locals) {
    const { operator, operandB } = this.get();
    memory.set(1, { operator, operandB, ...locals });
    this.publish("change");
  }

  save() {
    const { operator, operandB } = memory.newTotal();
    this.set({ operator, operandB });
  }

  append(digit) {
    this.set({ operandB: `${memory.operandB}${digit}` });
  }

  backspace(count = 1) {
    let digits = this.operandB.split("");

    digits.splice(-count);
    this.set({ operandB: digits.length ? digits : "0" });
  }

  clear() {
    memory.clear();
    this.publish("change");
  }

  publish(eventName, payload = this.get()) {
    events.publish(`api:${eventName}`, payload);
  }

  static load() {
    return _instance || (_instance = new DataService());
  }
}

export { DataService };
export default DataService.load();
