import { DisplayComponent } from './display.js';

describe('Display component', () => {
  const display = new DisplayComponent();

  beforeEach(() => {
  });

  test('should be created', () =>
    expect(display).toBeInstanceOf(DisplayComponent));

  test('should reflect correct operands after keyboard input', () => {
    // test display.locals
  });
});
