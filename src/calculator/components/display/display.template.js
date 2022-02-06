const exists = (value, placeholder = '') => (value ? `${value}` : placeholder)

const compose = (...parts) =>
  parts.reduce((whole, part) => {
    return `${whole}${part}`
  }, '')

const historyDisplay = ({ history }) => `
  <div class="calc-operation">
    ${exists(history)}
  </div>`

const mainDisplay = ({ operator, operandA, operandB, result }) => `
  <div class="calc-typed" id="mainDisplay">
    <span class="operator">${exists(operator)}</span>
    ${result || operandB || operandA}
  </div>`

const templateFn = (display) => {
  const { operandA, operator, operandB, result} = display
  // console.log({ operandA, operator, operandB, result})
  return compose(
    // historyDisplay({ history }),
    mainDisplay(display)
  )
}

export { templateFn }
