import createMachine, { FSMachine } from './fsmachine/fsmachine.js'
import { calcMachineDefinition } from './state.config.js'

let _instance = undefined

class StateService {
  fsmachine = undefined

  constructor(definition) {
    this.set(definition)
  }

  set(definition = {}) {
    this.definition = { ...calcMachineDefinition, ...definition }
    this.fsmachine = createMachine(this.definition)
  }

  reset() {
    this.set()
  }

  static load() {
    return _instance || (_instance = new StateService())
  }
}

export { StateService }
export default StateService.load()
