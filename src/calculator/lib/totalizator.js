import { arithmetic } from "./functions.js";

class Totalizator {
  constructor() {}

  compute(memory) {
    return memory.length
      ? `${memory.reduce(this.memoryReducer)[0]}`
      : "0";
  }

  memoryReducer(chunk, [operandB, nextOperator]) {
    const [operandA, operator] = chunk;
    return [arithmetic(operator)([operandA, operandB]), nextOperator];
  }
}

export { Totalizator };
export default new Totalizator();
