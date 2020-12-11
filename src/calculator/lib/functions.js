import { keyOperators } from "./keys.js";
import { mathOperators } from "./keys.js";

const operators = Object.keys(mathOperators);
const _functions = { ...keyOperators, ...mathOperators };
const arithmetic = (operator) => {
  return (operands) =>
    operator
      ? _functions[operator](...operands.map((value) => parseFloat(value)))
      : operands[0];
};

export { keyOperators, mathOperators, operators, arithmetic };
