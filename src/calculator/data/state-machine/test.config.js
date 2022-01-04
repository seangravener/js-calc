export const testMachineDefinition = {
  initialState: 'OFF',
  value: '',

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
