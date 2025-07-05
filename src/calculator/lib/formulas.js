import { OPERATORS, CONTROLS } from './constants.js'

const controlOperations = {
  Enter: (a, b) => a,
  [CONTROLS.EQUALS]: (a, b) => a
}

const mathOperations = {
  [OPERATORS.MULTIPLY]: (a, b) => a * b,
  [OPERATORS.SUBTRACT]: (a, b) => a - b,
  [OPERATORS.DIVIDE]: (a, b) => a / b,
  [OPERATORS.ADD]: (a, b) => a + b,
  [OPERATORS.MODULO]: (a, b) => a % b
}

export { controlOperations, mathOperations }
