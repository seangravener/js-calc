import { keyControls, mathOperators } from "./inputs.js";

const noop = () => {console.log('noop!')};
const operators = Object.keys(mathOperators);

const _functions = { ...keyControls, ...mathOperators };
const arithmetic = (operator) => {
  return (operands) =>
    operator
      ? _functions[operator](...operands.map((value) => parseFloat(value)))
      : operands[0];
};

export { operators, arithmetic, noop };
