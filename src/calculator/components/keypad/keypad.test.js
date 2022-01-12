import { KeypadComponent } from './keypad.component.js';
import { Key } from '../base/Key.js';

describe('Given the <calc-keypad> module', () => {
  const keypad = new KeypadComponent();
  const machine = keypad.stateService.fsmachine;
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
    keypad.stateService.fsmachine.reset();
  };

  beforeEach(() => {
    events = {};
  });

  it('is created', () => expect(keypad).toBeInstanceOf(KeypadComponent));

  describe('and receives a valid input pattern', () => {
    let inputPattern = ['1', '+', '1'];
    let keys = inputPattern.map((symbol) => new Key(newKeyboardEvent(symbol)));

    beforeEach(() => {
      setMockHandler();
      resetStateMachine();
    });

    it('should transition as input is received', async () => {
      expect(machine.value).toBe('START');

      await keypad
        .press$(keys[0])
        .then(() => keypad.press$(keys[1]))
        .then(() => keypad.press$(keys[2]))
        .then((locals) => {
          expect(locals.previousKey.symbol).toBe('+');
          expect(locals.currentKey.symbol).toBe('1');
          expect(locals.value).toBe('OP');
        })
        .catch((err) => console.log(err));
    });

    it('should transition to known states as input is received', async () => {
      expect(machine.value).toBe('START');

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
