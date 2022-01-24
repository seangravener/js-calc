export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'SEC_ARG',
    action({ api }) {
      api.display.append({ operandB: api.currentKey.symbol })
      // display += num
    }
  },
  dotKey: {
    toStateId: 'SEC_ARG_FLOAT',
    action({ api }) {
      api.display.append({ operandB: '.' })
      // display += '.'
    }
  },
  opKey: {
    toStateId: 'OP',
    action({ api }) {
      api.display.set({
        // operandB: '01',
        operandA: api.previousKey.symbol,
        operator: api.currentKey.symbol
      })
      // display = acc1 + op + display;
      // op = opKey
      // acc1 = display
    }
  },
  eqKey: {
    toStateId: 'EQUAL',
    action() {
      // acc2 = display; (previous number)
      // display = acc1+op+display (operandA, operator, operandB)
    }
  }
}

export const SEC_ARG = { actions, transitions }
