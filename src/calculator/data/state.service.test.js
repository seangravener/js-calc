import { StateService } from './state.service.js';

describe('Given the StateService API', () => {
  const service = StateService.load();

  it('is created', () => expect(service).toBeInstanceOf(StateService));
  it("and the initial value is 'START'", () =>
    expect(service.fsmachine.value).toBe('START'));

  describe('and the user calls ', () => {
    let machine = service.fsmachine;

    beforeEach(() => {
      machine.reset();
    });

    it('#transition("START", "dotKey") -> FIRST_ARG_FLOAT', () => {
      expect(machine.value).toBe('START');
      machine
        .transition$(machine.value, 'dotKey')
        .then(({ value }) => expect(value).toBe('FIRST_ARG_FLOAT'));
    });

    it('#transition("START", "numKey") -> FIRST_ARG', () => {
      expect(machine.value).toBe('START');
      machine
        .transition$(machine.value, 'numKey')
        .then(({ value }) => expect(value).toBe('FIRST_ARG'));
    });

    it('#transition("FIRST_ARG", "numKey") -> FIRST_ARG', () => {
      service.set({ value: 'FIRST_ARG' });
      expect(machine.value).toBe('FIRST_ARG');

      machine
        .transition$(machine.value, 'numKey')
        .then(({ value }) => expect(value).toBe('FIRST_ARG'));
    });

    it('#transition("FIRST_ARG", "opKey") -> OP', () => {
      service.set({ value: 'FIRST_ARG' });
      expect(machine.value).toBe('FIRST_ARG');

      machine
        .transition$(machine.value, 'opKey')
        .then(({ value }) => expect(value).toBe('OP'));
    });
  });
});
