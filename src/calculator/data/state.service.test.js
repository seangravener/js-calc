import { StateService, _STATE_ } from './state.service.js';
import { Key } from '../components/base/Key';

describe('Given the StateService API', () => {
  const service = StateService.load();

  it('is created', () => expect(service).toBeInstanceOf(StateService));
  it("and the initial value is 'START'", async () => {
    expect(service.machine.value).toBe('START');
  });

  describe('and given input', () => {
    const newKeyboardEvent = (key) =>
      new KeyboardEvent('KeyboardEvent', { key });
    let { current } = service;
    let inputPattern, previous, keys;

    beforeEach(() => {
      inputPattern = ['1', '+', '2'];
      keys = inputPattern.map((symbol) => new Key(newKeyboardEvent(symbol)));
    });

    it('should reset to default state', async () => {
      previous = service.current;
      expect(service.current).toMatchObject(current);

      const state = await service.set$(keys[0]);
      expect(state.value).toBe(service.machine.value);
      expect(previous).not.toMatchObject(service.current);

      service.reset();
      expect(service.current).toMatchObject(_STATE_);
    });
  });

  describe('should #transition() between states ', () => {
    let machine = service.machine;

    const mockKeypress$ = (symbol) => {
      return service.set$(
        new Key(new KeyboardEvent('kedown', { key: symbol }))
      );
    };

    beforeEach(() => {
      machine.reset();
    });

    it('(START, dotKey) -> FIRST_ARG_FLOAT', async () => {
      expect(machine.value).toBe('START');

      let nextState = await mockKeypress$('.');
      expect(machine.value).toBe('FIRST_ARG_FLOAT');
      expect(nextState.value).toBe('FIRST_ARG_FLOAT');
    });

    it('(START, numKey) -> FIRST_ARG', async () => {
      expect(machine.value).toBe('START');

      let nextState = await mockKeypress$('1');
      expect(nextState.value).toBe('FIRST_ARG');
      expect(machine.value).toBe('FIRST_ARG');
    });

    it('(FIRST_ARG, numKey) -> FIRST_ARG', async () => {
      expect(machine.value).toBe('START');

      let nextState = await mockKeypress$('1');
      expect(nextState.value).toBe('FIRST_ARG');
      expect(machine.value).toBe('FIRST_ARG');

      nextState = await mockKeypress$('1');
      expect(nextState.value).toBe('FIRST_ARG');
      expect(machine.value).toBe('FIRST_ARG');
    });

    it('(FIRST_ARG, opKey) -> OP', async () => {
      expect(machine.value).toBe('START');

      let nextState = await mockKeypress$('1')
        .then(() => mockKeypress$('+'))
        .then(() => mockKeypress$('1'));

      expect(machine.value).toBe('SEC_ARG');
      expect(nextState.value).toBe('SEC_ARG');
    });
  });
});
