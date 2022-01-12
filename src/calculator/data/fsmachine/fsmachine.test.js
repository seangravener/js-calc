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

  describe('and uses Promises to transition ', () => {
    it('from OFF -> ON', async () => {
      machine = createMachine(testMachineDefinition);
      expect(machine.value).toBe('OFF');

      const { value } = await machine.transition$(machine.value, 'toggle');
      expect(value).toBe('ON');
      expect(machine.value).toBe('ON');
    });

    it('from OFF -> ON -> OFF -> ON -> OFF', async () => {
      machine = createMachine(testMachineDefinition);
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

    it('and can be toggled', () => {
      const fsmachine = new FSMachine(testMachineDefinition);
      const machine = fsmachine.machine;
      expect(machine.value).toBe('OFF');

      machine.transition(machine.value, 'toggle');
      expect(machine.value).toBe('ON');
    });
  });
});
