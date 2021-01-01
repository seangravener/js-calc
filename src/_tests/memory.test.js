import { Memory } from '../calculator/data/memory.js';

const _nullMemoryChunk_ = ['0', null];
let memory = Memory.load();

describe('Memory module', () => {
  beforeEach(() => {
    memory.clear();
  });

  describe('#recall()', () => {
    let data = [];
    const expected = [
      ['1', '+'],
      ['2', '+'],
      ['3', '+']
    ];
    const [one, two, three] = expected;

    beforeEach(() => {
      memory.store(expected);
    });

    test('#recall() should return all memory', () => {
      const data = memory.recall();

      expect(data.length).toBe(4);
      expect(data).toMatchObject([...expected, _nullMemoryChunk_]);
    });

    test('#recall(1) should return last position', () => {
      data = memory.recall(1);
      expect(data.length).toBe(1);
      expect(data).toMatchObject([_nullMemoryChunk_]);
    });

    test('#recall(2) should return last 2 positions', () => {
      data = memory.recall(2);
      expect(data.length).toBe(2);
      expect(data).toMatchObject([three, _nullMemoryChunk_]);
    });

    test('#recall(-1) should exclude last position', () => {
      data = memory.recall(-1);
      expect(data.length).toBe(3);
      expect(data).toMatchObject([one, two, three]);
    });

    test('#recall(-2) should exclude last 2 positions', () => {
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

  test('#set() should set multiple props', () => {
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
    let startWith = [['1', '+']];
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

    memory.clear();
    startWith = [
      ['1', '+'],
      ['2', '']
    ];

    memory.store(startWith);
    expect(memory.length).toBe(2);
    expect(memory.recall(1)[0][1]).toBe('');
    expect(memory.recall()).toMatchObject(startWith);
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

  test('#store(chunks) w/out operator should omit appending null chunk', () => {
    const expected = [
      ['1', '+'],
      ['2', '']
    ];

    memory.store(expected);
    expect(memory.length).toBe(2);
    expect(memory.recall(1)[0][1]).toBe('');
    expect(memory.recall()).toMatchObject(expected);
  });
});
