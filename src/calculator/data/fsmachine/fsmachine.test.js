import createMachine, { FSMachine } from './fsmachine.js';
import { testMachineDefinition } from './test.config';

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

      await machine
        .transition$(machine.value, 'toggle')
        .then(({ value }) => expect(value).toBe('ON'));
    });

    it('should have expected properties', async () => {
      expect(machine.value).toBe('OFF');

      machine
        .transition$(machine.value, 'toggle')
        .then(({ value }) => expect(value).toBe('ON'));
    });
  });
});
