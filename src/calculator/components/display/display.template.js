const templateFn = ({ operation }) => `
  <div class="calc-operation" id="operationDisplay">${
    operation || "- - -"
  }</div>
  <div class="calc-typed" id="mainDisplay">- - -</div>
`;

export { templateFn };
