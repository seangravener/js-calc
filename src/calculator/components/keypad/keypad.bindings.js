import { OPERATORS, CONTROLS } from '../../lib/constants.js'

export const keypadBindings = {
  dotKey: [CONTROLS.DOT],
  eqKey: ['Enter', CONTROLS.EQUALS],
  reset: ['c', CONTROLS.CLEAR, 'Escape'],
  modKey: ['Delete', 'Backspace', '<'],
  opKey: ['/', OPERATORS.SUBTRACT, OPERATORS.ADD, OPERATORS.MODULO, OPERATORS.MULTIPLY, OPERATORS.DIVIDE, 'x', '−'],
  numKey: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
}
