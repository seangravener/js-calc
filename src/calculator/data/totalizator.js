import inputs from "./inputs.js";
import { arithmetic } from "../lib/functions.js";

let _instance = undefined;

class Totalizator {
  constructor() {}

  compute(memory) {
    const snapshot = memory;

    return snapshot.length
      ? snapshot.reduce(this.memoryReducer, 0)
      : "Err. Nothing in memory to compute.";
  }

  memoryReducer(operandA, [operator, operandB]) {
    console.log(operator, [operandA, operandB])
    return arithmetic(operator)([operandA, operandB]);
  }

  static load() {
    return _instance || (_instance = new Totalizator());
  }
}

export { Totalizator };
export default Totalizator.load();
