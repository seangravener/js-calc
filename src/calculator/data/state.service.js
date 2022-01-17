import displayService, { _DISPLAY_ } from './display.service.js'
import events from './events.js'
import { FSMachine } from './fsmachine/fsmachine.js'
import { calcMachineDefinition } from './state.config.js'

const _STATE_ = {
  value: '',
  display: _DISPLAY_,
  currentKey: {},
  previousKey: {}
}
let _instance = undefined
let _history = [_STATE_]

class StateService {
  definition = {}
  machine = undefined

  get length() {
    return _history.length
  }

  get display() {
    return displayService
  }

  get currentKey() {
    return this.recall(0).currentKey
  }

  get previousKey() {
    return this.recall(1).currentKey
  }

  get current() {
    return this.recall(0)
  }

  get previous() {
    return this.recall(1)
  }

  constructor(definition = {}) {
    this.definition = { ...calcMachineDefinition, ...definition }
    this.machine = new FSMachine(this.definition)
  }

  reset() {
    _history = [_STATE_]
    this.machine.reset()
    this.refreshDisplay()
  }

  recall(position = 0, offset = 1) {
    return _history[_history.length - position - offset]
  }

  async set$(key) {
    const transitionArgs = [this.machine.value, key.type]
    await this.machine.transition$.apply(this, transitionArgs)
    _history.push(this.getNextState(key))
    this.refreshDisplay() // replace with event

    return new Promise((resolve) => resolve(this.publish('next')))
  }

  refreshDisplay() {
    this.display.set$(this.current.display)
  }

  getNextState(key) {
    return {
      ...this.current,
      currentKey: key,
      previousKey: this.currentKey ? this.currentKey : key,
      display: this.current.display,
      value: this.machine.value
    }
  }

  // append(digit) {
  //   const { operandB } = memory.asFloats()
  //   this.setCurrent({ operandB: `${operandB || ''}${digit}` })
  // }

  // backspace(count = 1) {
  //   let digits = this.current.operandB.split('')
  //   digits.splice(-count)
  //   this.setCurrent({ operandB: digits.length ? `${digits.join('')}` : '0' })
  // }

  // clear() {
  //   memory.clear()
  //   this.publish('next')
  // }

  publish(eventName, payload = this.current) {
    events.publish(`output:${eventName}`, payload)
    return payload
  }

  static load() {
    return _instance || (_instance = new StateService())
  }
}

export { StateService, _STATE_ }
export default StateService.load()
