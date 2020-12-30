const historyDisplay = ({ history }) => `
  <div class="calc-operation">
    ${exists(history)}
  </div>`

const mainDisplay = ({ operator, display }) => `
  <div class="calc-typed" id="mainDisplay">
    <span class="operator">${exists(operator)}</span>
    ${display.value}
  </div>`

const exists = (value, placeholder = '') => (value ? `${value}` : placeholder)

const compose = (...parts) =>
  parts.reduce((whole, part) => {
    return `${whole}${part}`
  }, '')

const templateFn = ({ display, ...state }) => {
  const { history } = display

  return compose(
    historyDisplay({ history }),
    mainDisplay({ display, ...state })
  )
}

export { templateFn }
