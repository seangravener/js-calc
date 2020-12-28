const controls = ({ previousKey, currentKey, api }) => {
  const { can, current } = api;

  if (currentKey.symbol === "Backspace" || currentKey.symbol === "Delete") {
    api.backspace();
  }

  if (currentKey.symbol === "Enter" || currentKey.symbol === "=") {
    if (previousKey.type === "numbers") {
      console.log("save!", { op: current.operator, B: current.operandB });
      api.save();
    }
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
  let { currentKey, api } = locals;

  console.log(currentKey.symbol, api.current.operator);
  if (api.current.operator !== currentKey.symbol) {
    console.log("set up", currentKey.symbol);
    api.current = { operator: currentKey.symbol };
  } else {
    api.current = { operator: "" };
  }

  return (res, rej) => res(locals);
};

const reset = ({ previousKey, currentKey, api }) => {
  api.clear();

  return (res, rej) => res({ previousKey, currentKey, api });
};

const keypadResolvers = { controls, numbers, operators, reset };
export { keypadResolvers };
