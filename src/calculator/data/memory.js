import totalizator from "../lib/totalizator.js";

let _instance = undefined;

const _zero_ = "0";
const _nullMemoryChunk_ = [null, _zero_];
let _memory = [_nullMemoryChunk_];

class Memory {
  get memory() {
    return _memory;
  }

  set memory(chunks) {
    let [first, second = _nullMemoryChunk_, ...rest] = chunks;
    const [startBit, operandA] = first;
    const [operator = startBit, operandB = _zero_] = second;

    if (startBit !== null) {
      first = [null, operandA];
      second = [operator, operandB];
    }
    _memory = [first, second, ...rest];
  }

  get length() {
    return this.memory.length;
  }

  get operandA() {
    return this.length > 1 ? `${totalizator.compute(_memory)}` : _zero_;
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

  constructor(memory = _memory) {
    this.memory = memory;
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
    this.memory = [...this.memory, ...chunks];
  }

  replace(chunks = [_nullMemoryChunk_]) {
    chunks.forEach((chunk, i) => {
      const [operator, operandB] = chunks[i];

      if (i < this.memory.length) {
        this.set(i + 1, { operator, operandB });
      } else {
        this.store([[operator, operandB]]);
      }
    });

    return this.memory;
  }

  set(position, locals) {
    const positionValue = this.get(position);
    let { operator, operandB } = { ...positionValue, ...locals };
    operandB = Memory.toString(operandB);

    if (positionValue) {
      const index = this.memory.length - position;
      this.memory[index] = [operator, operandB];
    } else {
      this.store([operator, operandB]);
    }

    return { operator, operandB };
  }

  get(position) {
    const chunks = this.recall(position);
    const operandA = Memory.compute(chunks);
    const [operator, operandB] = chunks[0];

    return this.length >= position ? { operandA, operator, operandB } : {};
  }

  // recall() --> [1, 2, 3] (all memory)
  // recall(1) --> [3] (last position)
  // recall(2) --> [2, 3] (last 2 positions)
  // recall(-1) --> [1, 2] (exclude last n positions)
  recall(count) {
    if (count < 0) {
      return this.memory.slice(0, count);
    }

    return count ? this.memory.slice(-count) : this.memory;
  }

  clear() {
    this.memory = [_nullMemoryChunk_];
  }

  allClear() {
    this.clear();
  }

  static toString(obj) {
    return `${obj}`.replace(/[, ]+/g, "");
  }

  static compute(memory) {
    return `${totalizator.compute(memory)}`;
  }

  // @todo tidy up instantiation defaults
  static load(memory = _memory) {
    return _instance || (_instance = new Memory(memory));
  }
}

export { Memory };
export default Memory.load();
