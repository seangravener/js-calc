import events from "./events.js";
import memory from "./memory.js";

let _instance = undefined;
class Inputs {
  get length() {
    return memory.operandB.length;
  }

  get active() {
    const { operator, operandB } = memory;
    return { operator, operandB };
  }

  get display() {
    const digits = memory.operandB.split("");
    return { digits };
  }

  set active({ operator, operandB }) {
    memory.set(1, {
      operandB: operandB || memory.operandB,
      operator: operator || memory.operator,
    });
  }

  constructor() {
    console.log(this.active, this.display);
  }

  append(digit) {
    console.log(digit);
    console.log([...memory.operandB, digit]);
    memory.operandB = [...memory.operandB, digit];
  }

  // .pop not mutating with getters/setters?
  backspace(count = 1) {
    let { digits } = this.display;
    const popDigit = (count) => {
      digits.splice(-count);
      return digits;
    };

    digits = digits.length === 1 ? ["0"] : popDigit(count);
    this.active = { ...this.active, operandB: digits };
  }

  reset(operator = "", operandB = "") {}

  static load() {
    return _instance || (_instance = new Inputs());
  }
}

export { Inputs };
export default Inputs.load();
