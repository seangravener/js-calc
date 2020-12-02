import { events } from "../../lib/index.js";
import { operators } from '../../lib/functions.js'

let _memory = [];

class Memory {
  get length() {
    return _memory.length;
  }

  constructor(memory = []) {
    return this;
  }

  store(value, operator) {
    events.publish("memory:store", [value, operator]);
    _memory.push(parseFloat(value), operator);
    return this;
  }

  set(location, value) {
    _memory[_memory.length - location] = value;
    return this;
  }

  recall(location) {
    return location ? _memory.slice(-location)[0] : _memory;
  }

  validate() {
    let isValid = true;
    const candidate = this.memory.recall(1)

    for (operator of operators) {
      if (operator !== candidate) {
        isValid = false;
      }
    }

    if (!isValid) {
      _errCorrect()
      _memory.push('') // set to state.operator
    }
    return isValid;
  }

  clear() {
    events.publish("memory:clear");
    _memory = [];
    return this;
  }
}

let _instance = undefined;
const run = () => {
  return _instance || (_instance = new Memory(_memory));
};

export default Memory;
// export { Memory }
