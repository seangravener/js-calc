import { events } from "./index.js";

let _module = [];

class Module {
  constructor(component) {}

  run() {
    return _module || (_module = new Module(_module));
  }
}

export default Module;
