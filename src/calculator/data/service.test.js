import { DataService } from './service.js';
import { _nullMemoryChunk_ } from './memory.js';

const api = DataService.load();

describe('Given the DataService API', () => {
  beforeEach(() => {
    api.memory.clear();
  });

  it('is created', () => expect(api).toBeInstanceOf(DataService));

  describe('and the user calls', () => {
    let state = {};

    beforeEach(() => {
      api.memory.clear();
    });

    it('#setCurrent({}) to set chunk, then api.current should reflect', () => {
      state = { operator: '+', operandB: '1' };
      api.setCurrent(state);
      expect(api.current).toMatchObject(state);
    });

    it('#append(`n`) to update operandB, then api.current should reflect', () => {
      api.setCurrent(state);
      api.append('2');
      api.append('3');
      expect(api.current).toMatchObject({ operandB: '123' });

      api.setCurrent(state);
      api.append('23');
      expect(api.current).toMatchObject({ operandB: '123' });
    });

    it('#backspace(n) to update operandB, then api.current should reflect', () => {
      state = { operandB: '123' };
      const expected = { operandB: '1' };

      api.setCurrent(state);
      api.backspace();
      api.backspace();
      expect(api.current).toMatchObject(expected);

      api.append('23');
      api.backspace(2);
      expect(api.current).toMatchObject(expected);

      api.append('23');
      api.backspace(3);
      api.backspace(3);
      expect(api.current).not.toMatchObject(expected);
      expect(api.current.operandB).toEqual('0');
    });

    it('#storeChunks(chunks) to insert memory, then api.memory should reflect', () => {
      let obj = {};
      const localState = [
        ['2', '+'],
        ['3', '+'],
        ['4', '*']
      ];

      api.storeChunks(localState);
      expect(api.memory.recall().length).toBe(4);
      expect(api.memory.recall()).toMatchObject([
        ...localState,
        _nullMemoryChunk_
      ]);

      obj = { operator: '*', operandB: '4' };
      expect(api.previous).toMatchObject(obj);

      obj = { operator: null, operandB: '0' };
      expect(api.current).toMatchObject(obj);
    });
  });
});
