export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'FIRST_ARG',
    action({ api }) {
      api.display.append({ operandA: api.currentKey.symbol })
    }
  },
  opKey: {
    toStateId: 'OP',
    action({ api }) {
      api.display.set({
        operator: api.currentKey.symbol,
        operandA: api.display.value
      })
      // api.display.append(api.currentKey.symbol)
      // op = opKey; acc1 = display;
    }
  }
}

export const FIRST_ARG = { actions, transitions }
