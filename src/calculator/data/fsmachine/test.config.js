// import actions and events

export const testMachineDefinition = {
  machineId: 'testMachine',
  initialState: 'OFF',

  OFF: {
    actions: {
      onEnter() {
        console.log('OFF action: onEnter');
      },
      onExit() {
        console.log('OFF action: onExit');
      },
    },
    transitions: {
      toggle: {
        toStateId: 'ON',
        action() {
          console.log('This is a transition action for "toggle" OFF -> ON');
        },
      },
    },
  },

  ON: {
    actions: {
      onEnter() {
        console.log('ON:onEnter');
      },
      onExit() {
        console.log('ON:onEnter');
      },
    },
    transitions: {
      toggle: {
        toStateId: 'OFF',
        action() {
          console.log('This is a transition action for "toggle" on->OFF');
        },
      },
    },
  },
};
