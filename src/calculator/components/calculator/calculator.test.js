import { CalculatorComponent } from './calculator.js';

describe('Calculator component', () => {
  const com = new CalculatorComponent();

  beforeEach(() => {});

  describe('should successively calculate total', () => {
    test('1+1 = 2', () => {
      com.api.store([
        ['1', '+'],
        ['1', '']
      ]);
      expect(com.api.current).toMatchObject({ operandA: '2' });
    });

    test('2*2 = 4', () => {
      com.api.current = { operator: '*' };
      com.api.store(['2', '']);
      expect(com.api.current).toMatchObject({ operandA: '4' });
    });

    test('4+1+2+3 = 10', () => {
      com.api.current = { operator: '+' };
      com.api.store([
        ['1', '+'],
        ['2', '+'],
        ['3', '']
      ]);
      expect(com.api.current).toMatchObject({ operandA: '10' });
    });

    test('set operator to "-"', () => {
      com.api.current = { operator: '-' }; // set current?
      expect(com.api.current).toMatchObject({ operandA: '10', operator: '-' });
    });

    test('10-10 = 0', () => {
      com.api.store([['10', '+']]);
      expect(com.api.current).toMatchObject({ operandA: '0' });
    });

    test('set operandB to "10"', () => {
      com.api.current = { operandB: 10 };
      expect(com.api.current).toMatchObject({ operandA: '10' });
    });
  });
});
