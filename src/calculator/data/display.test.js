import { DisplayService, _BLANK_ } from './display.service.js';

describe.only('Given the DisplayService', () => {
  const service = DisplayService.load();

  it('is created', () => expect(service).toBeInstanceOf(DisplayService));
  it('should be blank', () => {
    expect(service.current).toMatchObject(_BLANK_);
  });

  describe('and given input', () => {
    let input, expected;

    beforeEach(() => {
      input = { operandA: '1', operator: '+', operandB: '2' };
      expected = input;
      service.set(input);
    });

    it('should provide a current state', () => {
      expect(service.current).toMatchObject(expected);
    });

    it('should allow omitting state keys', () => {
      let symbol = '-';
      expected.operator = symbol;
      service.set({ operator: symbol });

      expect(service.current.operator).toBe(expected.operator);
      expect(service.current).toMatchObject({
        ...expected,
        operator: expected.operator
      });

      symbol = '2';
      expected.operandA = symbol;
      service.set({ operandA: symbol });
      expect(service.current.operandA).toBe(expected.operandA);
      expect(service.current).toMatchObject({
        ...expected,
        operandA: expected.operandA
      });

      symbol = '3';
      expected.operandB = symbol;
      service.set({ operandB: symbol });
      expect(service.current.operandB).toBe(expected.operandB);
      expect(service.current).toMatchObject({
        ...expected,
        operandB: expected.operandB
      });
    });

    it('should reflect updated states', () => {
      // service.set({ operator: '+', operandB: '1' });
      // expect(service.previous()).toMatchObject(expected);
    });
  });
});
