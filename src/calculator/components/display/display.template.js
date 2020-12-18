const historyDisplay = (history) => `
  <div class="calc-operation">
    ${history}
  </div>`;

const mainDisplay = (operator, output) => `
  <div class="calc-typed" id="mainDisplay">
    <span class="operator">${operator}</span> ${output || "- - -"}
  </div>`;

const compose = (...parts) =>
  parts.reduce((whole, part) => {
    return `${whole}${part}`;
  }, "");

const templateFn = ({ operator, history, output }) => {
  return compose(historyDisplay(history), mainDisplay(operator, output));
};

export { templateFn };
