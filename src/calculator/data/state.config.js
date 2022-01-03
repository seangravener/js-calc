export const calcMachineDefinition = {
  initialState: 'START',
  value: '',

  START: {
    actions: {
      onEnter() {
        // console.log('START action: onEnter');
      },
      onExit() {
        // console.log('START action: onExit');
      },
    },
    transitions: {
      numKey: {
        toStateId: 'FIRST_ARG',
        action() {
          // display = num
        },
      },
      dotKey: {
        toStateId: 'FIRST_ARG_FLOAT',
        action() {
          // display = '0.'
        },
      },
    },
  },
  FIRST_ARG: {
    actions: {
      onEnter() {
        // console.log('FIRST_ARG action: onEnter');
      },
      onExit() {
        // console.log('FIRST_ARG action: onExit');
      },
    },
    transitions: {
      numKey: {
        toStateId: 'FIRST_ARG',
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
  },
  FIRST_ARG_FLOAT: {
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
  },
  OP: {
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
  },
};
