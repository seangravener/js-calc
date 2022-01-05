export const FIRST_ARG = {
  actions: {
    onEnter() {
      // console.log('FIRST_ARG action: onEnter');
    },
    onExit() {
      // console.log('FIRST_ARG action: onExit');
    }
  },
  transitions: {
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
}
