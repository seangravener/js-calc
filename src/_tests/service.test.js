import { DataService } from '../calculator/data/service.js';
import { _nullMemoryChunk_ } from '../calculator/data/memory.js';

const api = DataService.load();

describe('DataService', () => {
  beforeEach(() => {
    api.memory.clear();
  });

  test('should be created', () => {
    expect(api).toBeInstanceOf(DataService);
  });

  test('should set current chunk to [1, +]', () => {
    const state = { operator: '+', operandB: '1' };
    api.setCurrent(state);

    expect(api.current).toMatchObject(state);
  });

  test("should append digits '23' to current operandB", () => {
    const state = { operator: '', operandB: '1' };
    api.setCurrent(state);
    api.append('2');
    api.append('3');

    expect(api.current).toMatchObject({ operandB: '123' });
  });

  test('should backspace N digits from current operandB', () => {
    const state = { operandB: '123' };
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

  test('#storeChunks() should store data and insert null row', () => {
    const expected = {};
    const state = [
      ['1', '+'],
      ['2', '+'],
      ['3', '*']
    ];

    api.storeChunks(state);
    expect(api.memory.recall().length).toBe(4);
    expect(api.memory.recall()).toMatchObject([...state, _nullMemoryChunk_]);
    expect(api.current).toMatchObject({
      operator: null,
      operandB: '0'
    });
  });

  test("#get(n) should return n's values", () => {});
});
