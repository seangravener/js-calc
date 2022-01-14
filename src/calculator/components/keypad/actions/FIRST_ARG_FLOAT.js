export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'FIRST_ARG_FLOAT',
    action() {
      // display = display += num
    }
  }
}

export const FIRST_ARG_FLOAT = { actions, transitions }
