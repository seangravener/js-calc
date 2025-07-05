export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'SEC_ARG_FLOAT',
    action({ api }) {
      api.displayService.append({ operandB: api.currentKey.symbol })
    }
  },
  opKey: {
    toStateId: 'OP',
    action({ api }) {
      const { operandA, operator, operandB } = api.displayService.current
      const result = api.displayService.totalizator.compute([[operandA, operator], [operandB, null]])
      api.displayService.set({
        operandA: result,
        operator: api.currentKey.symbol,
        operandB: ''
      })
    }
  },
  reset: {
    toStateId: 'START',
    action({ api }) {
      api.displayService.reset()
    }
  },
  modKey: {
    toStateId: 'SEC_ARG_DOT',
    action({ api }) {
      const currentB = api.displayService.current.operandB
      if (currentB && currentB.length > 1) {
        api.displayService.set({ operandB: currentB.slice(0, -1) })
      } else {
        api.displayService.set({ operandB: '0' })
      }
    }
  }
}

export const SEC_ARG_DOT = { actions, transitions }
