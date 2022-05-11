import events from './events.js'

let _instance = undefined

// move state to top-level <App> 
// Replace with fsmachine.state
const _DISPLAY_ = {
  msg: '',
  err: '',
  result: _instance ? _instance.value : '',
  operandA: '',
  operator: '',
  operandB: ''
}

// todo - replace cache with data store
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
    let { msg, err, operandA, operandB } = this.recall()
    operandA = operandA || '0.'

    return err || msg || operandB || `${operandA}`
  }

  constructor() {
    events.listenTo('output:msg', (msg) => this.set({ msg }))

    events.listenTo('output:next', (display) => {
      // calulate result
      this.setResult(this.value)
      // console.log('ouput:next --> ', display)
    })
  }

  recall(position = 0, offset = 1) {
    return _displayCache[_displayCache.length - position - offset]
  }

  set(locals) {
    _displayCache.push({ ...this.current, ..._normalize(locals) })
    return this.current
  }

  setResult(value) {
    _displayCache[_displayCache.length - 1].result = value
  }

  appendA(digit) {
    this.set({ operandA: `${this.current.operandA || ''}${digit}` })
  }
  
  appendB(digit) {
    this.set({ operandB: `${this.current.operandB || ''}${digit}` })
  }

  append({ operandB, operandA }) {
    const currentA = this.current.operandA
    const currentB = this.current.operandB
    let update

    if (operandA) {
      update = { operandA: `${currentA || ''}${operandA}` }
    } else {
      update = { operandB: `${currentB || ''}${operandB}` }
    }

    this.set(update)
  }

  backspace(count = 1) {
    let digits = this.current.operandB.split('')
    digits.splice(-count)

    this.set({ operandB: digits.length ? `${digits.join('')}` : '0' })
  }

  reset() {
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
