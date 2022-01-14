export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'SEC_ARG_FLOAT',
    action() {
      // display += num
    }
  },
  eqKey: {
    toStateId: 'EQUAL',
    action() {
      // acc2 = display; (previous number)
      // display = acc1+op+display (operandA, operator, operandB)
    }
  },
  opKey: {
    toStateId: 'OP',
    action() {
      // display = acc1 + op + display;
      // op = opKey
      // acc1 = display
    }
  }
}

export const SEC_ARG_FLOAT = { actions, transitions }
