const controls = ({ previousKey, currentKey, api }) => {
  const { can, operandA } = api;

  if (currentKey.symbol === "Backspace" || currentKey.symbol === "Delete") {
    api.backspace();
  }

  if (currentKey.symbol === "Enter" || currentKey.symbol === "=") {
    if (can.operate) {
      console.log('save!', api.operator, api.operandB)
      api.save();
    } else {
      api.repeat();
      // api.display.show(operandA);
    }

    api.display.show(`= ${operandA}`);
  }

  return (res, rej) => res({ previousKey, currentKey, api });
};

const numbers = ({ previousKey, currentKey, api }) => {
  const { can, operandA } = api;

  if (previousKey.type === "operators") {
    api.save({ operandB: currentKey.symbol });
  } else {
    api.append(currentKey.symbol);
  }

  return (res, rej) => res({ previousKey, currentKey, api });
};

const operators = (locals) => {
  const { currentKey, api } = locals;
  api.set({ operator: currentKey.symbol });

  return (res, rej) => res(locals);
};

const reset = ({ previousKey, currentKey, api }) => {
  api.clear();

  return (res, rej) => res({ previousKey, currentKey, api });
};

const keypadResolvers = { controls, numbers, operators, reset };
export { keypadResolvers };
