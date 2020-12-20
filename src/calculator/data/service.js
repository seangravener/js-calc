import events from "./events.js";
import memory from "./memory.js";

let _instance = undefined;

class DataService {
  get length() {
    return memory.operandB.length;
  }

  get display() {
    return {
      history: this.history,
      digits: memory.operandB.split(""),
      ...this.get(),
    };
  }

  get history() {
    return memory
      .recall(-1) // omit active chunk
      .reduce((history, [operator, operandB]) => {
        return `${history} ${operator} ${operandB}`;
      }, "")
      .trim();
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

  constructor() {}

  get() {
    const { operator, operandA, operandB } = memory;
    return { operator, operandA, operandB, history: this.history };
  }

  set(locals) {
    const { operator, operandB } = this.get();
    memory.set(1, { operator, operandB, ...locals });
    events.publish("api:save", { ...this.get() });
  }

  save() {
    const { operator, operandB } = memory.newTotal();
    this.set({ operator, operandB });
    console.log("mem:save. now ->", { ...this.get() });
  }

  append(digit) {
    this.set({ operandB: `${memory.operandB}${digit}` });
  }

  backspace(count = 1) {
    let { digits } = this.display;

    digits.splice(-count);
    this.set({ operandB: digits.length ? digits : ["0"] });
  }

  clear(operator = "", operandB = "") {
    console.log("reset!", this);
    memory.reset();
  }

  static load() {
    return _instance || (_instance = new DataService());
  }
}

export { DataService };
export default DataService.load();
