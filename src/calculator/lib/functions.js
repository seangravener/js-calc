import { controlOperations, mathOperations } from "./formulas.js";

const noop = () => {};
const operators = Object.keys(mathOperations);
const _formulas = { ...controlOperations, ...mathOperations };

const arithmetic = (operator) => {
  return (...operands) => {
    const [A, B] = operands.map((value) => parseFloat(value));
    const operandA = operator && B ? _formulas[operator](A, B) : A;

    return `${operandA}`;
  };
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
