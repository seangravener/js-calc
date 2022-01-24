export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'FIRST_ARG',
    action({ api }) {
      api.display.append({ operandA: api.currentKey.symbol })
    }
  },
  dotKey: {
    toStateId: 'FIRST_ARG_FLOAT',
    action({ api }) {
      // console.log('actin context', this)
      // api.display.set({ operandB: currentKey.symbol || '0' })
      // api.display.value = '0.';
      // display = '0.'
    }
  }
}

export const START = { actions, transitions }
