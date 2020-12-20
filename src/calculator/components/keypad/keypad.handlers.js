const controls = ({ key, api }) => {
  return (res, rej) => {
    api.save();
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
  console.log(this);
  return (res, rej) => {
    api.set({ operator: key.symbol });
    res({ key, api });
  };
};

const reset = ({ key, api }) => {
  return (res, rej) => {
    console.log("reset!");
    api.clear();
    res({ key, api });
  };
};

const keypadHandlers = { controls, numbers, operators, reset };
export { keypadHandlers };
