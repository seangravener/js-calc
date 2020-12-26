import events from "./events.js";
import memory from "./memory.js";

let _instance = undefined;
const _blank_ = { msg: "", err: "" };
let _display = _blank_;

class Display {
  get length() {
    return this.value.length;
  }

  get msg() {
    return _display.msg;
  }

  get err() {
    return _display.err;
  }

  get history() {
    const reducer = (history, [operator, operandB]) =>
      `${history} ${operator} ${operandB}`;

    return memory.recall(-1).reduce(reducer, "").trim();
  }

  get value() {
    const { operandB, operandA } = memory.asFloats();
    const { msg, err } = _display;

    return err || msg || operandB; // || operandA;
  }

  constructor(display = _blank_) {
    _display = { ..._display, ...display };
    events.listenTo("input:next", () => this.clear());
  }

  set(locals) {
    _display = { ..._display, ...locals };
  }

  show(msg, duration = 0) {
    this.set({ msg });
    // events.listenTo("api:next", () => this.set({ msg: "" }));
  }

  expire(type) {
    const cache = _display[type];
    return cache;
  }

  clear() {
    _display = _blank_;
  }

  static load(display = _blank_) {
    return _instance || (_instance = new Display(display));
  }
}

export { Display };
export default Display.load();
