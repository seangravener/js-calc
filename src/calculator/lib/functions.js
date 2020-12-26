import { controlOperations, mathOperations } from "./formulas.js";

const noop = () => {};
const operators = Object.keys(mathOperations);
const _functions = { ...controlOperations, ...mathOperations };

const arithmetic = (operator) => {
  return (operands) =>
    operator
      ? _functions[operator](...operands.map((value) => parseFloat(value)))
      : operands[0];
};

const newEl = (name, markup) => {
  const tag = document.createElement(name);
  tag.innerHTML = markup;
  return tag;
};

const assign = (target, ...sources) => {
  const filtered = sources.map((source) =>
    Object.entries(source)
      .filter(([key, value]) => !!value)
      .reduce((obj, [key, value]) => ((obj[key] = value), obj), {})
  );

  return Object.assign(target, ...filtered);
};

export { newEl, operators, arithmetic, assign, noop };
