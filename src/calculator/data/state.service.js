import { calcMachineDefinition } from './state.config'
import { createMachine } from './state.machine.js'

let _instance = undefined

class StateService {
  machine = undefined

  constructor(localDefinition = {}) {
    this.set(localDefinition)
  }

  set(localDefinition) {
    this.definition = { ...calcMachineDefinition, ...localDefinition }
    this.machine = createMachine(this.definition)
  }

  reset() {
    this.machine = this.set()
  }

  static load() {
    return _instance || (_instance = new StateService())
  }
}

export { StateService }
export default StateService.load()
