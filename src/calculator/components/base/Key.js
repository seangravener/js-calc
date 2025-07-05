import { keypadBindings } from '../keypad/keypad.bindings.js'
import { SYMBOL_MAP } from '../../lib/constants.js'

class Key {
  get isDefined() {
    return !!this.type
  }

  get symbol() {
    const keyValue = this.source.key || this.source.target.textContent
    return SYMBOL_MAP[keyValue] || keyValue
  }

  get type() {
    if (!this.symbol) return ''

    return Key.getKeyTypes().reduce((result, type) => {
      return Key.getKeyBindings(type).includes(this.symbol)
        ? `${result} ${type}`.trim()
        : result
    }, '')
  }

  get el() {
    return this.source.target
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

  debug() {
    console.log(this)
    return this
  }
}

export { Key }
