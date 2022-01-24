import displayService, { _DISPLAY_ } from './display.service.js'
import events from './events.js'
import { FSMachine } from './fsmachine/fsmachine.js'
import { calcMachineDefinition } from './state.config.js'

let _instance = undefined
const _STATE_ = {
  // extends StateServiceBase
  display: displayService,
  currentKey: {},
  previousKey: {}
}
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
    return this.recall(1) ? this.recall(1).currentKey : ''
  }

  get current() {
    const { currentKey, previousKey } = this
    return { ...this.recall(0), currentKey, previousKey }
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
    this.display.reset()
  }

  recall(position = 0, offset = 1) {
    return _history[_history.length - position - offset]
  }

  async set$(currentKey) {
    const transitionArgs = [this.machine.value, currentKey.type]
    _history.push({ ...this.current, currentKey })

    // @TODO 
    // forget the "cache layers"; too annoying to embed and propegate changes.
    // move STATE object to machine.state
    // including display
    // use stateService to recall states

    return this.machine.transition$.apply(this, transitionArgs)
  }

  publish(eventName, payload = this.current) {
    events.publish(`output:${eventName}`, payload)
    return payload
  }

  static load() {
    _instance = _instance || new StateService()
    _history = [_STATE_]

    return _instance
  }
}

export { StateService, _STATE_ }
export default StateService.load()
