import { keyOperators } from "./keys.js";
import { mathOperators } from "./keys.js";

const _functions = { ...keyOperators, ...mathOperators };
const operators = Object.keys(mathOperators);

const arithmetic = (operator) => {
  return (values) => (operator ? _functions[operator](...values) : values[0]);
};

export { keyOperators, mathOperators, operators, arithmetic };
