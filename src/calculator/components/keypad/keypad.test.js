import { KeypadComponent } from './keypad.component.js';
import { Key } from '../base/Key.js';
import { calcMachineDefinition } from '../../data/state.config.js';

describe('Given the <calc-keypad> module', () => {
  const keypad = new KeypadComponent();
  const localKeyHandler = keypad.press$.bind(keypad);
  const newKeyboardEvent = (key) => new KeyboardEvent('KeyboardEvent', { key });
  // @todo const newMouseEvent = (key) => new KeyboardEvent('KeyboardEvent', { key });
  let events = {};

  const setMockHandler = () => {
    const mockKeyHandler = jest.fn((key) => {
      events[key.symbol] = localKeyHandler;
      return localKeyHandler(key);
    });
    // keypad.press = mockKeyHandler.bind(keypad);
  };

  const resetStateMachine = () => {
    keypad.stateService.set(calcMachineDefinition);
  };

  beforeEach(() => {
    events = {};
    setMockHandler();
    resetStateMachine();
  });

  it('is created', () => expect(keypad).toBeInstanceOf(KeypadComponent));

  describe('and receives a valid input pattern', () => {
    let inputPattern = [];
    let keys = [];

    beforeEach(() => {
      inputPattern = ['1', '+', '1'];
      keys = inputPattern.map((symbol) => new Key(newKeyboardEvent(symbol)));
    });

    it('should transition as input is received', async () => {
      expect(keypad.stateService.fsmachine.value).toBe('START');

      await keypad
        .press$(keys[0])
        .then(() => keypad.press$(keys[1]))
        .then(() => keypad.press$(keys[2]))
        .then((locals) => {
          expect(locals.previousKey.symbol).toBe('+');
          expect(locals.currentKey.symbol).toBe('1');
          expect(locals.value).toBe('1');
        })
        .catch((err) => console.log(err));
    });

    it('should transition to known states as input is received', async () => {
      expect(keypad.stateService.fsmachine.value).toBe('START');

      await keypad
        .press$(keys[0])
        .then(({ currentKey, value }) => {
          expect(currentKey.symbol).toBe('1');
          expect(value).toBe('FIRST_ARG');

          return keypad.press$(keys[1]);
        })
        .then(({ currentKey, value }) => {
          expect(currentKey.symbol).toBe('+');
          expect(value).toBe('OP');

          return keypad.press$(keys[2]);
        })
        .then(({ currentKey, value }) => {
          expect(currentKey.symbol).toBe('1');
          expect(value).toBe('OP');
        })
        .catch((err) => console.log(err));
    });
  });
});
