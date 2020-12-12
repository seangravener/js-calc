import events from "./events.js";
import memory from "./memory.js";

let _instance = undefined;
class Inputs {
  get length() {
    return memory.operandB.length;
  }

  get display() {
    return { digits: memory.operandB.split(""), ...this.get() };
  }

  constructor() {}

  get() {
    const { operator, operandB } = memory;
    return { operator, operandB };
  }

  set(locals) {
    const { operator, operandB } = memory;
    memory.set(1, { operator, operandB, ...locals });
  }

  append(digit) {
    memory.operandB = [...memory.operandB, digit];
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
