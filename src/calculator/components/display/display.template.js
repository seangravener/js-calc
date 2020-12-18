const historyDisplay = (history) => `
  <div class="calc-operation">
    ${history.replace("null", "") || ""}
  </div>`;

const mainDisplay = (operator, operandB) => `
  <div class="calc-typed" id="mainDisplay">
    <span class="operator">${exists(operator)}</span>
    ${exists(operandB, "- - -")}
  </div>`;

const exists = (value, placeholder = "") => (value ? `${value}` : placeholder);

const compose = (...parts) =>
  parts.reduce((whole, part) => {
    return `${whole}${part}`;
  }, "");

const templateFn = ({ operator, history, operandB }) => {
  return compose(historyDisplay(history), mainDisplay(operator, operandB));
};

export { templateFn };
