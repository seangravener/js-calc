import display from "./display.js";
import events from "./events.js";
import memory from "./memory.js";

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
    this.set({ operandA });
  }

  get operandB() {
    return this.get().operandB;
  }

  get can() {
    const { operator, operandB } = this.get();
    const operate = !!operator;
    const save = !!(operator && operandB !== "0");

    return { operate, save };
  }

  constructor() {}

  show(msg) {
    display.set({ msg });
  }

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
    const { operator, operandB } = memory.insert();
    // const { operandA, operator, operandB } = memory.insert();
    this.set({ operator, operandB });
  }

  repeat() {
    // this.lastOp, aka memory.get(2)
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
