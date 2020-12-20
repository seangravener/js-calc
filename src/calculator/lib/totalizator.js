import { arithmetic } from "./functions.js";

class Totalizator {
  constructor() {}

  compute(memory) {
    const snapshot = memory;

    return snapshot.length
      ? snapshot.reduce(this.memoryReducer, 0)
      : "Err. No memory to compute.";
  }

  memoryReducer(operandA, [operator, operandB]) {
    return arithmetic(operator)([operandA, operandB]);
  }
}

export { Totalizator };
export default new Totalizator();
