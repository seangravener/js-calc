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
  operators({ key, api }) {
    console.log(this);
    return (res, rej) => {
      api.set({ operator: key.symbol });
      res({ key, api });
    };
  },

  numbers({ key, api }) {
    return (res, rej) => {
      api.set({ operandB: key.symbol });
      res({ key, api });
    };
  },

  controls({ key, api }) {
    return (res, rej) => {
      api.save();
      res({ key, api });
    };
  },

  reset({ key, api }) {
    return (res, rej) => {
      console.log("reset!");
      api.reset();
      res({ key, api });
    };
  },
};

export { mathOperators, keyControls, keyBindings, keyTypeHandlers };
