export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'SEC_ARG',
    action({ api }) {
      api.display.append({ operandB: api.currentKey.symbol })
      // display = num
    }
  },
  dotKey: {
    toStateId: 'SEC_ARG_DOT',
    action({ api }) {
      api.display.append({ operandB: '.' })
      // display = '0.'
    }
  }
}

export const OP = { actions, transitions }
