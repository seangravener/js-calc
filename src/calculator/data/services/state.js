// import { input } from "../../lib/index.js";
import _store from "../store/instance.js"
import { Service } from "../models/service.js";

let _instance = undefined;
const _input = _store.input
const _memory = _store.memory
const _events = _store.events

class State extends Service {
  get answer() {
    return this.compute().toString();
  }

  get currentOperand() {
    _events.listenTo('set:operand', (value) => { console.log('callback!', value) })
    _events.listenTo(['set:operand'], (value) => { console.log('callback #2!', value) })
    // return store.input.value
    // return _memory.operand_B;
  }

  set currentOperand(value) {
    _events.publish('set:operand', value)
    // _memory.operand_A = 1
    // _memory.operand_B = 1
    // _memory.operator = "+"
    // _input.value = value;
  }

  get previousOperand() {
    return _memory.recall(2);
  }

  get operator() {}

  set operator(symbol) {
  }

  constructor() {
      super()
  }

  static load() {
    return _instance || (_instance = new State());
  }
}

export { State };
