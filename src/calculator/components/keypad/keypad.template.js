import { OPERATORS, CONTROLS } from '../../lib/constants.js'

const button = ({ symbol, classes }) =>
  `<div class="${classes.join(' ')}">${symbol}</div>`

const buttonRow = (row) => `
  <div class="calc-button-row">
    ${row.map((props) => button(props)).join('')}
  </div>
`

const templateFn = ({ layout }) =>
  `${layout.map((row) => buttonRow(row)).join('')}`

const keypadLayout = [
  [
    { symbol: CONTROLS.CLEAR, classes: ['button', 'c'] },
    { symbol: '≠', classes: ['button', 'l'] },
    { symbol: OPERATORS.MODULO, classes: ['button', 'l'] },
    { symbol: OPERATORS.DIVIDE, classes: ['button', 'l'] }
  ],
  [
    { symbol: '7', classes: ['button'] },
    { symbol: '8', classes: ['button'] },
    { symbol: '9', classes: ['button'] },
    { symbol: 'x', classes: ['button', 'l'] }
  ],
  [
    { symbol: '4', classes: ['button'] },
    { symbol: '5', classes: ['button'] },
    { symbol: '6', classes: ['button'] },
    { symbol: '−', classes: ['button', 'l'] }
  ],
  [
    { symbol: '1', classes: ['button'] },
    { symbol: '2', classes: ['button'] },
    { symbol: '3', classes: ['button'] },
    { symbol: OPERATORS.ADD, classes: ['button', 'l'] }
  ],
  [
    { symbol: CONTROLS.DOT, classes: ['button'] },
    { symbol: '0', classes: ['button'] },
    { symbol: '<', classes: ['button'] },
    { symbol: CONTROLS.EQUALS, classes: ['button', 'l'] }
  ]
]

export { templateFn, keypadLayout, button, buttonRow }
