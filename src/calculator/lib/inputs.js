const keyControls = {
  Enter: (a, b) => a,
  "=": (a, b) => a,
};

const mathOperators = {
  "*": (a, b) => a * b,
  "-": (a, b) => a - b,
  "/": (a, b) => a / b,
  "+": (a, b) => a + b,
};

const keyBindings = {
  controls: ["Enter", "Delete", "Backspace", "="],
  numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  operators: ["/", "-", "+", "%", "*"],
  reset: ["c"],
};

const keyTypeHandlers = {
  controls(res, rej) {
    res(this.key);
  },

  numbers(res, rej) {
    return res(this.key);
  },

  operators(res, rej) {
    return res(this.key);
  },

  reset(res, rej) {
    return res(this.key);
  },
};

export { mathOperators, keyControls, keyBindings, keyTypeHandlers };
