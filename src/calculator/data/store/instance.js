import { Store } from "./store.js";
import { Memory } from "./memory.js";
import { EventBus } from "./events.js";
import { Input } from "./input.js";

let _instance = undefined;
const stores = {
  memory: Memory.load(),
  input: Input.load(),
  //   state: State.load(),
  events: EventBus.load(),
};

const singleton = () => {
  return _instance || (_instance = new Store(stores));
};

export default singleton();
