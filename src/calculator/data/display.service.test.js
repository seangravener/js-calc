import { DisplayService, _DISPLAY_ } from './display.service.js';

describe('Given the DisplayService', () => {
  const displayService = DisplayService.load();

  it('is created', () => expect(displayService).toBeInstanceOf(DisplayService));
  it('should be blank', () => {
    expect(displayService.current).toMatchObject(_DISPLAY_);
  });

  describe('and given input', () => {
    let input, expected;

    beforeEach(() => {
      input = { operandA: '1', operator: '+', operandB: '2' };
      expected = input;
    });

    it('should be provided current state', () => {
      displayService.set(input);
      expect(displayService.current).toMatchObject(expected);
    });

    it('#set({}) should allow omitting state keys', () => {
      let symbol = '-';
      expected.operator = symbol;
      displayService.set(input);
      displayService.set({ operator: symbol });

      expect(displayService.current.operator).toBe(expected.operator);
      expect(displayService.current).toMatchObject({
        ...expected,
        operator: expected.operator
      });

      symbol = '2';
      expected.operandA = symbol;
      displayService.set({ operandA: symbol });
      expect(displayService.current.operandA).toBe(expected.operandA);
      expect(displayService.current).toMatchObject({
        ...expected,
        operandA: expected.operandA
      });

      symbol = '3';
      expected.operandB = symbol;
      displayService.set({ operandB: symbol });
      expect(displayService.current.operandB).toBe(expected.operandB);
      expect(displayService.current).toMatchObject({
        ...expected,
        operandB: expected.operandB
      });
    });

    it('should recall previous states', () => {
      const update = { operator: '+', operandB: '1' };

      displayService.set(input);
      displayService.set(update);
      expect(displayService.current).toMatchObject({ ...input, ...update });
      expect(displayService.recall(0)).toMatchObject({ ...input, ...update });
      expect(displayService.recall(1)).toMatchObject(input);
    });

    it('#append() digits', () => {
      displayService.set(input);

      displayService.append({ operandA: '1' });
      expect(displayService.current).toMatchObject({ operandA: '11' });

      displayService.append({ operandA: '2' });
      expect(displayService.current).toMatchObject({ operandA: '112' });

      displayService.append({ operandB: '2' });
      expect(displayService.current).toMatchObject({ operandB: '22' });
    });

    it('#backspace() single digits', () => {
      displayService.set(input);

      displayService.append({ operandB: '22' });
      expect(displayService.current).toMatchObject({ operandB: '222' });

      displayService.backspace();
      expect(displayService.current).toMatchObject({ operandB: '22' });

      displayService.backspace();
      expect(displayService.current).toMatchObject({ operandB: '2' });
    });

    it('#backspace(n) digits', () => {
      displayService.set(input);

      displayService.append({ operandB: '123' });
      expect(displayService.current).toMatchObject({ operandB: '2123' });

      displayService.backspace(1);
      expect(displayService.current).toMatchObject({ operandB: '212' });

      displayService.backspace(3);
      expect(displayService.current).toMatchObject({ operandB: '0' });
    });

    it('should calculate a result', () => {
      
    });

    it('should reflect updated state', () => {
      
    });
  });
});
