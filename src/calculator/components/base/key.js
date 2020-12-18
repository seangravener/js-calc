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

  get handler() {
    const handler = Key.getKeyTypeHandler(this.type);
    return handler ? handler.bind(this) : noop;
  }

  constructor(key) {
    this.key = `${key}`;
  }

  press(key = this.key) {
    return new Promise(this.handler);
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
