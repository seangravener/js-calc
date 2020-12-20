const controls = ({ key, api }) => {
  return (res, rej) => {
    if (key.symbol === "Backspace") {
      api.backspace();
    }

    if (key.symbol === "Enter" || key.symbol === "=") {
      api.save();
      console.log(api)
    }

    res({ key, api });
  };
};

const numbers = ({ key, api }) => {
  return (res, rej) => {
    api.append(key.symbol);
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
