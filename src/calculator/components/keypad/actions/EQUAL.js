export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'FIRST_ARG',
    action() {
      // display += num
    }
  },
  eqKey: {
    toStateId: 'EQUAL',
    action() {
      // display = display + op + acc2
    }
  },
  dotKey: {
    toStateId: 'FIRST_ARG_FLOAT',
    action() {
      // DISPLAY = '0.'
    }
  }
}

export const SEC_ARG_FLOAT = { actions, transitions }
