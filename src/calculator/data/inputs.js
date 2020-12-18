import events from "./events.js";
import memory from "./memory.js";

let _instance = undefined;
class Inputs {
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
      .recall()
      .reduce(
        (history, [operator, operandB]) => `
        ${history} ${operator} ${operandB} `,
        ""
      )
      .trim();
  }

  constructor() {}

  get() {
    const { operator, operandB } = memory;
    return { operator, operandB, history: this.history };
  }

  set(locals) {
    const { operator, operandB, history } = this.get();
    events.publish("save", { operator, operandB, history });
    memory.set(1, { operator, operandB, ...locals });
  }

  append(digit) {
    this.set({ operandB: `${memory.operandB}${digit}` });
  }

  backspace(count = 1) {
    let { digits } = this.display;

    digits.splice(-count);
    this.set({ operandB: digits.length ? digits : ["0"] });
  }

  reset(operator = "", operandB = "") {}

  static load() {
    return _instance || (_instance = new Inputs());
  }
}

export { Inputs };
export default Inputs.load();
