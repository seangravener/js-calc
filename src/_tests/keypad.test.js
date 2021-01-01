import { KeypadComponent } from '../calculator/components/keypad/keypad.js';

describe('Keypad module', () => {
  const com = new KeypadComponent();
  const localKeyHandler = com.handleKeyPress.bind(com);
  const newKeyboardEvent = (key) => new KeyboardEvent('KeyboardEvent', { key });
  let events = {};

  beforeEach(() => {
    com.handleKeyPress = localKeyHandler;
    events = {};

    const mockKeyHandler = jest.fn((event) => {
      events[event.key || event.target.textContent] = localKeyHandler;
      localKeyHandler(event);
    });
    com.handleKeyPress = mockKeyHandler.bind(com);
  });

  test('#handleKeyPress() should update currentKey and previousKey', () => {
    jest.spyOn(com, 'handleKeyPress');
    let event = {};

    event = newKeyboardEvent('Enter');
    com.handleKeyPress(event);
    expect(!!events['Enter']).toBe(true)
    expect(com.currentKey.symbol).toBe('Enter');

    event = newKeyboardEvent('1');
    com.handleKeyPress(event);
    expect(!!events['1']).toBe(true)
    expect(com.previousKey.symbol).toBe('Enter');
    expect(com.currentKey.symbol).toBe('1');
  });
});
