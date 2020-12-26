const controls = ({ previousKey, currentKey, api }) => {
  const { can, operandA } = api;

  return (res, rej) => {
    if (currentKey.symbol === "Backspace" || currentKey.symbol === "Delete") {
      api.backspace();
    }

    if (currentKey.symbol === "Enter" || currentKey.symbol === "=") {
      if (can.operate) {
        api.save();
      } else {
        api.repeat();
        // api.display.show(operandA);
      }

      api.display.show(`= ${operandA}`);
    }

    res({ previousKey, currentKey, api });
  };
};

const numbers = ({ previousKey, currentKey, api }) => {
  const { can, operandA } = api;

  return (res, rej) => {
    // if (can.operate) {
    //   // api.save();
    //   api.set({ operandB: currentKey.symbol });
    // } else {
    //   // api.display.show(`${operandA}`);
    // }
    api.append(currentKey.symbol);

    res({ previousKey, currentKey, api });
  };
};

const operators = (locals) => {
  const { previousKey, currentKey, api } = locals;
  api.set({ operator: currentKey.symbol });

  return (res, rej) => {
    res(locals);
  };
};

const reset = ({ previousKey, currentKey, api }) => {
  return (res, rej) => {
    api.clear();
    res({ previousKey, currentKey, api });
  };
};

const keypadHandlers = { controls, numbers, operators, reset };
export { keypadHandlers };
