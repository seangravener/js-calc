import events from "./events.js";
import totalizator from "../lib/totalizator.js";

const _nullMemoryChunk_ = [null, "0"];
let _memory = [_nullMemoryChunk_];
let _instance = undefined;

class Memory {
  get length() {
    return _memory.length;
  }

  get operandA() {
    return this.length > 1 ? `${totalizator.compute(_memory)}` : '0';
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
    const active = { ...this.get(1), operandA: this.operandA };
    return Object.keys(active).reduce((values, key) => {
      return { ...values, ...{ [key]: parseFloat(active[key]) } };
    }, {});
  }

  store(chunks) {
    chunks = chunks.map((chunk) => [chunk[0], Memory.toString(chunk[1])]);
    _memory = [..._memory, ...chunks];
  }

  newTotal() {
    if (this.operator) {
      _memory.push(_nullMemoryChunk_);
      //this.operandB = this.operandA;
    }

    return this;
  }

  insert() {
    if (this.operator) {
      _memory.push(_nullMemoryChunk_);
    } else {
      this.reset()
    }
    return this;
  }

  reset(chunks = [_nullMemoryChunk_]) {
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
    const { operator, operandB } = { ...positionValue, ...locals };

    if (positionValue) {
      const index = _memory.length - position;
      _memory[index] = [operator, Memory.toString(operandB)];
    } else {
      this.store([operator, operandB]);
    }

    return { operator, operandB };
  }

  get(position) {
    const [operator, operandB] = this.recall(position)[0];
    return this.length >= position ? { operator, operandB } : undefined;
  }

  // recall() --> [1, 2, 3] (all memory)
  // recall(1) --> [3] (last position)
  // recall(2) --> [2, 3] (last 2 positions)
  // recall(-1) --> [1, 2] (exclude last N positions)
  recall(count) {
    if (count < 0) {
      const local = [..._memory];
      local.splice(-1, (count *= -1));
      return local;
    }

    return count ? _memory.slice(-count) : _memory;
  }

  clear() {
    this.reset()
    events.publish("memory:clear");
  }

  allClear() {
    _memory = [_nullMemoryChunk_];
    events.publish("memory:clear");
  }

  static toString(obj) {
    return `${obj}`.replace(/[, ]+/g, "");
  }

  // @todo tidy up instantiation defaults
  static load(memory) {
    return _instance || (_instance = new Memory(memory || _memory));
  }
}

export { Memory };
export default Memory.load();
