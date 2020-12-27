import display from "./display.js";
import events from "./events.js";
import memory from "./memory.js";
import { assign } from "../lib/functions.js";

let _instance = undefined;

class DataService {
  get length() {
    return memory.operandB.length;
  }

  get display() {
    return display;
  }

  get operandA() {
    return this.get().operandA;
  }

  set operator(operator) {
    this.set({ operator });
  }

  get operator() {
    return this.get().operator;
  }

  set operandB(operandB) {
    this.set({ operandB });
  }

  get operandB() {
    return this.get().operandB;
  }

  get previous() {
    return (
      memory.recall(-1).reduce((value, chunk) => {
        if (value.operator) return value;
        const [operator, operandB] = chunk;

        if (operator) {
          return { operator, operandB };
        }
        return {};
      }, {}) || this.get(1)
    );
  }

  get can() {
    const { operator, operandB, previous } = this;

    return {
      operate: !!operator,
      save: !!(operator && operandB !== "0"),
      repeat: !!(operator && previous.operandB),
    };
  }

  constructor() {}

  show(msg) {
    display.set({ msg });
  }

  get(position = 1) {
    const { operator, operandB } = memory.get(position);
    const { operandA } = memory; // compute value from pos?

    return { operandA, operator, operandB };
  }

  set(locals) {
    const { operator, operandB } = this.get();
    memory.set(1, { operator, operandB, ...locals });
    this.publish("next");
  }

  save(locals) {
    memory.insert();

    if (locals) {
      memory.set(1, locals);
    }
    this.publish("next");
  }

  repeat() {
    console.log({ prev: this.previous });
    console.log({ curr: this.get() });
    const snapshot = assign({}, this.previous, this.get());
    const { operator, operandB } = snapshot;

    memory.store([[operator, operandB]]);
    console.log("repeat! set-->", { operator, operandB });
    memory.store([[null, this.operandA]]);
    console.log(memory);

    this.publish("next");
  }

  append(digit) {
    const { operandB } = memory.asFloats();
    this.set({ operandB: `${operandB || ""}${digit}` });
  }

  backspace(count = 1) {
    let digits = this.operandB.split("");

    digits.splice(-count);
    this.set({ operandB: digits.length ? digits : "0" });
  }

  clear() {
    memory.clear();
    this.publish("next");
  }

  publish(eventName, payload = this.get()) {
    events.publish(`output:${eventName}`, payload);
  }

  static load() {
    return _instance || (_instance = new DataService());
  }
}

export { DataService };
export default DataService.load();
