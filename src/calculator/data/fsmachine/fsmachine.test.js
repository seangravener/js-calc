import { FSMachine } from './fsmachine.js';

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
      onExit() {}
    },
    transitions: {
      toggle: {
        toStateId: 'ON',
        action$(locals) {
          return new Promise((resolve, reject) => resolve(locals));
        },
        action() {}
      }
    }
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
      onExit() {}
    },
    transitions: {
      toggle: {
        toStateId: 'OFF',
        action$(locals) {
          return new Promise((resolve, reject) => resolve(locals));
        },
        action() {}
      }
    }
  }
};

describe('Given the Finite State Machine', () => {
  let machine = new FSMachine(testMachineDefinition);

  it('is created with an initial value', () => {
    expect(machine.value).toBe('OFF');
  });

  describe('should transition ', () => {
    beforeEach(() => {
      machine.reset();
    });

    it('from OFF -> ON', async () => {
      expect(machine.value).toBe('OFF');

      const { value } = await machine.transition$(machine.value, 'toggle');
      expect(value).toBe('ON');
      expect(machine.value).toBe('ON');
    });

    it('from OFF -> ON -> OFF -> ON -> OFF', async () => {
      expect(machine.value).toBe('OFF');

      let nextState = await machine.transition$(machine.value, 'toggle');
      expect(nextState.value).toBe('ON');
      expect(machine.value).toBe('ON');

      nextState = await machine.transition$(machine.value, 'toggle');
      expect(nextState.value).toBe('OFF');
      expect(machine.value).toBe('OFF');

      nextState = await machine.transition$(machine.value, 'toggle');
      expect(nextState.value).toBe('ON');
      expect(machine.value).toBe('ON');

      nextState = await machine.transition$(machine.value, 'toggle');
      expect(nextState.value).toBe('OFF');
      expect(machine.value).toBe('OFF');
    });
  });

  describe('FSMachine', () => {
    let machine = new FSMachine(testMachineDefinition);

    beforeEach(() => {
      machine.reset();
    });

    it('is created', () => {
      expect(machine).toBeInstanceOf(FSMachine);
    });

    it('and can be toggled', async () => {
      expect(machine.value).toBe('OFF');

      const nextState = await machine.transition$(machine.value, 'toggle');
      expect(nextState.value).toBe('ON');
    });
  });
});
