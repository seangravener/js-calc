const controls = ({ previousKey, currentKey, api }) => {
  const { can, current } = api;

  if (currentKey.symbol === "Backspace" || currentKey.symbol === "Delete") {
    api.backspace();
  }

  if (currentKey.symbol === "Enter" || currentKey.symbol === "=") {
    if (previousKey.type === "numbers" || previousKey.type === "operators") {
      console.log("display answer!", { ...current });
      // api.save();
      // api.reps

    }
  }

  return (res, rej) => res({ previousKey, currentKey, api });
};

const numbers = ({ previousKey, currentKey, api }) => {
  const { can, current } = api;

  if (previousKey.type === "operators") {
    console.log(api.current)
    api.save({ operandB: currentKey.symbol, operator: '' });
    api.current = { operator: "" }
  } else {
    api.append(currentKey.symbol);
  }

  return (res, rej) => res({ previousKey, currentKey, api });
};

const operators = (locals) => {
  let { currentKey, api } = locals;

  // @todo only allow to switch to new op
  if (api.current.operator !== currentKey.symbol) {
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
