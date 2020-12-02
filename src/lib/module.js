import { events } from "./index.js";

let _modules = [];
// load module into "store" or "state"? no.
// modules[id]

class Module {
  constructor(module) {
    // _modules.push(module)
    this.module = module
  }

  hi(text, ...args) {
    console.log(`hi ${text}`, ...args)
  }

  run() {
    _modules[this.module.id] = this.module
    // add or link "module"/"component" input/output with a global app state[]. module output is it's state, methods, etc.
    // return _module || (_module = new Module(_module));
  }
}

export default Module;
