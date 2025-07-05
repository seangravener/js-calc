export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'SEC_ARG',
    action({ api }) {
      api.displayService.append({ operandB: api.currentKey.symbol })
    }
  },
  dotKey: {
    toStateId: 'SEC_ARG_DOT',
    action({ api }) {
      api.displayService.set({ operandB: '0.' })
    }
  },
  reset: {
    toStateId: 'START',
    action({ api }) {
      api.displayService.reset()
    }
  }
}

export const OP = { actions, transitions }
