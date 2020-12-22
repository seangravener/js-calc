import memory from "./memory.js";

let _instance = undefined;
const _blank_ = { msg: "", err: "", num: 0 }; // order is important here
let _display = _blank_;

class Display {
  get length() {
    return _display.length;
  }

  get value() {
    return Object.keys(_blank_).reduce(
      (value, type) =>
        _display[type] ||
        parseFloat(memory.operandB) ||
        parseFloat(memory.operandA),
      ""
    );
  }

  get state() {
    return { ..._display, value: this.value };
  }

  constructor(display = _blank_) {
    _display = { ..._display, ...display };
  }

  set(locals) {
    Object.keys(locals).forEach(
      (type) =>
        (_display[type] = isNaN(_blank_[type])
          ? `${locals[type]}`
          : parseFloat(locals[type]))
    );
  }

  get(type) {
    return _display[type];
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
