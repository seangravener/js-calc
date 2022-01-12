export const testMachineDefinition = {
  machineId: 'testMachine',
  initialState: 'OFF',

  OFF: {
    actions: {
      onEnter$(locals) {
        return new Promise((resolve, reject) => resolve(locals));
      },
      onExit$(locals) {
        return new Promise((resolve, reject) => resolve(locals));
      },
      onEnter() {},
      onExit() {},
    },
    transitions: {
      toggle: {
        toStateId: 'ON',
        action$(locals) {
          return new Promise((resolve, reject) => resolve(locals));
        },
        action() {},
      },
    },
  },

  ON: {
    actions: {
      onEnter$(locals) {
        return new Promise((resolve, reject) => resolve(locals));
      },
      onExit$(locals) {
        return new Promise((resolve, reject) => resolve(locals));
      },
      onEnter() {},
      onExit() {},
    },
    transitions: {
      toggle: {
        toStateId: 'OFF',
        action$(locals) {
          return new Promise((resolve, reject) => resolve(locals));
        },
        action() {},
      },
    },
  },
};
