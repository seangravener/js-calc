export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'SEC_ARG_FLOAT',
    action() {
      // display = display += num
    }
  },
  opKey: {
    toStateId: 'OP',
    action() {
      // op = opKey; acc1 = display;
    }
  }
}

export const SEC_ARG_DOT = { actions, transitions }
