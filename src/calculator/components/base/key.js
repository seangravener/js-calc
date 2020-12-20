import inputs from "../../data/inputs.js";
import { noop } from "../../lib/functions.js";
import { keyBindings, keyTypeHandlers } from "../../lib/inputs.js";

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
      return keyBindings[type].includes(this.key)
        ? `${result} ${type}`.trim()
        : result;
    }, "");
  }

  get resolver() {
    const resolver = Key.getKeyTypeHandler(this.type);
    return resolver ? resolver({ key: this, api: inputs }) : noop;
  }

  constructor(key) {
    this.key = `${key}`;
  }

  press(resolver = this.resolver) {
    return new Promise(resolver);
  }

  static getKeyTypes() {
    return Object.keys(keyBindings);
  }

  static getKeyTypeHandler(keyType) {
    return keyTypeHandlers[keyType];
  }

  debug() {
    console.log(this);
    return this;
  }
}

export { Key };
