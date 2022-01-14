export const actions = {
  onEnter() {
    console.log('onEnter - JS-Calc is in FIRST_ARG')
  },
  onExit() {
    console.log('onExit - JS-Calc is in FIRST_ARG')
  }
}

export const transitions = {
  numKey: {
    toStateId: 'FIRST_ARG',
    action() {
      console.log('numKey! from FIRST_ARG')
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
