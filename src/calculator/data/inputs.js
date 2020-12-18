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
      .reduce((history, [operator, operandB]) => {
        return `${history} ${operator} ${operandB}`;
      }, "")
      .trim();
  }

  constructor() {}

  get() {
    const { operator, operandA, operandB } = memory;
    return { operator, operandA, operandB, history: this.history };
  }

  set(locals) {
    const { operator, operandB, history } = this.get();
    memory.set(1, { operator, operandB, ...locals });
    events.publish("inputs:save", { ...this.get() });
  }

  save() {
    memory.save();
    events.publish("inputs:save", { ...this.get() });
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
