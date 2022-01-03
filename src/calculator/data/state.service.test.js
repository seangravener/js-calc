import { StateService } from './state.service.js';

const service = StateService.load();

describe('Given the StateService API', () => {
  beforeEach(() => {});

  it('is created', () => expect(service).toBeInstanceOf(StateService));
  it("and a machine is init'd", () =>
    expect(service.machine.value).toBe('START'));

  describe('#transition() should transition the machine state: ', () => {
    let machine = service.machine;

    beforeEach(() => {
      service.reset();
    });

    it('#transition("START", "dotKey"), the machine should transition', () => {
      expect(service.machine.value).toBe('START');
      service.machine.transition(service.machine.value, 'dotKey');
      expect(service.machine.value).toBe('FIRST_ARG_FLOAT');
    });

    it('#transition("START", "numKey"), the machine should transition', () => {
      expect(service.machine.value).toBe('START');
      service.machine.transition(service.machine.value, 'numKey');
      expect(service.machine.value).toBe('FIRST_ARG');
    });

    it('#transition("FIRST_ARG", "numKey"), the machine should transition', () => {
      service.set({ value: 'FIRST_ARG' });
      expect(service.machine.value).toBe('FIRST_ARG');

      service.machine.transition(service.machine.value, 'numKey');
      expect(service.machine.value).toBe('FIRST_ARG');
    });

    it('#transition("FIRST_ARG", "opKey"), the machine should transition', () => {
      // machine.value = 'FIRST_ARG'
      service.set({ value: 'FIRST_ARG' });
      expect(service.machine.value).toBe('FIRST_ARG');
      service.machine.transition(service.machine.value, 'opKey');

      expect(service.machine.value).toBe('OP');
    });
  });

  describe('state machine', () => {});
});
