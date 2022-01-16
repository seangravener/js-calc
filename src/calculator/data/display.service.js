import events from './events.js'

const _BLANK_ = { msg: '', err: '', operandA: '', operator: '', operandB: '' }
let _instance = undefined
let _displayCache = [_BLANK_]

class DisplayService {
  get current() {
    return this.previous(0)
  }

  get length() {
    return this.value.length
  }

  get msg() {
    return this.position(0).msg
  }

  get err() {
    return this.position(0).err
  }

  get value() {
    const { msg, err, operants } = this.history()
    const [operandA, operator, operandB] = operants
    operandB = operator ? `${operandB}` : operandB

    return err || msg || operandB || `${operandA}.`
  }

  constructor() {
    events.listenTo('input:next', () => this.clear())
    events.listenTo('output:save', () => this.set({ msg: 'Saved!' }))
  }

  previous(position = 0, offset = 1) {
    return _displayCache[_displayCache.length - position - offset]
  }

  set(locals) {
    _displayCache.push({ ...this.previous(), ...locals })
  }

  show(msg, duration = 0) {
    this.set({ msg })
    // events.listenTo("api:next", () => this.set({ msg: "" }));
  }

  expire(type) {
    const cache = _displayCache[_displayCache.length - 1][type]
    return cache
  }

  clear() {
    _displayCache = [_BLANK_]
  }

  static load(display = [_BLANK_]) {
    return _instance || (_instance = new DisplayService(display))
  }
}

export { _BLANK_, DisplayService }
export default DisplayService.load()
