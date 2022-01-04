import createMachine from './fsmachine.js';
import { testMachineDefinition } from './test.config';

describe('Given the Finite State Machine', () => {
  let machine = {};

  beforeEach(() => {
    machine = {};
  });

  it('is created with an initial value', () => {
    machine = createMachine(testMachineDefinition);
    expect(machine.value).toBe('OFF');
  });

  describe('and transitions', () => {
    it('from OFF -> ON', () => {
      machine = createMachine(testMachineDefinition);
      expect(machine.value).toBe('OFF');

      machine.transition(machine.value, 'toggle');
      expect(machine.value).toBe('ON');
    });

    it('from OFF -> ON -> OFF -> ON -> OFF', () => {
      machine = createMachine(testMachineDefinition);
      expect(machine.value).toBe('OFF');

      machine.transition(machine.value, 'toggle');
      expect(machine.value).toBe('ON');

      machine.transition(machine.value, 'toggle');
      expect(machine.value).toBe('OFF');

      machine.transition(machine.value, 'toggle');
      expect(machine.value).toBe('ON');

      machine.transition(machine.value, 'toggle');
      expect(machine.value).toBe('OFF');
    });
  });
});
