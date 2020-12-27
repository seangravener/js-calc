import totalizator from "../lib/totalizator.js";

const _nullMemoryChunk_ = [null, "0"];
let _memory = [_nullMemoryChunk_];
let _instance = undefined;

class Memory {
  get length() {
    return _memory.length;
  }

  get operandA() {
    return this.length > 1 ? `${totalizator.compute(_memory)}` : "0";
  }

  get operandB() {
    return this.get(1).operandB;
  }

  set operandB(operandB) {
    this.set(1, { operandB: Memory.toString(operandB) });
  }

  get operator() {
    return this.get(1).operator || "";
  }

  set operator(operator) {
    this.set(1, { operator });
  }

  constructor(chunks = _memory) {
    _memory = chunks;
  }

  asFloats() {
    const { operator, operandB } = this.get(1);
    const active = { operandB, operandA: this.operandA };
    const operands = Object.keys(active).reduce((values, key) => {
      return { ...values, ...{ [key]: parseFloat(active[key]) } };
    }, {});

    return { operator, ...operands };
  }

  store(chunks = [_nullMemoryChunk_]) {
    chunks = chunks.map((chunk) => [chunk[0], Memory.toString(chunk[1])]);
    _memory = [..._memory, ...chunks];
  }

  replace(chunks = [_nullMemoryChunk_]) {
    chunks.forEach((chunk, i) => {
      const [operator, operandB] = chunks[i];

      if (i < _memory.length) {
        this.set(i + 1, { operator, operandB });
      } else {
        this.store([[operator, operandB]]);
      }
    });

    return _memory;
  }

  set(position, locals) {
    const positionValue = this.get(position);
    let { operator, operandB } = { ...positionValue, ...locals };
    operandB = Memory.toString(operandB);

    if (positionValue) {
      const index = _memory.length - position;
      _memory[index] = [operator, operandB];
    } else {
      this.store([operator, operandB]);
    }

    return { operator, operandB };
  }

  get(position) {
    const chunks = this.recall(position);
    const [operator, operandB] = chunks[0];
    const operandA = Memory.compute(chunks);

    return this.length >= position ? { operandA, operator, operandB } : {};
  }

  // recall() --> [1, 2, 3] (all memory)
  // recall(1) --> [3] (last position)
  // recall(2) --> [2, 3] (last 2 positions)
  // recall(-1) --> [1, 2] (exclude last n positions)
  recall(count) {
    if (count < 0) {
      return _memory.slice(0, count);
    }

    return count ? _memory.slice(-count) : _memory;
  }

  clear() {
    _memory = [_nullMemoryChunk_];
  }

  allClear() {
    this.clear();
  }

  static toString(obj) {
    return `${obj}`.replace(/[, ]+/g, "");
  }

  static compute(memory) {
    console.log("compute", `${totalizator.compute(memory)}`);
    return `${totalizator.compute(memory)}`;
  }

  // @todo tidy up instantiation defaults
  static load(memory) {
    return _instance || (_instance = new Memory(memory || _memory));
  }
}

export { Memory };
export default Memory.load();
