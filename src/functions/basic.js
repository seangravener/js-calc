export const keyOperators = {
  Enter: (a, b) => a,
};

export const mathOperators = {
  "*": (a, b) => a * b,
  "-": (a, b) => a - b,
  "/": (a, b) => a / b,
  "+": (a, b) => a + b,
  "=": (a, b) => a,
};

export const operators = Object.keys(mathOperators);

const _functions = { ...keyOperators, ...mathOperators };
export function arithmetic(operator, values) {
  return _functions[operator](...values);
}
