import { StateService, _STATE_ } from './state.service.js';
import { Key } from '../components/base/Key';

describe('Given the StateService API', () => {
  const service = StateService.load();

  it('is created', () => expect(service).toBeInstanceOf(StateService));
  it("and the initial value is 'START'", async () => {
    expect(service.machine.value).toBe('START');
  });

  describe('and given input', () => {
    let { current } = service;
    let inputPattern, previous, keys;
    const newKeyboardEvent = (key) =>
      new KeyboardEvent('KeyboardEvent', { key });

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

  describe('and transitions between states: ', () => {
    let machine = service.machine;

    const mockKeypress$ = (symbol) => {
      return service.set$(
        new Key(new KeyboardEvent('kedown', { key: symbol }))
      );
    };

    beforeEach(() => {
      machine.reset();
    });

    describe('START', () => {
      it('transition(START, dotKey) // -> FIRST_ARG_FLOAT', async () => {
        expect(machine.value).toBe('START');

        let nextState = await mockKeypress$('.');
        expect(machine.value).toBe('FIRST_ARG_FLOAT');
        expect(nextState.value).toBe('FIRST_ARG_FLOAT');
      });

      it('transition(START, numKey) // -> FIRST_ARG', async () => {
        expect(machine.value).toBe('START');

        let nextState = await mockKeypress$('1');
        expect(nextState.value).toBe('FIRST_ARG');
        expect(machine.value).toBe('FIRST_ARG');
      });
    });

    describe('FIRST_ARG', () => {
      it('transition(FIRST_ARG, numKey) // -> FIRST_ARG', async () => {
        expect(machine.value).toBe('START');

        let nextState = await mockKeypress$('1');
        expect(nextState.value).toBe('FIRST_ARG');
        expect(machine.value).toBe('FIRST_ARG');

        nextState = await mockKeypress$('1');
        expect(nextState.value).toBe('FIRST_ARG');
        expect(machine.value).toBe('FIRST_ARG');
      });

      it('transition(FIRST_ARG, opKey) // -> OP', async () => {
        expect(machine.value).toBe('START');

        let nextState = await mockKeypress$('1').then(() => mockKeypress$('+'));

        expect(machine.value).toBe('OP');
        expect(nextState.value).toBe('OP');
      });
    });

    describe('SEC_ARG', () => {
      it('transition(SEC_ARG, dotKey) // -> SEC_ARG_FLOAT', async () => {
        expect(machine.value).toBe('START');

        let nextState = await mockKeypress$('1')
          .then(() => mockKeypress$('+'))
          .then(() => mockKeypress$('1'))
          .then(() => mockKeypress$('.'));

        expect(machine.value).toBe('SEC_ARG_FLOAT');
        expect(nextState.value).toBe('SEC_ARG_FLOAT');
      });

      it('transition(SEC_ARG, opKey) // -> OP', async () => {
        expect(machine.value).toBe('START');

        let nextState = await mockKeypress$('1')
          .then(() => mockKeypress$('+'))
          .then(() => mockKeypress$('1'))
          .then(() => mockKeypress$('+'));

        expect(machine.value).toBe('OP');
        expect(nextState.value).toBe('OP');
      });

      it('transition(SEC_ARG, numKey) // -> SEC_ARG', async () => {
        expect(machine.value).toBe('START');

        let nextState = await mockKeypress$('1')
          .then(() => mockKeypress$('+'))
          .then(() => mockKeypress$('1'))
          .then(() => mockKeypress$('1'));

        expect(machine.value).toBe('SEC_ARG');
        expect(nextState.value).toBe('SEC_ARG');
      });

      it('transition(SEC_ARG, eqKey) // -> EQUAL', async () => {
        expect(machine.value).toBe('START');

        let nextState = await mockKeypress$('1')
          .then(() => mockKeypress$('+'))
          .then(() => mockKeypress$('1'))
          .then(() => mockKeypress$('='));

        expect(machine.value).toBe('EQUAL');
        expect(nextState.value).toBe('EQUAL');
      });
    });

    describe('OP', () => {
      it('transition(OP, eqKey) // -> OP', async () => {
        expect(machine.value).toBe('START');

        let nextState = await mockKeypress$('1')
          .then(() => mockKeypress$('+'))
          .then(() => mockKeypress$('+'));

        expect(machine.value).toBe('OP');
        expect(nextState.value).toBe('OP');
      });

      it('transition(OP, numKey) // -> OP', async () => {
        expect(machine.value).toBe('START');

        let nextState = await mockKeypress$('1')
          .then(() => mockKeypress$('+'))
          .then(() => mockKeypress$('='));

        expect(machine.value).toBe('OP');
        expect(nextState.value).toBe('OP');
      });

      it('transition(OP, dotKey) // -> SEC_ARG_DOT', async () => {
        expect(machine.value).toBe('START');

        let nextState = await mockKeypress$('1')
          .then(() => mockKeypress$('+'))
          .then(() => mockKeypress$('.'));

        expect(machine.value).toBe('SEC_ARG_DOT');
        expect(nextState.value).toBe('SEC_ARG_DOT');
      });
    });

    describe('EQUAL', () => {
      it('transition(EQUAL, eqKey) // -> EQUAL', async () => {
        expect(machine.value).toBe('START');

        let nextState = await mockKeypress$('1')
          .then(() => mockKeypress$('+'))
          .then(() => mockKeypress$('1'))
          .then(() => mockKeypress$('='))
          .then(() => mockKeypress$('='));

        expect(machine.value).toBe('EQUAL');
        expect(nextState.value).toBe('EQUAL');
      });

      it('transition(EQUAL, dotKey) // -> FIRST_ARG_FLOAT', async () => {
        expect(machine.value).toBe('START');

        let nextState = await mockKeypress$('1')
          .then(() => mockKeypress$('+'))
          .then(() => mockKeypress$('1'))
          .then(() => mockKeypress$('='))
          .then(() => mockKeypress$('.'));

        expect(machine.value).toBe('FIRST_ARG_FLOAT');
        expect(nextState.value).toBe('FIRST_ARG_FLOAT');
      });
    });

    // continue transition tests
    // then add actions to transitions/*
  });
});
