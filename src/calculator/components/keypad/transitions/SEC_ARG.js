export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'SEC_ARG',
    action() {
      // display += num
    }
  },
  dotKey: {
    toStateId: 'SEC_ARG_FLOAT',
    action() {
      // display += '.'
    }
  },
  opKey: {
    toStateId: 'OP',
    action() {
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
