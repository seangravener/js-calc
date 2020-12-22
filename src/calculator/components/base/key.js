import api from "../../data/service.js";
import { noop } from "../../lib/functions.js";
import { keypadHandlers } from "../keypad/handlers.js";
import { keypadBindings } from "../keypad/bindings.js";
import events from "../../data/events.js";

class Key {
  get isDefined() {
    return !!this.type;
  }

  get symbol() {
    // @todo map many-to-one symbols eg. [Enter, =], [Del, Backspace]
    return this.source.key || this.source.target.textContent;
  }

  get type() {
    if (!this.symbol) return;

    // @todo weird var getting here... why static methods? either way, don't mix the two
    return Key.getKeyTypes().reduce((result, type) => {
      return keypadBindings[type].includes(this.symbol)
        ? `${result} ${type}`.trim()
        : result;
    }, "");
  }

  get el() {
    return this.source.target;
  }

  get resolver() {
    const resolver = Key.getKeyTypeHandler(this.type);
    return resolver ? resolver({ key: this, api: api }) : noop;
  }

  constructor(event) {
    this.source = event;
  }

  press$(resolver = this.resolver) {
    events.publish("key:next")
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
