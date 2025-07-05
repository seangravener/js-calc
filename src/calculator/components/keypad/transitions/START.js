export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'FIRST_ARG',
    action({ api }) {
      api.displayService.append({ operandA: api.currentKey.symbol })
    }
  },
  dotKey: {
    toStateId: 'FIRST_ARG_FLOAT',
    action({ api }) {
      api.displayService.set({ operandA: '0.' })
    }
  },
  reset: {
    toStateId: 'START',
    action({ api }) {
      api.displayService.reset()
    }
  }
}

export const START = { actions, transitions }
