import { StateService } from './state.service.js';

const service = StateService.load();

describe('Given the StateService API', () => {
  beforeEach(() => {});

  it('is created', () => expect(service).toBeInstanceOf(StateService));
  it("and the initial value is 'START'", () =>
    expect(service.fsmachine.value).toBe('START'));

  describe('and the user calls ', () => {
    let machine = service.fsmachine;

    beforeEach(() => {
      service.reset();
    });

    it('#transition("START", "dotKey") -> FIRST_ARG_FLOAT', () => {
      expect(service.fsmachine.value).toBe('START');
      service.fsmachine.transition(service.fsmachine.value, 'dotKey');
      expect(service.fsmachine.value).toBe('FIRST_ARG_FLOAT');
    });

    it('#transition("START", "numKey") -> FIRST_ARG', () => {
      expect(service.fsmachine.value).toBe('START');
      service.fsmachine.transition(service.fsmachine.value, 'numKey');
      expect(service.fsmachine.value).toBe('FIRST_ARG');
    });

    it('#transition("FIRST_ARG", "numKey") -> FIRST_ARG', () => {
      service.set({ value: 'FIRST_ARG' });
      expect(service.fsmachine.value).toBe('FIRST_ARG');

      service.fsmachine.transition(service.fsmachine.value, 'numKey');
      expect(service.fsmachine.value).toBe('FIRST_ARG');
    });

    it('#transition("FIRST_ARG", "opKey") -> OP', () => {
      service.set({ value: 'FIRST_ARG' });
      expect(service.fsmachine.value).toBe('FIRST_ARG');
      service.fsmachine.transition(service.fsmachine.value, 'opKey');

      expect(service.fsmachine.value).toBe('OP');
    });
  });

  describe('state machine', () => {});
});
