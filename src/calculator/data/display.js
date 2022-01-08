import events from './events.js'
import memory from './memory.js'

const _BLANK_ = { msg: '', err: '' }
let _instance = undefined
let _displayCache = _BLANK_

class Display {
  get length() {
    return this.value.length
  }

  get msg() {
    return _displayCache.msg
  }

  get err() {
    return _displayCache.err
  }

  get history() {
    const localHistory = memory.recall(-1)
    const reducer = (history, [operandB, operator]) =>
      `${history} ${operandB} ${operator}`

    return localHistory.reduce(reducer, '').trim()
  }

  get value() {
    const { msg, err } = _displayCache
    let { operandB, operandA, operator } = memory.asFloats()
    operandB = operator ? `${operandB}` : operandB

    return err || msg || operandB || `${operandA}.`
  }

  set value(value) {

  }

  constructor(display = _BLANK_) {
    _displayCache = { ..._displayCache, ...display }
    events.listenTo('input:next', () => this.clear())
    events.listenTo('output:save', () => this.set({ msg: 'Saved!' }))
  }

  set(locals) {
    _displayCache = { ..._displayCache, ...locals }
  }

  show(msg, duration = 0) {
    this.set({ msg })
    // events.listenTo("api:next", () => this.set({ msg: "" }));
  }

  expire(type) {
    const cache = _displayCache[type]
    return cache
  }

  clear() {
    _displayCache = _BLANK_
  }

  static load(display = _BLANK_) {
    return _instance || (_instance = new Display(display))
  }
}

export { Display }
export default Display.load()
