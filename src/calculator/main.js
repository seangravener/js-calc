import totalizator from "./data/totalizator.js";
import { Calculator } from "./ui/index.js";

const calculator = new Calculator();

calculator.memory.operandB = 2;
calculator.memory.operator = "+";

// on number key:
let keyType = "number";
if (keyType === "number") {
  calculator.memory.save();
}

calculator.memory.operandB = 3;
calculator.memory.operator = "+";
calculator.memory.operator = "-";
calculator.memory.operandB = 2;
calculator.memory.operator = "/";
calculator.memory.operandB = 3;
calculator.memory.operator = "*";
calculator.memory.operator = "+";
calculator.memory.operandB = 2;

// on number key:
if (keyType === "number") {
  calculator.memory.save();
}
// set state
calculator.memory.operandB = 1;
calculator.memory.operator = "*";
calculator.memory.save();

calculator.memory.operandB = 2;
calculator.memory.operator = "+";
calculator.memory.save();

calculator.memory.operandB = 2;
calculator.memory.operator = "-";
calculator.memory.save();

calculator.memory.operandB = 1;
calculator.memory.operator = "*";
calculator.memory.save();

calculator.memory.operandB = 3;
calculator.memory.operator = "*";
calculator.memory.save();

console.log(calculator.memory);
export default calculator;
