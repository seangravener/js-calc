import events from './events.js'

// layer this cache beneath the stateCache, then combine in stateService
const _DISPLAY_ = {
  msg: '',
  err: '',
  result: '',
  operandA: '',
  operator: '',
  operandB: ''
}
let _instance = undefined
let _displayCache = [_DISPLAY_]

class DisplayService {
  get current() {
    return this.recall(0)
  }

  get length() {
    return this.value.length
  }

  get msg() {
    return this.recall(0).msg
  }

  get err() {
    return this.recall(0).err
  }

  get value() {
    const { msg, err, operants } = this.history()
    const [operandA, operator, operandB] = operants
    operandB = operator ? `${operandB}` : operandB

    return err || msg || operandB || `${operandA}.`
  }

  constructor() {
    events.listenTo('output:msg', (msg) => this.set({ msg }))

    events.listenTo('output:next', (state) =>
      this.set({ display: state.display })
    )
  }

  recall(position = 0, offset = 1) {
    return _displayCache[_displayCache.length - position - offset]
  }

  async set(locals) {
    return await this.set$(locals)
  }

  set$(locals) {
    locals = _normalize(locals)

    return new Promise((resolve) => {
      _displayCache.push({ ...this.recall(), ...locals })
      resolve(this.current)
    })
  }

  clear() {
    _displayCache = [_DISPLAY_]
  }

  static load(display = [_DISPLAY_]) {
    return _instance || (_instance = new DisplayService(display))
  }
}

const _normalize = function (locals) {
  return locals.display ? locals.display : locals
}

export { _DISPLAY_, DisplayService }
export default DisplayService.load()
