import { noop } from '../../lib/functions.js'
import { keypadResolvers } from '../keypad/resolvers.js'
import { keypadBindings } from '../keypad/bindings.js'

class Key {
  get isDefined() {
    return !!this.type
  }

  get symbol() {
    // @todo map many-to-one symbols eg. [Enter, =], [Del, Backspace]
    return this.source.key || this.source.target.textContent
  }

  get type() {
    if (!this.symbol) return

    return Key.getKeyTypes().reduce((result, type) => {
      return Key.getKeyBindings(type).includes(this.symbol)
        ? `${result} ${type}`.trim()
        : result
    }, '')
  }

  get el() {
    return this.source.target
  }

  get resolver() {
    return Key.getKeyTypeResolver(this.type) || noop
  }

  constructor(event) {
    this.source = event
  }

  static getKeyBindings(type) {
    return keypadBindings[type]
  }

  static getKeyTypes() {
    return Object.keys(keypadBindings)
  }

  static getKeyTypeResolver(keyType) {
    return keypadResolvers[keyType]
  }

  debug() {
    console.log(this)
    return this
  }
}

export { Key }
