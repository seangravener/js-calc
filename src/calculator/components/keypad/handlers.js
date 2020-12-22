const controls = ({ key, api }) => {
  const { can, operandA } = api;

  return (res, rej) => {
    if (key.symbol === "Backspace" || key.symbol === "Delete") {
      api.backspace();
    }

    if (key.symbol === "Enter" || key.symbol === "=") {
      if (can.operate) {
        api.save();
        api.set({ operandB: operandA });
      } else {
        api.repeat();
        // api.display.show(operandA);
      }
      api.display.show(`= ${operandA}`);
    }

    res({ key, api });
  };
};

const numbers = ({ key, api }) => {
  const { can, operandA } = api;

  return (res, rej) => {
    if (can.save) {
      // api.save();
      api.set({ operandB: key.symbol });
    } else {
      api.append(key.symbol);
      // api.display.show(`${operandA}`);
    }

    res({ key, api });
  };
};

const operators = ({ key, api }) => {
  return (res, rej) => {
    api.set({ operator: key.symbol });
    res({ key, api });
  };
};

const reset = ({ key, api }) => {
  return (res, rej) => {
    api.clear();
    res({ key, api });
  };
};

const keypadHandlers = { controls, numbers, operators, reset };
export { keypadHandlers };
