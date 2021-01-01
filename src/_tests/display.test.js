import { DisplayComponent } from '../calculator/components/display/display.js';

describe('Display component', () => {
  const display = new DisplayComponent();

  beforeEach(() => {});

  test('should be created', () =>
    expect(display).toBeInstanceOf(DisplayComponent));

  test('should render correct operands after input', () => {
    // test display.locals
  });
});
