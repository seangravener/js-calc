export const FIRST_ARG_FLOAT = {
  actions: {
    onEnter() {
      // console.log('FIRST_ARG_FLOAT action: onEnter');
    },
    onExit() {
      // console.log('FIRST_ARG_FLOAT action: onExit');
    },
  },
  transitions: {
    numKey: {
      toStateId: 'FIRST_ARG_FLOAT',
      action() {
        // display = display += num
      },
    },
    opKey: {
      toStateId: 'OP',
      action() {
        // op = opKey; acc1 = display;
      },
    },
  },
}