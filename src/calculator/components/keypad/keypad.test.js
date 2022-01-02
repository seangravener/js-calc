import { KeypadComponent } from './keypad.js';
import { Key } from '../base/Key.js';

describe('Given the <calc-keypad> module', () => {
  const keypad = new KeypadComponent();
  const localKeyHandler = keypad.press.bind(keypad);
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

  beforeEach(() => {
    events = {};
    setMockHandler();
  });

  it('is created', () => expect(keypad).toBeInstanceOf(KeypadComponent));

  describe('and receives a valid input pattern', () => {
    let inputPattern = [];
    let keys = [];

    beforeEach(() => {
      inputPattern = ['1', '+', '1'];
      keys = inputPattern.map((symbol) => new Key(newKeyboardEvent(symbol)));
    });

    it('should ', () => {
      return keypad.press(keys[0]).then(({ previousKey, currentKey, api }) => {
        expect(currentKey.symbol).toBe('1');
        expect(previousKey.symbol).toBe(undefined);

        // console.log(api.current);
        expect(api.current).toMatchObject({
          operandA: '1',
          operator: null,
          operandB: '1'
        });
      });
    });

    // return a promise of promises?
    // it('should do pattern', () => {
    //   return new Promise(() => {

    //     return (res, rej) => res()
    //   }).then((locals) => {
    //     console.log(locals)
    //   })
    //   keys.forEach((key) => {
    //     keys.press(key).then(() => {})
    //   })
    // });

    // keys.forEach((key) => {
    //   it('presses a key', () => {
    //     return keypad.press(key).then(({ currentKey, api }) => {
    //       expect(currentKey.symbol).toBe('1')
    //     })
    //   })
    // })

    // test('#press() should update currentKey and previousKey', () => {
    //   jest.spyOn(keypad, 'press');
    //   let event = {};

    //   event = newKeyboardEvent('Enter');
    //   keypad.press(event);
    //   expect(!!events['Enter']).toBe(true);
    //   expect(keypad.currentKey.symbol).toBe('Enter');

    //   event = newKeyboardEvent('1');
    //   keypad.press(event);
    //   expect(!!events['1']).toBe(true);
    //   expect(keypad.previousKey.symbol).toBe('Enter');
    //   expect(keypad.currentKey.symbol).toBe('1');
    // });
  });
});
