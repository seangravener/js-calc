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

    it('should be provided a .current State', async () => {
      await displayService.set$(input);
      expect(displayService.current).toMatchObject(expected);
    });

    it('should allow omitting state keys', async () => {
      let symbol = '-';
      expected.operator = symbol;
      await displayService
        .set$(input)
        .then(displayService.set$({ operator: symbol }));
      expect(displayService.current.operator).toBe(expected.operator);
      expect(displayService.current).toMatchObject({
        ...expected,
        operator: expected.operator
      });

      symbol = '2';
      expected.operandA = symbol;
      await displayService.set$({ operandA: symbol });
      expect(displayService.current.operandA).toBe(expected.operandA);
      expect(displayService.current).toMatchObject({
        ...expected,
        operandA: expected.operandA
      });

      symbol = '3';
      expected.operandB = symbol;
      await displayService.set$({ operandB: symbol });
      expect(displayService.current.operandB).toBe(expected.operandB);
      expect(displayService.current).toMatchObject({
        ...expected,
        operandB: expected.operandB
      });
    });

    it('should recall previous states', async () => {
      const update = { operator: '+', operandB: '1' };

      await displayService.set$(input).then(displayService.set$(update));
      expect(displayService.recall(0)).toMatchObject({ ...input, ...update });
      expect(displayService.recall(1)).toMatchObject(input);
    });
  });
});
