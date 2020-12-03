import { State } from "./state.js";
import { Memory } from "./memory.js";

const _stores = {
  memory: Memory.load(),
  state: State.load(),
};

class Store {
  constructor() {
    Object.assign(this, _stores);
    console.log('_stores', _stores)
  }
}

export { Store };
