const keyOperators = {
  Enter: (a, b) => a,
  "=": (a, b) => a,
};

const mathOperators = {
  "*": (a, b) => a * b,
  "-": (a, b) => a - b,
  "/": (a, b) => a / b,
  "+": (a, b) => a + b,
};

const operators = Object.keys(mathOperators);

const _functions = { ...keyOperators, ...mathOperators };
function arithmetic(operator, values) {
  return _functions[operator](...values);
}

export { keyOperators, mathOperators, operators, arithmetic };
