import { Calculator } from "./ui/index.js";

const calculator = new Calculator();

calculator.events.listenTo('memory:save', (data) => console.log(data, 'saved!!'))

calculator.memory.operandA = 1
calculator.memory.operator = "+"
calculator.memory.operandB = 2
calculator.memory.save()

calculator.memory.operator = "+"

calculator.memory.operandA = 3
calculator.memory.operator = "+"
calculator.memory.operandB = 4
calculator.memory.save()

// calculator.memory.store([1, '+', 11])
console.log(calculator.memory)

export default calculator;
