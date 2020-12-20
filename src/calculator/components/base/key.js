import api from "../../data/service.js";
import { noop } from "../../lib/functions.js";
import { keypadHandlers } from "../keypad/keypad.handlers.js";
import { keypadBindings } from "../keypad/keypad.bindings.js";

class Key {
  get isDefined() {
    return !!this.type;
  }

  get symbol() {
    return this.key;
  }

  get type() {
    if (!this.key) return;

    return Key.getKeyTypes().reduce((result, type) => {
      return keypadBindings[type].includes(this.key)
        ? `${result} ${type}`.trim()
        : result;
    }, "");
  }

  get resolver() {
    const resolver = Key.getKeyTypeHandler(this.type);
    return resolver ? resolver({ key: this, api: api }) : noop;
  }

  constructor(key) {
    this.key = `${key}`;
  }

  press(resolver = this.resolver) {
    return new Promise(resolver);
  }

  static getKeyTypes() {
    return Object.keys(keypadBindings);
  }

  static getKeyTypeHandler(keyType) {
    return keypadHandlers[keyType];
  }

  debug() {
    console.log(this);
    return this;
  }
}

export { Key };
