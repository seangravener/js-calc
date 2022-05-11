export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'FIRST_ARG',
    action({ api }) {
      // display.append()
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
      // api.display.append(api.currentKey.symbol)
      // op = opKey; acc1 = display;
    }
  }
}

export const FIRST_ARG = { actions, transitions }
