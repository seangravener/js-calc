export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'SEC_ARG',
    action({ api }) {
      api.displayService.append({ operandB: api.currentKey.symbol })
      // displayService = num
    }
  },
  dotKey: {
    toStateId: 'SEC_ARG_DOT',
    action({ api }) {
      api.displayService.append({ operandB: '.' })
      // display = '0.'
    }
  }
}

export const OP = { actions, transitions }
