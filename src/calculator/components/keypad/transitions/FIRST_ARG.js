export const actions = {
  onEnter() {},
  onExit() {}
}

export const transitions = {
  numKey: {
    toStateId: 'FIRST_ARG',
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

export const FIRST_ARG = { actions, transitions }
