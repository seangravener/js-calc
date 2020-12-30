import { Memory } from './memory.js';

const _nullMemoryChunk_ = ['0', null];
let memory = Memory.load();

describe('Memory Module', () => {
  beforeEach(() => {
    memory.clear();
  });

  describe('#recall()', () => {
    const expected = [
      ['1', '+'],
      ['2', '+'],
      ['3', '+']
    ];

    beforeEach(() => {
      memory.store(expected);
    });

    test('#recall() should return all memory', () => {
      const data = memory.recall();

      expect(data.length).toBe(4);
      expect(data).toMatchObject([...expected, _nullMemoryChunk_]);
    });

    test('#recall(N) should return N positions', () => {
      const [one, two, three] = expected;
      let data = [];

      // recall(1) (get last position)
      data = memory.recall(1);
      expect(data.length).toBe(1);
      expect(data).toMatchObject([_nullMemoryChunk_]);

      // recall(2) (get last 2 positions)
      data = memory.recall(2);
      expect(data.length).toBe(2);
      expect(data).toMatchObject([three, _nullMemoryChunk_]);

      // recall(-1) (exclude last N position)
      data = memory.recall(-1);
      expect(data.length).toBe(3);
      expect(data).toMatchObject([one, two, three]);

      // recall(-2) (exclude last N position)
      data = memory.recall(-2);
      expect(data.length).toBe(2);
      expect(data).toMatchObject([one, two]);
    });
  });

  test('#set() should set a single chunk by position id', () => {
    const expected = [['1', '+']];
    expect(memory.recall().length).toBe(1);

    memory.set(1, { operandB: '1', operator: '+' });
    expect(memory.recall()).toMatchObject(expected);
    expect(memory.recall().length).toBe(1);
  });

  test('#set() should set multiple props with fallthrough to previous', () => {
    const startWith = [
      ['1', '+'],
      ['1', '+']
    ];
    let expected = [['1', '+'], ['3', '+'], _nullMemoryChunk_];

    memory.store(startWith);
    expect(memory.recall().length).toBe(3);

    memory.set(2, { operandB: '3' });
    expect(memory.recall()).toMatchObject(expected);
    expect(memory.recall().length).toBe(3);
  });

  test('#store() should append a null chunk', () => {
    const startWith = [['1', '+']];
    let expected = [...startWith, _nullMemoryChunk_];
    memory.memory = startWith;

    memory.store();
    expect(memory.length).toBe(2);
    expect(memory.recall()).toMatchObject(expected);

    memory.set(1, { operator: '+', operandB: '2' });
    memory.store();
    expect(memory.length).toBe(3);
    expect(memory.recall()).toMatchObject([
      ...startWith,
      ['2', '+'],
      _nullMemoryChunk_
    ]);
  });

  test('#store(chunk) should accept and store a single chunk', () => {
    const expected = [['2', '+'], _nullMemoryChunk_];
    memory.store(['2', '+']);

    expect(memory.length).toBe(2);
    expect(memory.recall()).toMatchObject(expected);
  });

  test('#store(chunks) should accept and store multiple chunks', () => {
    const inputs = [
      ['1', '+'],
      ['2', '-']
    ];
    const expected = [...inputs, _nullMemoryChunk_];

    memory.store(inputs);
    expect(memory.length).toBe(3);
    expect(memory.recall()).toMatchObject(expected);
  });
});
