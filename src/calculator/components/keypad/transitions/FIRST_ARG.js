export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'FIRST_ARG',
    action({ api }) {
      api.displayService.append({ operandA: api.currentKey.symbol })
    }
  },
  opKey: {
    toStateId: 'OP',
    action({ api }) {
      api.displayService.set({
        operator: api.currentKey.symbol,
        operandA: api.displayService.value
      })
    }
  },
  dotKey: {
    toStateId: 'FIRST_ARG_FLOAT',
    action({ api }) {
      api.displayService.append({ operandA: '.' })
    }
  },
  reset: {
    toStateId: 'START',
    action({ api }) {
      api.displayService.reset()
    }
  },
  modKey: {
    toStateId: 'FIRST_ARG',
    action({ api }) {
      const currentA = api.displayService.current.operandA
      if (currentA && currentA.length > 1) {
        api.displayService.set({ operandA: currentA.slice(0, -1) })
      } else {
        api.displayService.set({ operandA: '0' })
      }
    }
  }
}

export const FIRST_ARG = { actions, transitions }
