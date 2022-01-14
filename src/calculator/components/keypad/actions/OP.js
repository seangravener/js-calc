export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'SEC_ARG',
    action() {
      // display = num
    }
  },
  dotKey: {
    toStateId: 'SEC_ARG_DOT',
    action() {
      // display = '0.'
    }
  }
}

export const OP = { actions, transitions }
