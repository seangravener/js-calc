import { CalculatorComponent } from './calculator.js';

describe('Calculator component', () => {
  const com = new CalculatorComponent();

  beforeEach(() => {});

  describe('should successively calculate total', () => {
    test('2*2 = 4', () => {
      // com.api.setCurrent({ operator: '*' });
      // expect(com.api.current).toMatchObject({ operandA: '4' });
    });
  });
});
