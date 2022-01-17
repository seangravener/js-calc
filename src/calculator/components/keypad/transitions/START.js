export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'FIRST_ARG',
    async action() {
      const { currentKey } = this
      console.log('actin context', this)
      
      api.display.set$({ operandA: currentKey.symbol || '0' })
      // await this.display.set$({ operandA: currentKey.symbol || '0' })
    }
  },
  dotKey: {
    toStateId: 'FIRST_ARG_FLOAT',
    action({ api }) {
      const { currentKey } = api.current
      console.log('actin context', this)
      api.display.set$({ operandA: currentKey.symbol || '0' })
      // api.display.value = '0.';
      // display = '0.'
    }
  }
}

export const START = { actions, transitions }
