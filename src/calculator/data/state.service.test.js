import { StateService } from './state.service.js';

const service = StateService.load();

describe('Given the StateService API', () => {
  beforeEach(() => {});

  it('is created', () => expect(service).toBeInstanceOf(StateService));
  it("and a machine is init'd", () =>
    expect(service.machine.value).toBe('off'));

  describe('#transition() should transition the machine state: ', () => {
    const machine = service.machine;

    beforeEach(() => {});

    it('#transition("off", "toggle"), the machine should transition off->on', () => {
      expect(machine.value).toBe('off');
      machine.transition(machine.value, 'toggle');
      expect(machine.value).toBe('on');
    });
  });

  describe('state-machine', () => {});
});
