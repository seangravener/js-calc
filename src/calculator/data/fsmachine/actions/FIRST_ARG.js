export const FIRST_ARG = {
  actions: {
    onEnter() {},
    onExit() {}
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
