import { KeypadComponent } from './keypad.component.js';
import { Key } from '../base/Key.js';

describe('Given the <calc-keypad> module', () => {
  const keypad = new KeypadComponent();
  const machine = keypad.stateService.machine;
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
    machine.reset();
  };

  beforeEach(() => {
    events = {};
  });

  it('is created', () => expect(keypad).toBeInstanceOf(KeypadComponent));

  describe('and receives a valid input pattern', () => {
    let inputPattern = ['1', '+', '1'];
    let keys = inputPattern.map((symbol) => new Key(newKeyboardEvent(symbol)));

    beforeEach(() => {
      // setMockHandler();
      resetStateMachine();
    });

    it('should update as input is received', async () => {
      expect(machine.value).toBe('START');

      const locals = await keypad
        .press$(keys[0])
        .then(() => keypad.press$(keys[1]))
        .catch((err) => console.log(err));

      expect(locals.previousKey.symbol).toBe('1');
      expect(locals.currentKey.symbol).toBe('+');
      expect(locals.value).toBe('OP');
    });

    it('should transition to known states as input is received', async () => {
      let locals = {};
      expect(machine.value).toBe('START');

      locals = await keypad.press$(keys[0]);
      expect(locals.currentKey.symbol).toBe('1');
      expect(locals.value).toBe('FIRST_ARG');

      locals = await keypad.press$(keys[1]);
      expect(locals.currentKey.symbol).toBe('+');
      expect(locals.value).toBe('OP');

      locals = await keypad.press$(keys[2]);
      expect(locals.currentKey.symbol).toBe('1');
      expect(locals.value).toBe('OP');
    });
  });

  describe('and can compute input patterns', () => {
    let inputPattern = ['1', '+', '1'];
    let keys = inputPattern.map((symbol) => new Key(newKeyboardEvent(symbol)));

    beforeEach(() => {
      // setMockHandler();
      resetStateMachine();
    });

    it('should transition as input is received', async () => {
      expect(machine.value).toBe('START');

      const locals = await keypad
        .press$(keys[0])
        .then(() => keypad.press$(keys[2]))
        .catch((err) => console.log(err));

      expect(locals.previousKey.symbol).toBe('1');
      expect(locals.currentKey.symbol).toBe('1');
      // expect(locals.result).toBe('11');
      expect(locals.value).toBe('FIRST_ARG');
    });
  });
});
