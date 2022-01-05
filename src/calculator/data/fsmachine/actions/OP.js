export const OP = {
  actions: {
    onEnter() {
      // console.log('OP action: onEnter');
    },
    onExit() {
      // console.log('OP action: onExit');
    },
  },
  transitions: {
    numKey: {
      toStateId: 'SEC_ARG',
      action() {
        // display = num
      },
    },
    dotKey: {
      toStateId: 'SEC_ARG_DOT',
      action() {
        // display = '0.'
      },
    },
  },
}