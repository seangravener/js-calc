import { KeypadComponent } from './keypad.component.js';
import { Key } from '../base/Key.js';

describe('Given the <calc-keypad> module', () => {
  const keypad = new KeypadComponent();
  const service = keypad.stateService;
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
    // machine.reset();
    service.reset()
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

      await keypad.press$(keys[0]).then(() => keypad.press$(keys[1]));
      expect(service.previousKey.symbol).toBe('1');
      expect(service.currentKey.symbol).toBe('+');
      expect(service.machine.value).toBe('OP');
    });

    it('should transition to known states as input is received', async () => {
      expect(machine.value).toBe('START');

      await keypad.press$(keys[0]);
      expect(service.currentKey.symbol).toBe('1');
      expect(service.machine.value).toBe('FIRST_ARG');

      await keypad.press$(keys[1]);
      expect(service.currentKey.symbol).toBe('+');
      expect(service.machine.value).toBe('OP');

      await keypad.press$(keys[2]);
      expect(service.currentKey.symbol).toBe('1');
      expect(service.machine.value).toBe('SEC_ARG');
    });
  });

  describe('and can compute input patterns', () => {
    let inputPattern = ['1', '+', '2'];
    let keys = inputPattern.map((symbol) => new Key(newKeyboardEvent(symbol)));

    beforeEach(() => {
      // setMockHandler();
      resetStateMachine();
    });

    it('should transition as input is received', async () => {
      expect(machine.value).toBe('START');
      expect(service.display.value).toBe('0.');

      await keypad.press$(keys[0]) //.then(() => keypad.press$(keys[0]));
      expect(machine.value).toBe('FIRST_ARG');
      expect(service.currentKey.symbol).toBe('1');
      expect(service.previousKey).toMatchObject({});

      await keypad.press$(keys[0]).then(() => keypad.press$(keys[0]));
      expect(machine.value).toBe('FIRST_ARG');
      expect(service.display.value).toBe('111');
      expect(service.previousKey.symbol).toBe('1');

      await keypad.press$(keys[1]);
      expect(machine.value).toBe('OP');
      expect(service.display.value).toBe('111');
      expect(service.currentKey.symbol).toBe('+');
      expect(service.previousKey.symbol).toBe('1');
      expect(service.display.current.operator).toBe('+');

      await keypad.press$(keys[2]);
      expect(machine.value).toBe('SEC_ARG');
      expect(service.display.value).toBe('2');
      expect(service.currentKey.symbol).toBe('2');
      expect(service.previousKey.symbol).toBe('+');
      expect(service.display.current.operator).toBe('+');
      expect(service.display.current.operandB).toBe('2');
    });
  });
});
