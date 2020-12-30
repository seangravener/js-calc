import display from "./display.js";
import events from "./events.js";
import memory, { Memory } from "./memory.js";
import { assign } from "../lib/functions.js";

let _instance = undefined;

class DataService {
  get length() {
    return memory.length;
  }

  get display() {
    return display;
  }

  get current() {
    return this.get();
  }

  set current(locals = {}) {
    memory.set(1, { ...this.current, ...locals });
    this.publish("next");
  }

  get previous() {
    return memory.recall(-1).reduce((value, chunk) => {
      const [operandB, operator] = chunk;
      return operator ? (value = { operator, operandB }) : value;
    }, {});
  }

  get can() {
    const { operator, operandB, previous } = this;

    return {
      operate: !!operator,
      save: !!(operator && operandB !== "0"),
      repeat: !!(operator && previous.operandB),
    };
  }

  constructor() {
    this.memory = memory; // temp
  }

  get(position = 1) {
    return memory.get(position);
  }

  set(position, locals = {}) {
    memory.set(1, { ...this.current, ...locals });
    this.publish("next");
  }

  save(locals = {}) {
    const save = { ...current, ...locals };
    memory.store().set(1, [save.operandB, save.operator]);

    return this;
  }

  store(locals = {}) {
    const save = { ...current, ...locals }
    memory.store()
  }

  append(digit) {
    const { operandB } = memory.asFloats();
    this.current = { operandB: `${operandB || ""}${digit}` };
  }

  backspace(count = 1) {
    let digits = this.current.operandB.split("");
    digits.splice(-count);
    this.current = { operandB: digits.length ? `${digits.join("")}` : "0" };
  }

  clear() {
    memory.clear();
    this.publish("next");
  }

  publish(eventName, payload = this.current) {
    events.publish(`output:${eventName}`, payload);
  }

  static load() {
    return _instance || (_instance = new DataService());
  }
}

export { DataService };
export default DataService.load();
