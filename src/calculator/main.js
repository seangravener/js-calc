import totalizator from "./data/totalizator.js";
import { Calculator } from "./ui/index.js";

const calculator = new Calculator();

calculator.events.listenTo("memory:save", (data) =>
  console.log(data, "saved!!")
);

// calculator.memory.operandA = <prevAnswer> --> 0
calculator.memory.operandB = 2;
calculator.memory.operator = "+";

// on number key:
let keyType = "number";
if (keyType === "number") {
  calculator.memory.save(); // #1 insert null mem set
  calculator.memory.operandB = 4; // #2 set operandB ${key}
}
// answer = 6

// calculator.memory.operandA = <prevAnswer> --> 6
// calculator.memory.operator = "/";
// calculator.memory.operator = "-";
// calculator.memory.operator = "+";
calculator.memory.operator = "*";

// on number key:
if (keyType === "number") {
  calculator.memory.save(); // #1 insert null mem set
  calculator.memory.operandB = 2; // #2 set operandB
}
// answer = 6

// keyType = 'compute'
if (keyType === 'compute') {
    calculator.memory.save();
    calculator.memory.operandB = calculator.memory.operandA
    calculator.memory.operator = "";
}

// calculator.memory.store([1, '+', 11])
console.log(calculator.memory);

export default calculator;
