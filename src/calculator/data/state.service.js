import events from './events.js'
import { FSMachine } from './fsmachine/fsmachine.js'
import { calcMachineDefinition } from './state.config.js'
import displayService, { _DISPLAY_ } from './display.service.js'

const _STATE_ = {
  displayService: displayService,
  currentKey: {},
  previousKey: {}
}
let _instance = undefined
let _history = [_STATE_]

class StateService {
  definition = {}
  machine = undefined

  get displayService() {
    return displayService
  }

  get current() {
    const [{ currentKey }, { previousKey }] = [this.recall(0), this.recall(1)]
    return { ...this.recall(0), currentKey, previousKey }
  }

  get currentKey() {
    return this.current.currentKey
  }

  get previousKey() {
    const previous = this.recall(1)
    return previous ? previous.currentKey : {}
  }

  constructor(definition = {}) {
    this.definition = { ...calcMachineDefinition, ...definition }
    this.machine = new FSMachine(this.definition)
  }

  reset() {
    _history = [_STATE_]
    this.machine.reset()
    this.displayService.reset()
  }

  recall(position = 0, offset = 1) {
    return _history[_history.length - position - offset] || _STATE_
  }

  async set$(newKey) {
    const transitionArgs = [this.machine.value, newKey.type]
    _history.push({ ...this.current, currentKey: newKey })

    return this.machine.transition$
      .apply(this, transitionArgs)
      .then((value) => {
        events.publish('ouput:next', this.current)
        return value
      })
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
