export const OP = {
  actions: {
    onEnter() {},
    onExit() {}
  },
  transitions: {
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
}
