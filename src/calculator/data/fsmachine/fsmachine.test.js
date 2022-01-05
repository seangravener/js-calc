import createMachine, { FSMachine } from './fsmachine.js';
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

  describe('FSMachine', () => {
    let fsmachine;

    beforeEach(() => {
      fsmachine = new FSMachine(testMachineDefinition);
    });

    it('is created', () => {
      expect(fsmachine).toBeInstanceOf(FSMachine);
    });

    it('is defined', () => {
      expect(fsmachine.definition).to
    });

    it('and can be toggled', () => {
      const fsmachine = new FSMachine(testMachineDefinition);
      const machine = fsmachine.machine;
      expect(machine.value).toBe('OFF');

      machine.transition(machine.value, 'toggle');
      expect(machine.value).toBe('ON');
    });
  });
});
